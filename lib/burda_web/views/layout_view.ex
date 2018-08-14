defmodule BurdaWeb.LayoutView do
  use BurdaWeb, :view

  require EEx

  alias BurdaWeb.Endpoint
  alias BurdaWeb.Router.Helpers

  @index_js_path "commons.js"
  @index_css_js_path "commons.js"
  @index_css_path "commons.css"

  EEx.function_from_string(
    :def,
    :css_tag_eex,
    ~s(<link rel="stylesheet" type="text/css" href="<%= @href %>" media="screen,projection" />),
    [:assigns]
  )

  EEx.function_from_string(
    :def,
    :js_tag_eex,
    ~s(<script src="<%= @src %>"></script>),
    [:assigns]
  )

  EEx.function_from_string(
    :def,
    :webpack_server_url,
    "http://localhost:8080/<%= @path1 %>/<%= @path2 %>",
    [:assigns]
  )

  EEx.function_from_string(
    :def,
    :preloaded_css,
    ~s(<link rel="preload" href="<%=@href%>" as="style" onload="this.rel='stylesheet'">),
    [:assigns]
  )

  EEx.function_from_string(
    :def,
    :preloaded_css_js,
    ~s/<link rel="preload" href="<%=@href%>" as="script" onload="const script = document.createElement('script'); script.src = this.href; document.head.appendChild(script);">/,
    [:assigns]
  )

  # EXPORTS FOR TEST
  @spec index_css_path() :: <<_::88>>
  def index_css_path, do: @index_css_path

  @spec index_css_js_path() :: <<_::80>>
  def index_css_js_path, do: @index_css_js_path
  # / EXPORTS FOR TEST

  # ---------------------------------------PAGE TOP MENU---------------------

  @spec top_menu(module, map()) :: Plug.Conn.t() | String.t()
  def top_menu(view_module, %{} = assigns) do
    case :erlang.function_exported(view_module, :top_menu, 1) do
      true ->
        apply(view_module, :top_menu, [assigns])

      _ ->
        ""
    end
  end

  @spec js_css_src(
          resource_type :: :css | :js,
          path :: nil | String.t()
        ) :: nil | {:css, String.t()} | {:js, String.t()}
  def js_css_src(_, nil), do: nil

  def js_css_src(type, href) when is_binary(href),
    do:
      Mix.env()
      |> get_mix_env()
      |> js_css_src(type, href)

  @spec js_css_src(
          mix_env :: :dev | :prod,
          resource_type :: :css | :js,
          path :: String.t()
        ) :: {:css, String.t()} | {:js, String.t()}

  def js_css_src(:dev, :css, src) when is_binary(src) do
    src = String.replace(src, ~r/\.css$/, ".js")
    src = webpack_server_url(path1: "css", path2: src)

    {:css_js, src}
  end

  def js_css_src(:dev, :js, src) when is_binary(src),
    do: {:js, webpack_server_url(path1: "js", path2: src)}

  def js_css_src(:prod, :css, href) when is_binary(href),
    do: {:css, Endpoint.static_path("/css/#{href}")}

  def js_css_src(:prod, :js, href) when is_binary(href),
    do: {:js, Endpoint.static_path("/js/#{href}")}

  def resources(path) when is_binary(path) do
    all_js_css = %{
      Helpers.index_path(Endpoint, :index) => %{
        main: [
          js_css_src(:js, "routes/index.js"),
          js_css_src(:css, "routes/index.css")
        ]
      },
      Helpers.shift_path(Endpoint, :new) => %{
        main: [
          js_css_src(:js, "routes/shift.js"),
          js_css_src(:css, "routes/shift.css")
        ],
        others: [
          js_css_src(:css, "components/new-meta-form.css")
        ]
      }
    }

    all_resources =
      case all_js_css[path] do
        %{} = current ->
          current
          |> Enum.flat_map(&stringify_resource/1)
          |> Enum.concat(
            all_js_css
            |> Map.delete(path)
            |> Map.values()
            |> Enum.flat_map(&stringify_resource/1)
          )

        _ ->
          all_js_css
          |> Map.values()
          |> Enum.flat_map(&Map.values/1)
          |> List.flatten()
          |> Enum.map(&stringify_resource(&1, :preload))
      end

    {_, commons_css} =
      js_css_src(:css, @index_css_path)
      |> stringify_resource()

    {_, commons_js} =
      js_css_src(:js, @index_js_path)
      |> stringify_resource()

    %{
      css:
        [commons_css | for({k, v} <- all_resources, not_js?(k), do: v)]
        |> Enum.join("\n")
        |> raw(),
      js:
        [commons_js | for({:js, v} <- all_resources, do: v)]
        |> Enum.join("\n")
        |> raw()
    }
  end

  defp stringify_resource(%{} = resource),
    do:
      resource
      |> Map.values()
      |> List.flatten()
      |> Enum.map(&stringify_resource(&1, :preload))

  defp stringify_resource({:css, href}) when is_binary(href),
    do: {:css, css_tag_eex(href: href)}

  defp stringify_resource({:css_js, src}) when is_binary(src),
    do: {:css_js, js_tag_eex(src: src)}

  defp stringify_resource({:js, src}) when is_binary(src),
    do: {:js, js_tag_eex(src: src)}

  defp stringify_resource({:main, resources}),
    do: Enum.map(resources, &stringify_resource/1)

  defp stringify_resource({:others, resources}),
    do: Enum.map(resources, &stringify_resource(&1, :preload))

  defp stringify_resource({:js, src}, :preload) when is_binary(src),
    do: {:js, js_tag_eex(src: src)}

  defp stringify_resource({:css, href}, :preload) when is_binary(href),
    do: {:css, preloaded_css(href: href)}

  defp stringify_resource({:css_js, href}, :preload) when is_binary(href),
    do: {:css_js, preloaded_css_js(href: href)}

  defp get_mix_env(:prod), do: :prod
  defp get_mix_env(:prod_local), do: :prod
  defp get_mix_env(:dev), do: :dev
  defp get_mix_env(_), do: :prod

  defp not_js?(k), do: k != :js
end
