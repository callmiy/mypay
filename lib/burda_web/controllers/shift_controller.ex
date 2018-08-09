defmodule BurdaWeb.ShiftController do
  use Phoenix.Controller

  alias Burda.Meta.Api, as: MetaApi

  @page_css "routes/shift.css"
  @page_js "routes/shift.js"

  plug(:assign_defaults)

  @spec new(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def new(conn, _params) do
    render(
      conn,
      "new-shift.html",
      metas: MetaApi.list()
    )
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
