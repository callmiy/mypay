defmodule BurdaWeb.LayoutViewTest do
  use BurdaWeb.ConnCase, async: true
  import Phoenix.HTML, only: [raw: 1]

  alias BurdaWeb.LayoutView, as: View
  alias BurdaWeb.Endpoint

  @index_css_path View.index_css_path()
  @index_css_js_path View.index_css_js_path()

  test "page_css/2 for pages with no css" do
    assert View.page_css(nil, []) == ""
  end

  test "page_css/2 for pages with no js" do
    assert View.page_js(nil, []) == ""
  end

  test "page_css/2, index page env: dev, render: string, type: raw" do
    src = View.webpack_server_url(path1: "css", path2: @index_css_js_path)

    assert View.link_tag(:dev, :index, render: :string, type: :raw) ==
             View.js_tag_eex(src: src)
             |> raw()
  end

  test "page_css/2, index page env: dev, render: map" do
    src = View.webpack_server_url(path1: "css", path2: @index_css_js_path)

    assert View.link_tag(:dev, :index, render: :map) ==
             %{
               tag_name: "script",
               attributes: %{
                 src: src
               }
             }
  end

  test "page_css/2, other pages env: dev, render: string, type: raw" do
    src =
      View.webpack_server_url(
        path1: "css",
        path2: "some/page/for/testing.js"
      )

    assert View.link_tag(:dev, "some/page/for/testing.css", render: :string, type: :raw) ==
             View.js_tag_eex(src: src)
             |> raw()
  end

  test "page_css/2, other pages env: dev, render: map" do
    src =
      View.webpack_server_url(
        path1: "css",
        path2: "some/page/for/testing.js"
      )

    assert View.link_tag(:dev, "some/page/for/testing.css", render: :map) ==
             %{
               tag_name: "script",
               attributes: %{
                 src: src
               }
             }
  end

  test "page_css/2, index page env: prod, render: string, type: raw" do
    href = Endpoint.static_path("/css/#{@index_css_path}")

    assert View.link_tag(:prod, :index, render: :string, type: :raw) ==
             View.css_tag_eex(href: href)
             |> raw()
  end

  test "page_css/2, index page env: prod, render: map" do
    href = Endpoint.static_path("/css/#{@index_css_path}")

    assert %{
             tag_name: "link",
             attributes: %{
               href: ^href
             }
           } = View.link_tag(:prod, :index, render: :map)
  end

  test "page_css/2, other page env: prod, render: string, type: raw" do
    href = Endpoint.static_path("/css/some/page/for/testing.css")

    assert View.link_tag(:prod, "some/page/for/testing.css", render: :string, type: :raw) ==
             View.css_tag_eex(href: href)
             |> raw()
  end

  test "page_css/2, other page env: prod, render: map" do
    href = Endpoint.static_path("/css/some/page/for/testing.css")

    assert %{
             tag_name: "link",
             attributes: %{
               href: ^href
             }
           } = View.link_tag(:prod, "some/page/for/testing.css", render: :map)
  end

  test "page_js/2, env: prod, render: string, type: raw" do
    src = Endpoint.static_path("/js/#{@index_css_js_path}")

    assert View.script_tag(
             :prod,
             @index_css_js_path,
             render: :string,
             type: :raw
           ) ==
             View.js_tag_eex(src: src)
             |> raw()
  end

  test "page_js/2, env: prod, render: map" do
    src = Endpoint.static_path("/js/#{@index_css_js_path}")

    assert %{
             tag_name: "script",
             attributes: %{
               src: ^src
             }
           } = View.script_tag(:prod, @index_css_js_path, render: :map)
  end

  test "page_js/2, env: dev, render: string, type: raw" do
    src =
      View.webpack_server_url(
        path1: "js",
        path2: @index_css_js_path
      )

    assert View.script_tag(
             :dev,
             @index_css_js_path,
             render: :string,
             type: :raw
           ) ==
             View.js_tag_eex(src: src)
             |> raw()
  end

  test "page_js/2, env: dev, render: map" do
    src =
      View.webpack_server_url(
        path1: "js",
        path2: @index_css_js_path
      )

    assert %{
             tag_name: "script",
             attributes: %{
               src: ^src
             }
           } = View.script_tag(:dev, @index_css_js_path, render: :map)
  end
end
