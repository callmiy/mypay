defmodule BurdaWeb.LayoutView do
  use BurdaWeb, :view

  require EEx

  alias BurdaWeb.Endpoint

  @webpack_server_url "http://localhost:8080"
  @index_js_path "commons.js"
  @index_css_js_path "commons.js"
  @index_css_path "commons.css"

  EEx.function_from_string(
    :defp,
    :css_tag_eex,
    ~s(<link rel="stylesheet" type="text/css" href="<%= @href %>" media="screen,projection" />),
    [:assigns]
  )

  EEx.function_from_string(
    :defp,
    :js_tag_eex,
    ~s(<script src="<%= @src %>"></script>),
    [:assigns]
  )

  # EXPORTS FOR TEST
  @spec webpack_server_url() :: <<_::168>>
  def webpack_server_url, do: @webpack_server_url

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
  @spec page_js(Atom.t() | String.t(), :safe | :raw) ::
          <<>>
          | {:safe,
             String.t()
             | maybe_improper_list(
                 String.t() | maybe_improper_list(any(), String.t() | []) | byte(),
                 String.t() | []
               )}
  def page_js(path, type \\ :raw)

  def page_js(:index, type),
    do:
      Mix.env()
      |> get_mix_env()
      |> script_tag(@index_js_path, type)

  def page_js(nil, _), do: ""

  def page_js(path, type),
    do:
      Mix.env()
      |> get_mix_env()
      |> script_tag(path, type)

  defp script_tag(:prod, path, type),
    do:
      "/js/#{path}"
      |> Endpoint.static_path()
      |> script_tag(type)

  defp script_tag(:dev, path, type),
    do: script_tag("#{@webpack_server_url}/js/#{path}", type)

  defp script_tag(src, :raw), do: js_tag_eex(src: src) |> raw()
  defp script_tag(src, :safe), do: js_tag_eex(src: src)

  # -------------------------------------------PAGE CSS---------------------
  @spec page_css(Atom.t() | String.t(), :raw | :safe) ::
          <<>>
          | {:safe,
             String.t()
             | maybe_improper_list(
                 String.t() | maybe_improper_list(any(), String.t() | []) | byte(),
                 String.t() | []
               )}
  def page_css(path, type \\ :raw)

  def page_css(:index, type),
    do:
      Mix.env()
      |> get_mix_env()
      |> link_tag(:index, type)

  def page_css(nil, _), do: ""

  def page_css(path, type),
    do:
      Mix.env()
      |> get_mix_env()
      |> link_tag(path, type)

  @spec link_tag(:dev | :prod, any(), Atom.t()) ::
          <<>>
          | {:safe,
             binary()
             | maybe_improper_list(
                 binary() | maybe_improper_list(any(), binary() | []) | byte(),
                 binary() | []
               )}
  def link_tag(:prod, :index, type), do: link_tag(:prod, @index_css_path, type)

  def link_tag(:prod, href, type) do
    href = Endpoint.static_path("/css/#{href}")

    css_tag_eex(href: href)
    |> link_tag(type)
  end

  def link_tag(:dev, :index, type),
    do: link_tag(:dev, @index_css_js_path, type)

  def link_tag(:dev, src, type) do
    src = String.replace(src, ~r/\.css$/, ".js")

    js_tag_eex(src: "http://localhost:8080/css/#{src}")
    |> link_tag(type)
  end

  def link_tag(href, :raw), do: raw(href)
  def link_tag(href, :safe), do: href

  @spec encode_www_form(any()) :: binary()
  def encode_www_form(nil), do: ""

  def encode_www_form(path) do
    {:safe, text} = page_css(path)
    URI.encode_www_form(text)
  end

  defp get_mix_env(:prod), do: :prod
  defp get_mix_env(:prod_local), do: :prod
  defp get_mix_env(env), do: env
end
