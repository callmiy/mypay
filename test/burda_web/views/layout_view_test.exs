defmodule BurdaWeb.LayoutViewTest do
  use BurdaWeb.ConnCase, async: true

  alias BurdaWeb.LayoutView, as: View

  test "js_css_src/2 when path is nil" do
    assert View.js_css_src(:js, nil) == nil
    assert View.js_css_src(:css, nil) == nil
  end

  test "js_css_src/3 for css and MIX_ENV=dev" do
    assert View.js_css_src(:dev, :css, "path.css") == {
             :css_js,
             View.webpack_server_url(path1: "css", path2: "path.js")
           }
  end

  test "js_css_src/3 for css and MIX_ENV=prod " do
    assert View.js_css_src(:prod, :css, "path.css") == {:css, "/css/path.css"}
  end

  test "js_css_src/3 for js and MIX_ENV=dev" do
    assert View.js_css_src(:dev, :js, "path.js") == {
             :js,
             View.webpack_server_url(path1: "js", path2: "path.js")
           }
  end

  test "js_css_src/3 for js and MIX_ENV=prod " do
    assert View.js_css_src(:prod, :js, "path.js") == {:js, "/js/path.js"}
  end
end
