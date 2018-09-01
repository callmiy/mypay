defmodule MyPayWeb.IndexController do
  use Phoenix.Controller

  @dialyzer {:no_return, get_offline_template_assigns: 2}

  alias MyPay.Shift.Api
  alias MyPayWeb.LayoutView
  alias MyPayWeb.IndexView

  @main_css_handlebar "{{{ mainCss }}}"
  @main_js_handlebar "{{{ mainJs }}}"

  @page_js "routes/index.js"
  @page_css "routes/index.css"
  @page_title_handlebar "{{ pageTitle }}"
  @page_main_css_handlebar "{{{ pageMainCss }}}"
  @page_other_css_handlebar "{{{ pageOtherCss }}}"
  @page_main_js_handlebar "{{{ pageMainJs }}}"
  @page_other_js_handlebar "{{{ pageOtherJs }}}"
  @page_top_menu_handlebar "{{{ pageTopMenu }}}"
  @app_html "app.html"
  @index_html "index.html"
  @menu_html "menu.html"
  @shift_detail "_shift-detail.html"
  @shift_detail_row "_shift-detail-row.html"
  @shift_earnings_summary "_shift.earnings.summary.html"

  @index_offline_templates [
    index_offline_template: "indexTemplate",
    index_offline_menu_template: "indexMenuTemplate",
    app_shell_offline_template: "appShellTemplate",
    shift_detail_offline_template: "shiftDetailTemplate",
    shift_detail_row_offline_template: "partials/shiftDetailRowTemplate",
    shift_earnings_summary_offline_template: "shiftEarningSummaryTemplate"
  ]

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

  @new_decimal Decimal.new("0.00")
  @format_mmm_yyyy "{Mshort}/{YYYY}"

  plug(:assign_defaults)

  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _) do
    today =
      Timex.Timezone.Local.lookup()
      |> Timex.now()

    largest = today.month
    least = largest - 5

    shifts =
      case get_shifts_for_last_six_months(today.year, largest, least) do
        [] -> nil
        shifts -> shifts
      end

    least_month_str =
      today
      |> Timex.shift(months: -5)
      |> Timex.format!("{Mshort}")

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

  def index_offline_template,
    do: Phoenix.View.render_to_string(IndexView, @index_html, [])

  def index_offline_menu_template,
    do: Phoenix.View.render_to_string(IndexView, @menu_html, [])

  def shift_detail_offline_template,
    do: Phoenix.View.render_to_string(IndexView, @shift_detail, [])

  def shift_detail_row_offline_template,
    do:
      Phoenix.View.render_to_string(
        IndexView,
        @shift_detail_row,
        []
      )

  def shift_earnings_summary_offline_template,
    do: Phoenix.View.render_to_string(IndexView, @shift_earnings_summary, [])

  def index_offline_template_assigns,
    do: %{
      page_main_css: LayoutView.page_css(@page_css, nil),
      page_main_js: LayoutView.page_js(@page_js, nil)
    }

  def index_offline_templates, do: @index_offline_templates

  def app_shell_offline_template,
    do:
      Phoenix.View.render_to_string(
        MyPayWeb.LayoutView,
        @app_html,
        view_module_: true,
        page_title: @page_title_handlebar,
        page_main_css_handlebar: @page_main_css_handlebar,
        page_other_css_handlebar: @page_other_css_handlebar,
        page_main_js_handlebar: @page_main_js_handlebar,
        page_other_js_handlebar: @page_other_js_handlebar,
        page_top_menu_handlebar: @page_top_menu_handlebar,
        main_css_handlebar: @main_css_handlebar,
        main_js_handlebar: @main_js_handlebar
      )

  def get_offline_template_assigns(conn, _) do
    {_, data} =
      MyPayWeb.Schema.run_query(
        @offline_template_assigns_query,
        @offline_template_assigns_query_variables
      )

    json(conn, data)
  end

  defp calc_total_earnings_normal_hours(shifts) do
    case shifts do
      [] ->
        {nil, nil, nil}

      shifts ->
        {total_earnings, total_normal_hours} =
          Enum.reduce(
            shifts,
            {@new_decimal, 0},
            fn shift, {earnings, hours} ->
              {
                Decimal.add(shift.total_pay, earnings),
                shift.normal_hours + hours
              }
            end
          )

        {shifts, total_earnings, Float.round(total_normal_hours, 2)}
    end
  end

  defp get_shifts_for_last_six_months(year, largest, least) do
    Api.list(%{
      where: %{
        year: year,
        month: %{
          gt: least,
          lteq: largest
        }
      }
    })
    |> Enum.group_by(&Timex.format!(&1.date, "{YYYY}-{M}"), & &1)
    |> Enum.reverse()
    |> Enum.map(fn {date, shifts} ->
      {shifts, total_earnings, total_normal_hours} = calc_total_earnings_normal_hours(shifts)

      date =
        "#{date}-1"
        |> Timex.parse!("{YYYY}-{M}-{D}")
        |> Timex.format!(@format_mmm_yyyy)

      [
        shifts: shifts,
        summary: [
          date: date,
          total_earnings: total_earnings,
          total_normal_hours: total_normal_hours
        ]
      ]
    end)
  end
end
