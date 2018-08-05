defmodule BurdaWeb.LayoutView do
  use BurdaWeb, :view

  @webpack_server_url "http://localhost:8080"
  @index_js_path "commons.js"
  @index_css_js_path "commons.js"
  @index_css_path "commons.css"

  # EXPORTS FOR TEST
  @spec webpack_server_url() :: <<_::168>>
  def webpack_server_url, do: @webpack_server_url

  @spec index_css_path() :: <<_::88>>
  def index_css_path, do: @index_css_path

  @spec index_css_js_path() :: <<_::80>>
  def index_css_js_path, do: @index_css_js_path
  # / EXPORTS FOR TEST

  @spec page_js(Plug.Conn.t(), any()) ::
          <<>>
          | {:safe,
             String.t()
             | maybe_improper_list(
                 String.t() | maybe_improper_list(any(), String.t() | []) | byte(),
                 String.t() | []
               )}
  def page_js(conn, :index),
    do:
      Mix.env()
      |> get_mix_env()
      |> script_tag(conn, @index_js_path)

  def page_js(_, nil), do: ""

  def page_js(conn, path),
    do:
      Mix.env()
      |> get_mix_env()
      |> script_tag(conn, path)

  defp script_tag(:prod, conn, path),
    do:
      conn
      |> static_path("/js/#{path}")
      |> script_tag()

  defp script_tag(:dev, _conn, path),
    do: script_tag("#{@webpack_server_url}/js/#{path}")

  defp script_tag(src), do: raw(~s(<script src="#{src}"></script>))

  # -------------------------------------------PAGE CSS---------------------
  @spec page_css(Plug.Conn.t(), Atom.t() | String.t()) ::
          <<>>
          | {:safe,
             String.t()
             | maybe_improper_list(
                 String.t() | maybe_improper_list(any(), String.t() | []) | byte(),
                 String.t() | []
               )}
  def page_css(conn, :index),
    do:
      Mix.env()
      |> get_mix_env()
      |> link_tag(conn, :index)

  def page_css(_conn, nil), do: link_tag(nil)

  def page_css(conn, path),
    do:
      Mix.env()
      |> get_mix_env()
      |> link_tag(conn, path)

  def link_tag(:prod, conn, :index), do: link_tag(:prod, conn, @index_css_path)

  def link_tag(:prod, conn, path),
    do:
      conn
      |> static_path("/css/#{path}")
      |> link_tag()

  def link_tag(:dev, conn, :index),
    do: link_tag(:dev, conn, @index_css_js_path)

  def link_tag(:dev, _conn, path) do
    path = String.replace(path, ~r/\.css$/, ".js")
    raw(~s(<script src="http://localhost:8080/css/#{path}"></script>))
  end

  def link_tag(_, conn, path), do: link_tag(:dev, conn, path)

  def link_tag(nil), do: ""

  def link_tag(href),
    do:
      raw(~s(<link rel="stylesheet" type="text/css" href="#{href}" media="screen,projection" />))

  defp get_mix_env(:prod), do: :prod
  defp get_mix_env(:prod_local), do: :prod
  defp get_mix_env(env), do: env
end
