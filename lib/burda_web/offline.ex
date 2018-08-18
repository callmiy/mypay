defmodule BurdaWeb.Offline do
  alias BurdaWeb.LayoutView

  @service_worker_cache_assets "priv/static/cache_manifest.json"
                               |> Path.expand()
                               |> File.read!()
                               |> Poison.decode!()
                               |> Map.get("digests")
                               |> Enum.reduce([], fn {latest, value}, acc ->
                                 path = value["logical_path"]

                                 l =
                                   path
                                   |> String.split("/")
                                   |> hd()

                                 if l in ["favicon", "offline", "robots.txt"] do
                                   acc
                                 else
                                   [{path, latest} | acc]
                                 end
                               end)
                               |> Enum.into(%{})

  @service_worker_file Path.expand("priv/static/offline/service-worker1.js")
  @version_text "const CACHE_VERSION = "
  @cache_static_files_text "const CACHE_STATICS = "
  @css_css_pattern ~r/(css.+?\.css$)|(\.map$)/

  def rewrite_service_worker_file do
    file = File.open!(@service_worker_file)
    text = read_file(file, [])
    File.close(file)
    File.write!(@service_worker_file, text)
    text
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
        "const CACHE_VERSION = #{System.monotonic_time(:seconds)};\n"

      text =~ @cache_static_files_text ->
        env = LayoutView.get_frontend_env(:asset)

        text =
          env
          |> service_worker_cache_assets()
          |> Enum.map(&cache_asset(env, &1))
          |> Enum.join(",")

        ~s(const CACHE_STATICS = ["/offline-template-assigns",#{text}];\n)

      true ->
        text
    end
  end

  def service_worker_cache_assets(:prod),
    do: Map.values(@service_worker_cache_assets)

  def service_worker_cache_assets(:dev),
    do:
      @service_worker_cache_assets
      |> Map.keys()
      |> Enum.reject(&Regex.match?(@css_css_pattern, &1))

  def service_worker_cache_assets(_), do: service_worker_cache_assets(:dev)

  defp cache_asset(:prod, text), do: ~s("#{text}")
  defp cache_asset(:dev, text), do: ~s("http://localhost:4019/#{text}")
  defp cache_asset(_, text), do: cache_asset(:dev, text)
end
