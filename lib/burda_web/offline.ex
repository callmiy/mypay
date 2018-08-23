defmodule BurdaWeb.Offline do
  alias BurdaWeb.LayoutView

  @phoenix_digest_manifest_file_path "priv/static/cache_manifest.json"
  @webpack_manifest_file_path "priv/static/webpack-manifest.json"
  @static_folder Path.expand("priv/static")
  @offline_template_folder "front-end/src/templates"
  @version_text "const CACHE_VERSION = "
  @cache_static_files_text "const CACHE_STATICS = "

  @service_worker_file "priv/static/offline/service-worker1.js"
  @build_service_worker_file "_build/#{System.get_env("MIX_ENV") || "dev"}/lib/burda/priv/static/offline/service-worker1.js"

  @manifest_json_file Path.expand("cache_manifest.json", @static_folder)
  @rejected_static ["favicon", "offline", "robots", "webpack"]

  def get_service_worker_cache_assets,
    do:
      @phoenix_digest_manifest_file_path
      |> File.read!()
      |> Poison.decode!()
      |> Map.get("latest")
      |> Map.values()
      |> Enum.reject(fn l ->
        Enum.any?(@rejected_static, &String.starts_with?(l, &1))
      end)

  def generate_templates,
    do:
      [
        {BurdaWeb.IndexController, :index_offline_templates},
        {BurdaWeb.ShiftController, :new_offline_templates}
      ]
      |> Enum.flat_map(fn {module, templates_fun} ->
        module
        |> apply(templates_fun, [])
        |> Enum.map(fn {template_fun, filename} ->
          template_string = apply(module, template_fun, [])

          filename =
            Path.expand(
              "#{filename}.handlebars",
              @offline_template_folder
            )

          [filename, template_string]
        end)
      end)
      |> Enum.map(fn [file, string] -> File.write!(file, string) end)

  def write_cache_static_file,
    do:
      :asset
      |> LayoutView.get_frontend_env()
      |> write_cache_static_file_for_asset_env()

  defp write_cache_static_file_for_asset_env(:dev) do
    text = service_worker_text()
    File.write!(@service_worker_file, text)
    File.write!(@build_service_worker_file, text)
  end

  defp write_cache_static_file_for_asset_env(:prod) do
    Mix.Task.run("phx.digest")

    text = service_worker_text()

    digested_files_from_manifest()
    |> Enum.concat(gzipped_files_from_manifest([]))
    |> Enum.each(&File.rm_rf!/1)

    File.rm!(@manifest_json_file)
    File.write!(@service_worker_file, text)

    Mix.Task.reenable("phx.digest")
    Mix.Task.run("phx.digest")
  end

  def digested_files_from_manifest,
    do:
      @manifest_json_file
      |> File.read!()
      |> Poison.decode!()
      |> Map.get("latest", %{})
      |> Map.values()
      |> Enum.map(&Path.expand(&1, @static_folder))
      |> Enum.filter(&File.exists?/1)

  def gzipped_files_from_manifest(acc, path \\ @static_folder)
      when is_list(acc) do
    case File.dir?(path) do
      true ->
        paths =
          path
          |> File.ls!()
          |> Enum.map(&Path.expand(&1, path))

        acc =
          paths
          |> Enum.reject(&(File.dir?(&1) || Path.extname(&1) !== ".gz"))
          |> Enum.concat(acc)

        paths
        |> Enum.filter(&File.dir?/1)
        |> Enum.reduce(acc, &gzipped_files_from_manifest(&2, &1))

      _ ->
        if Path.extname(path) == ".gz", do: [path | acc], else: acc
    end
  end

  defp read_file(file, acc) do
    case IO.read(file, :line) do
      :eof -> Enum.reverse(acc)
      text -> read_file(file, [get_rewrite_text(text) | acc])
    end
  end

  defp get_rewrite_text(text) do
    cond do
      text =~ @version_text ->
        "const CACHE_VERSION = #{System.system_time(:seconds)};\n"

      text =~ @cache_static_files_text ->
        env = LayoutView.get_frontend_env(:asset)

        text =
          env
          |> service_worker_cache_assets()
          |> Enum.map(&cache_asset(env, &1))
          |> Enum.join(",")

        ~s(const CACHE_STATICS = ["/offline-template-assigns",#{text},"https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin"];\n)

      true ->
        text
    end
  end

  defp service_worker_cache_assets(:prod),
    do: get_service_worker_cache_assets()

  defp service_worker_cache_assets(:dev),
    do:
      @webpack_manifest_file_path
      |> File.read!()
      |> Poison.decode!()
      |> Map.values()
      |> Enum.reject(&Kernel.=~(&1, "webpack-manifest.json"))

  defp service_worker_cache_assets(_), do: service_worker_cache_assets(:dev)

  defp service_worker_text do
    file = File.open!(@service_worker_file)
    text = read_file(file, [])
    File.close(file)
    text
  end

  defp cache_asset(:prod, text), do: ~s("/#{text}")
  defp cache_asset(:dev, text), do: ~s("#{text}")
  defp cache_asset(_, text), do: cache_asset(:dev, text)
end
