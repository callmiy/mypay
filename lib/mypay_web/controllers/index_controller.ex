defmodule MyPayWeb.IndexController do
  use Phoenix.Controller

  @dialyzer {
    :no_return,
    [
      get_offline_template_assigns: 2,
      get_shifts_for_last_six_months_gql: 2,
      index: 2
    ]
  }

  alias MyPayWeb.LayoutView
  alias MyPayWeb.IndexView
  alias MyPay.Shift.Api

  @page_js "routes/index.js"
  @page_css "routes/index.css"
  @index_html "index.html"

  @offline_template_assigns_query """
    fragment ChildFragment on MainChildTemplateAssigns {
      pageTitle
        pageMainJs
        pageMainCss
        pageOtherCss
    }

    query GetAllTemplates($shiftNew: GetMainChildTemplateAssigns!, $index: GetMainChildTemplateAssigns! ) {


      shiftNew: mainChildTemplateAssigns(route: $shiftNew ) {
        ...ChildFragment
      }

      index: mainChildTemplateAssigns(route: $index ) {
        ...ChildFragment
      }

      app: mainAppTemplateAssigns {
        mainJs
        mainCss
      }
    }
  """

  @offline_template_assigns_query_variables %{
    "shiftNew" => %{
      "action" => "SHIFT_NEW"
    },
    "index" => %{
      "action" => "INDEX_NEW"
    }
  }

  @recent_six_months_shift_query """
    query GetShiftsForLastSixMonths($shift: GetShiftInput) {
      shifts(shift: $shift) {
        ...ShiftFragment
      }
    }

    fragment ShiftFragment on Shift {
      id
      _id
      date
      dateWeekShortDay
      startTime
      endTime
      hoursGross
      normalHours
      normalPay
      nightHours
      nightSupplPay
      sundayHours
      sundaySupplPay
      totalPay
      meta {
        id
      }
      schemaType
    }
  """

  @format_mmm_yyyy "{Mshort}/{YYYY}"

  plug(:assign_defaults)

  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _) do
    today =
      Timex.Timezone.Local.lookup()
      |> Timex.now()

    largest =
      today
      |> Timex.end_of_month()
      |> Timex.format!("{ISOdate}")

    least =
      today
      |> Timex.shift(months: -5)
      |> Timex.beginning_of_month()

    shifts =
      get_shifts_for_last_six_months_gql(
        largest,
        Timex.format!(least, "{ISOdate}")
      )

    least_month_str = Timex.format!(least, "{Mshort}")
    today_formatted = Timex.format!(today, @format_mmm_yyyy)

    # e.g "Jan-June/2018"
    shifts_for_month = "#{least_month_str}-#{today_formatted}"

    render(
      conn,
      @index_html,
      all_shifts: shifts,
      new_shift_path: MyPayWeb.Router.Helpers.shift_path(conn, :new),
      shifts_for_month: shifts_for_month
    )
  end

  @doc false
  def assign_defaults(conn, _),
    do:
      merge_assigns(
        conn,
        page_js: @page_js,
        page_css: @page_css
      )

  @doc false
  def index_offline_template_assigns,
    do: %{
      page_main_css: LayoutView.page_css(@page_css, nil),
      page_main_js: LayoutView.page_js(@page_js, nil)
    }

  @doc false
  def index_offline_templates do
    [
      {
        Phoenix.View.render_to_string(IndexView, @index_html, []),
        "indexTemplate"
      },
      {
        Phoenix.View.render_to_string(IndexView, "_menu.html", []),
        "indexMenuTemplate"
      },
      {
        Phoenix.View.render_to_string(
          MyPayWeb.LayoutView,
          "app.html",
          page_title: "{{ pageTitle }}",
          page_main_css_handlebar: "{{{ pageMainCss }}}",
          page_other_css_handlebar: "{{{ pageOtherCss }}}",
          page_main_js_handlebar: "{{{ pageMainJs }}}",
          page_other_js_handlebar: "{{{ pageOtherJs }}}",
          main_css_handlebar: "{{{ mainCss }}}",
          main_js_handlebar: "{{{ mainJs }}}"
        ),
        "appShellTemplate"
      },
      {
        Phoenix.View.render_to_string(IndexView, "_shift-detail.html", []),
        "shiftDetailTemplate"
      },
      {
        Phoenix.View.render_to_string(
          IndexView,
          "_shift-detail-row.html",
          []
        ),
        "partials/shiftDetailRowTemplate"
      },
      {
        Phoenix.View.render_to_string(
          IndexView,
          "_shift-summary.html",
          []
        ),
        "partials/shiftSummaryTemplate"
      },
      {
        Phoenix.View.render_to_string(
          IndexView,
          "_shifts-for-month.html",
          []
        ),
        "shiftsForMonthTemplate"
      },
      {
        Phoenix.View.render_to_string(
          IndexView,
          "_modal.html",
          []
        ),
        "modalTemplate"
      }
    ]
  end

  @doc false
  def get_offline_template_assigns(conn, _) do
    {_, data} =
      MyPayWeb.Schema.run_query(
        @offline_template_assigns_query,
        @offline_template_assigns_query_variables
      )

    json(conn, data)
  end

  defp get_shifts_for_last_six_months_gql(largest, least) do
    variables = %{
      "shift" => %{
        "where" => %{
          "and" => [
            %{
              "date" => %{
                "value" => least,
                "key" => "GTE"
              }
            },
            %{
              "date" => %{
                "value" => largest,
                "key" => "LTE"
              }
            }
          ]
        }
      }
    }

    {:ok, %{data: %{"shifts" => shifts}}} =
      MyPayWeb.Schema.run_query(
        @recent_six_months_shift_query,
        variables
      )

    Api.group_and_summarize(shifts)
  end
end
