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

  @cache_static_file Path.expand("priv/static/offline/cache-static.js")
  @css_css_pattern ~r/(css.+?\.css$)|(\.map$)/
  @offline_template_folder "front-end/src/templates"

  def get_service_worker_cache_assets, do: @service_worker_cache_assets

  def write_cache_static_file do
    env = LayoutView.get_frontend_env(:asset)

    text =
      env
      |> service_worker_cache_assets()
      |> Enum.map(&cache_asset(env, &1))
      |> Enum.join(",")

    text =
      ~s(const CACHE_VERSION = #{System.system_time(:seconds)};const CACHE_STATICS = ["/offline-template-assigns",#{
        text
      }];)

    File.write!(@cache_static_file, text)
  end

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

  defp service_worker_cache_assets(:prod),
    do: Map.values(@service_worker_cache_assets)

  defp service_worker_cache_assets(:dev),
    do:
      @service_worker_cache_assets
      |> Map.keys()
      |> Enum.reject(&Regex.match?(@css_css_pattern, &1))

  defp service_worker_cache_assets(_), do: service_worker_cache_assets(:dev)

  defp cache_asset(:prod, text), do: ~s("/#{text}")
  defp cache_asset(:dev, text), do: ~s("http://localhost:4019/#{text}")
  defp cache_asset(_, text), do: cache_asset(:dev, text)
end
