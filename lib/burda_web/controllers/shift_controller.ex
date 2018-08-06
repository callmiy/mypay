defmodule BurdaWeb.ShiftController do
  use Phoenix.Controller

  @page_css "routes/shift.css"
  @page_js "routes/shift.js"
  @new_meta_form_css "components/new-meta-form.css"

  plug(:assign_defaults)

  @spec new(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def new(conn, _params) do
    render(conn, "new-shift.html", new_meta_form_css: @new_meta_form_css)
  end

  @spec assign_defaults(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def assign_defaults(conn, _),
    do:
      merge_assigns(
        conn,
        page_css: @page_css,
        page_js: @page_js
      )
end
