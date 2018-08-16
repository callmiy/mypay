defmodule BurdaWeb.IndexController do
  use Phoenix.Controller

  # alias BurdaWeb.Schema
  # alias BurdaWeb.Query.Shift, as: Query
  alias Burda.Shift.Api

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

  plug(:assign_defaults)

  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _) do
    today = conn.assigns.today

    render(
      conn,
      @index_html,
      all_shifts: Api.shifts_for_current_month(today.year, today.month)
    )
  end

  def index_skeleton(conn, _params) do
    html =
      Phoenix.View.render_to_string(
        BurdaWeb.IndexView,
        @index_html,
        []
      )

    conn
    |> put_resp_header("content-type", "text/html")
    |> resp(200, html)
  end

  def app_shell(conn, _params) do
    conn
    |> put_resp_header("content-type", "text/html")
    |> resp(200, app_shell_string())
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

  def app_shell_string,
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
        page_top_menu_handlebar: @page_top_menu_handlebar
      )
end
