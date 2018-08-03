defmodule BurdaWeb.LayoutView do
  use BurdaWeb, :view

  @webpack_server_url "http://localhost:8080"
  @index_js_path "commons.js"
  @index_css_js_path "commons.js"
  @index_css_path "commons.css"

  def webpack_server_url, do: @webpack_server_url
  def index_css_path, do: @index_css_path
  def index_css_js_path, do: @index_css_js_path

  def page_js(conn, :index),
    do:
      Mix.env()
      |> script_tag(conn, @index_js_path)

  def page_js(_, nil), do: ""

  def page_js(conn, path),
    do:
      Mix.env()
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
  def page_css(conn, :index),
    do:
      Mix.env()
      |> link_tag(conn, :index)

  def page_css(_conn, nil), do: link_tag(nil)

  def page_css(conn, path),
    do:
      Mix.env()
      |> link_tag(conn, path)

  def link_tag(:prod, conn, :index), do: link_tag(:prod, conn, @index_css_path)

  def link_tag(:prod, conn, path),
    do:
      conn
      |> static_path("/css/#{path}")
      |> link_tag()

  def link_tag(:dev, conn, :index),
    do: link_tag(:dev, conn, @index_css_js_path)

  def link_tag(:dev, _conn, path),
    do: raw(~s(<script src="http://localhost:8080/css/#{path}"></script>))

  def link_tag(_, conn, path), do: link_tag(:dev, conn, path)

  def link_tag(nil), do: ""

  def link_tag(href),
    do:
      raw(~s(<link rel="stylesheet" type="text/css" href="#{href}" media="screen,projection" />))
end
