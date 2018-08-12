defmodule BurdaWeb.MetaWeb do
  @moduledoc ~S"""
  Utilites used by MeteChannel and MetaController
  """

  alias Burda.Meta.Api
  alias BurdaWeb.MetaView
  alias BurdaWeb.LayoutView

  @new_form_css_path "components/new-meta-form.css"
  @new_form_js_path "components/new-meta-form.js"

  def new_form(conn_end_point) do
    html =
      Phoenix.View.render_to_string(
        MetaView,
        "new-meta.html",
        changeset: Api.change_(),
        conn: conn_end_point
      )

    %{
      html: html,
      css: LayoutView.page_css(@new_form_css_path, render: :map),
      js: LayoutView.page_js(@new_form_js_path, render: :map)
    }
  end
end
