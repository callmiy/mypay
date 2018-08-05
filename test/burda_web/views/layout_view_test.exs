defmodule BurdaWeb.LayoutViewTest do
  use BurdaWeb.ConnCase, async: true
  import Phoenix.HTML, only: [raw: 1]

  alias BurdaWeb.LayoutView, as: View

  # @static_path "/priv/static"
  @webpack_server_url View.webpack_server_url()
  @index_css_path View.index_css_path()
  @index_css_js_path View.index_css_js_path()

  test "page_link_tag/2 for layout prod env", %{conn: conn} do
    conn = put_private(conn, :phoenix_endpoint, @endpoint)
    path = static_path(conn, "/css/#{@index_css_path}")

    assert View.link_tag(:prod, conn, :index) ==
             raw(
               ~s(<link rel="stylesheet" type="text/css" href="#{path}" media="screen,projection" />)
             )
  end

  test "page_link_tag/2 for layout dev env", %{conn: conn} do
    assert View.link_tag(:dev, conn, :index) ==
             raw(~s(<script src="#{@webpack_server_url}/css/#{@index_css_js_path}"></script>))
  end

  test "page_link_tag/2 for pages with no css" do
    assert View.link_tag(nil) == ""
  end

  test "page_link_tag/2 for pages with css dev", %{conn: conn} do
    conn = put_private(conn, :phoenix_endpoint, @endpoint)

    assert View.link_tag(:dev, conn, "routes/styles.css") ==
             raw(~s(<script src="#{@webpack_server_url}/css/routes/styles.js"></script>))
  end

  test "page_link_tag/2 for pages with css prod", %{conn: conn} do
    conn = put_private(conn, :phoenix_endpoint, @endpoint)
    path = "routes/styles.css"

    assert View.link_tag(:prod, conn, path) ==
             raw(
               ~s(<link rel="stylesheet" type="text/css" href="/css/#{path}" media="screen,projection" />)
             )
  end
end
