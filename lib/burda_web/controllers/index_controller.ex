defmodule BurdaWeb.IndexController do
  use Phoenix.Controller

  @dialyzer {:no_return, get_offline_template_assigns: 2}

  alias Burda.Shift.Api
  alias BurdaWeb.LayoutView
  alias BurdaWeb.IndexView

  @main_css_handlebar "{{{ mainCss }}}"
  @main_js_handlebar "{{{ mainJs }}}"

  @page_js "routes/index.js"
  @page_css "routes/index.css"
  @page_title_handlebar "{{ pageTitle }}"
  @page_main_css_handlebar "{{{ pageMainCss }}}"
  @page_other_css_handlebar "{{{ pageOtherCss }}}"
  @page_main_js_handlebar "{{{ pageMainJs }}}"
  @page_other_js_handlebar "{{{ pageOtherJs }}}"
  @page_main_content_handlebar "{{{ pageMainContent }}}"
  @page_top_menu_handlebar "{{{ pageTopMenu }}}"
  @app_html "app.html"
  @index_html "index.html"
  @menu_html "menu.html"
  @shift_detail "_shift-detail.html"
  @shift_earnings_summary "_shift.earnings.summary.html"

  @index_offline_templates [
    index_offline_template: "indexTemplate",
    index_offline_menu_template: "indexMenuTemplate",
    app_shell_offline_template: "appShellTemplate",
    shift_detail_offline_template: "shiftDetailTemplate",
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

  plug(:assign_defaults)

  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _) do
    today = conn.assigns.today

    render(
      conn,
      @index_html,
      all_shifts: Api.shifts_for_current_month(today.year, today.month),
      new_shift_path: BurdaWeb.Router.Helpers.shift_path(conn, :new)
    )
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

  def index_offline_template,
    do: Phoenix.View.render_to_string(IndexView, @index_html, [])

  def index_offline_menu_template,
    do: Phoenix.View.render_to_string(IndexView, @menu_html, [])

  def shift_detail_offline_template,
    do: Phoenix.View.render_to_string(IndexView, @shift_detail, [])

  def shift_earnings_summary_offline_template,
    do: Phoenix.View.render_to_string(IndexView, @shift_earnings_summary, [])

  def index_offline_template_assigns,
    do: %{
      page_title: "Shift Times",
      page_main_css: LayoutView.page_css(@page_css, nil),
      page_main_js: LayoutView.page_js(@page_js, nil)
    }

  def index_offline_templates, do: @index_offline_templates

  def app_shell_offline_template,
    do:
      Phoenix.View.render_to_string(
        BurdaWeb.LayoutView,
        @app_html,
        view_module_: true,
        page_title: @page_title_handlebar,
        page_main_css_handlebar: @page_main_css_handlebar,
        page_other_css_handlebar: @page_other_css_handlebar,
        page_main_js_handlebar: @page_main_js_handlebar,
        page_other_js_handlebar: @page_other_js_handlebar,
        page_main_content_handlebar: @page_main_content_handlebar,
        page_top_menu_handlebar: @page_top_menu_handlebar,
        main_css_handlebar: @main_css_handlebar,
        main_js_handlebar: @main_js_handlebar
      )

  def get_offline_template_assigns(conn, _) do
    {_, data} =
      BurdaWeb.Schema.run_query(
        @offline_template_assigns_query,
        @offline_template_assigns_query_variables
      )

    json(conn, data)
  end
end
