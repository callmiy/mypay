defmodule BurdaWeb.LayoutView do
  use BurdaWeb, :view

  require EEx

  alias BurdaWeb.Endpoint

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
    "http://localhost:8080/<%= @path1 %>/<%= @path2 %>",
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
      "/js/#{src}"
      |> Endpoint.static_path()
      |> script_tag(opts)

  def script_tag(:dev, src, opts) when is_binary(src),
    do: script_tag(webpack_server_url(path1: "js", path2: src), opts)

  def script_tag(src, opts) when is_list(opts) do
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

  def link_tag(:prod, href, opts) when is_binary(href) do
    href = Endpoint.static_path("/css/#{href}")
    link_tag(:css, href, opts)
  end

  def link_tag(:dev, :index, opts),
    do: link_tag(:dev, @index_css_js_path, opts)

  def link_tag(:dev, src, opts) when is_binary(src) do
    src = String.replace(src, ~r/\.css$/, ".js")
    src = webpack_server_url(path1: "css", path2: src)

    link_tag(:js, src, opts)
  end

  def link_tag(:css, href, opts) when is_binary(href) do
    case Keyword.fetch!(opts, :render) do
      :string ->
        css_tag_eex(href: href)

      :map ->
        Map.update!(@css_map, :attributes, &Map.put(&1, :href, href))
    end
    |> link_tag(Keyword.take(opts, [:type]))
  end

  def link_tag(:js, src, opts) when is_binary(src) do
    case Keyword.fetch!(opts, :render) do
      :string ->
        js_tag_eex(src: src)

      :map ->
        Map.update!(@js_map, :attributes, &Map.put(&1, :src, src))
    end
    |> link_tag(Keyword.take(opts, [:type]))
  end

  def link_tag(html, type: :raw) when is_binary(html), do: raw(html)

  def link_tag(html, _), do: html

  defp get_mix_env(:prod), do: :prod
  defp get_mix_env(:prod_local), do: :prod
  defp get_mix_env(env), do: env
end
