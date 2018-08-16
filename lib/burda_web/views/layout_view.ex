defmodule BurdaWeb.LayoutView do
  use BurdaWeb, :view

  require EEx

  alias BurdaWeb.Endpoint
  alias BurdaWeb.Router.Helpers

  @index_js_path "commons.js"
  @index_css_js_path "commons.js"
  @index_css_path "commons.css"

  @css_map %{
    tag_name: "link",
    attributes: %{
      text: "text/css",
      media: "screen,projection"
    }
  }

  @js_map %{
    tag_name: "script",
    attributes: %{}
  }

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
    "http://localhost:4019/<%= @path1 %>/<%= @path2 %>",
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

  EEx.function_from_string(
    :def,
    :preloaded_js,
    ~s/<link rel="preload" href="<%=@href%>" as="script" onload="const script = document.createElement('script'); script.src = this.href; document.body.appendChild(script);">/,
    [:assigns]
  )

  @default_css_js_opts [render: :string, type: :raw]

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

  # -------------------------------------------PAGE JS---------------------

  def page_js(path, opts \\ @default_css_js_opts)

  def page_js(nil, _opts), do: ""

  def page_js(:index, opts),
    do:
      Mix.env()
      |> get_mix_env()
      |> script_tag(@index_js_path, opts)

  def page_js(path, opts),
    do:
      Mix.env()
      |> get_mix_env()
      |> script_tag(path, opts)

  def script_tag(:prod, src, opts) when is_binary(src),
    do:
      :prod
      |> js_css_src(:js, src)
      |> script_tag(opts)

  def script_tag(:dev, src, opts) when is_binary(src),
    do:
      :dev
      |> js_css_src(:js, src)
      |> script_tag(opts)

  def script_tag({:js, src}, opts) when is_list(opts) do
    html =
      case Keyword.fetch!(opts, :render) do
        :string ->
          js_tag_eex(src: src)

        :map ->
          Map.update!(@js_map, :attributes, &Map.put(&1, :src, src))
      end

    case Keyword.fetch(opts, :type) do
      {:ok, type} ->
        script_tag(html, type)

      :error ->
        script_tag(html, nil)
    end
  end

  def script_tag(html, :raw) when is_binary(html), do: raw(html)
  def script_tag(html, _), do: html

  # -------------------------------------------PAGE CSS---------------------

  @spec page_css(:index | nil | binary(), any()) :: any()
  def page_css(path, opts \\ [render: :string, type: :raw])

  def page_css(nil, _opts), do: ""

  def page_css(:index, opts),
    do:
      Mix.env()
      |> get_mix_env()
      |> link_tag(:index, opts)

  def page_css(path, opts),
    do:
      Mix.env()
      |> get_mix_env()
      |> link_tag(path, opts)

  def link_tag(:prod, :index, opts), do: link_tag(:prod, @index_css_path, opts)

  def link_tag(:prod, href, opts) when is_binary(href),
    do:
      :prod
      |> js_css_src(:css, href)
      |> link_tag(opts)

  def link_tag(:dev, :index, opts),
    do: link_tag(:dev, @index_css_js_path, opts)

  def link_tag(:dev, src, opts) when is_binary(src),
    do:
      :dev
      |> js_css_src(:css, src)
      |> link_tag(opts)

  @spec link_tag(any(), any()) :: any()
  def link_tag({:css, href}, opts) when is_binary(href) do
    case Keyword.fetch!(opts, :render) do
      :string ->
        css_tag_eex(href: href)

      :map ->
        Map.update!(@css_map, :attributes, &Map.put(&1, :href, href))
    end
    |> link_tag(opts)
  end

  def link_tag({:css_js, src}, opts) when is_binary(src),
    do: link_tag({:js, src}, opts)

  def link_tag({:js, src}, opts) when is_binary(src) do
    case Keyword.fetch!(opts, :render) do
      :string ->
        js_tag_eex(src: src)

      :map ->
        Map.update!(@js_map, :attributes, &Map.put(&1, :src, src))
    end
    |> link_tag(opts)
  end

  def link_tag(html, opts) when is_list(opts) do
    type =
      case Keyword.fetch(opts, :type) do
        {:ok, type} -> type
        :error -> nil
      end

    link_tag(html, type)
  end

  def link_tag(html, :raw) when is_binary(html), do: raw(html)
  def link_tag(html, _), do: html

  # ------------------------------UTILITIES--------------------------------

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

  @doc ~S"""
    For the App shell used in offline mode, the view_module argument will be
    :true and we thus render no child template because the rendering will be
    done client side.
  """
  @spec render_child_main_child_template(true | Atom.t(), any(), any()) :: any()
  def render_child_main_child_template(true, _, _), do: ""

  def render_child_main_child_template(view_module, view_template, assigns),
    do: render(view_module, view_template, assigns)

  defp get_mix_env(:prod), do: :prod
  defp get_mix_env(:prod_local), do: :prod
  defp get_mix_env(:dev), do: :dev
  defp get_mix_env(_), do: :prod

  defp not_js?(k), do: k != :js
end
