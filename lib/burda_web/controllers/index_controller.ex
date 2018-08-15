defmodule BurdaWeb.IndexController do
  use Phoenix.Controller

  # alias BurdaWeb.Schema
  # alias BurdaWeb.Query.Shift, as: Query
  alias Burda.Shift.Api

  @page_js "routes/index.js"
  @page_css "routes/index.css"

  plug(:assign_defaults)

  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _) do
    today = conn.assigns.today

    render(
      conn,
      "index.html",
      all_shifts: Api.shifts_for_current_month(today.year, today.month)
    )
  end

  def index_skeleton(conn, _params) do
    html =
      Phoenix.View.render_to_string(
        BurdaWeb.IndexView,
        "index.html",
        []
      )

    conn
    |> put_resp_header("content-type", "text/html")
    |> resp(200, html)
  end

  def assign_defaults(conn, _) do
    today = Date.utc_today()

    merge_assigns(
      conn,
      page_js: @page_js,
      page_css: @page_css,
      current_month: Timex.format!(today, "{Mshort}/{YYYY}"),
      today: today
    )
  end
end
