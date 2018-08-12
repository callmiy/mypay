defmodule BurdaWeb.ShiftController do
  use Phoenix.Controller

  alias Burda.Meta.Api, as: MetaApi

  @page_css "routes/shift.css"
  @page_js "routes/shift.js"

  @months_of_year [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                  ]
                  |> Enum.with_index(1)
                  |> Enum.map(fn {m, index} ->
                    {
                      index,
                      %{
                        display: m,
                        selected: ""
                      }
                    }
                  end)
                  |> Enum.into(%{})

  @days_of_month 1..31
                 |> Enum.map(
                   &{&1,
                    %{
                      display: String.pad_leading("#{&1}", 2, "0"),
                      selected: ""
                    }}
                 )
                 |> Enum.into(%{})

  plug(:assign_defaults)

  @spec new(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def new(conn, _params) do
    today = Date.utc_today()

    months_of_year =
      Map.update!(
        @months_of_year,
        today.month,
        &Map.put(&1, :selected, "selected")
      )

    days_of_month =
      Map.update!(
        @days_of_month,
        today.day,
        &Map.put(&1, :selected, "selected")
      )

    year = today.year

    years =
      -4..-1
      |> Enum.map(&{&1 + year, ""})
      |> Enum.concat([{year, "selected"}])

    render(
      conn,
      "new-shift.html",
      metas: MetaApi.list(),
      months_of_year: months_of_year,
      days_of_month: days_of_month,
      years: years,
      page_title: "New Shift"
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
