defmodule MyPayWeb.LayoutViewTest do
  use MyPayWeb.ConnCase, async: true
  alias MyPayWeb.LayoutView, as: View

  test "js_css_src/2 with nil path" do
    assert nil == View.js_css_src(1, nil)
  end
end
