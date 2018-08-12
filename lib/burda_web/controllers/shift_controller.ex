defmodule BurdaWeb.ShiftController do
  use Phoenix.Controller

  alias Burda.Meta.Api, as: MetaApi

  @page_css "routes/shift.css"
  @page_js "routes/shift.js"
  @shift_duration_hrs_seconds 8 * 60 * 60

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
    end_time = Timex.now(Timex.Timezone.Local.lookup())
    start_time = Timex.shift(end_time, seconds: @shift_duration_hrs_seconds)

    months_of_year =
      Map.update!(
        @months_of_year,
        end_time.month,
        &Map.put(&1, :selected, "selected")
      )

    days_of_month =
      Map.update!(
        @days_of_month,
        end_time.day,
        &Map.put(&1, :selected, "selected")
      )

    year = end_time.year

    years =
      -4..-1
      |> Enum.map(&{&1 + year, ""})
      |> Enum.concat([{year, "selected"}])

    [latest_meta | rest_metas] = MetaApi.list()

    all_metas = [
      {latest_meta, "selected"}
      | Enum.map(rest_metas, &{&1, ""})
    ]

    render(
      conn,
      "new-shift.html",
      metas: all_metas,
      meta_id_default: latest_meta.id,
      year_default: year,
      months_of_year: months_of_year,
      month_default: end_time.month,
      days_of_month: days_of_month,
      day_default: end_time.day,
      years: years,
      page_title: "New Shift",
      shift_start_time: %{
        hour: start_time.hour,
        minute: start_time.minute
      },
      shift_end_time: %{
        hour: end_time.hour,
        minute: end_time.minute
      }
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
