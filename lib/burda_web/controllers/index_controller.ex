defmodule BurdaWeb.IndexController do
  use Phoenix.Controller

  alias Burda.Shift.Api

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

  def assign_defaults(conn, _) do
    today = Date.utc_today()

    merge_assigns(
      conn,
      current_month: Timex.format!(today, "{Mshort}/{YYYY}"),
      today: today
    )
  end
end
