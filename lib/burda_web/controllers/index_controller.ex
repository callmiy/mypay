defmodule BurdaWeb.IndexController do
  use Phoenix.Controller

  # alias BurdaWeb.Schema
  # alias BurdaWeb.Query.Shift, as: Query
  alias Burda.Shift.Api
  alias BurdaWeb.LayoutView
  alias BurdaWeb.IndexView

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

  @index_offline_templates [
    index_offline_template: "indexTemplate",
    index_offline_menu_template: "indexMenuTemplate",
    app_shell_offline_template: "appShellTemplate",
    shift_detail_offline_template: "shiftDetailTemplate"
  ]

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
    conn
    |> put_resp_header("content-type", "text/html")
    |> resp(200, index_offline_template())
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

  def index_offline_template_assigns,
    do: %{
      pageTitle: "Shift Times",
      pageMainCss: LayoutView.page_css(@page_css, render: :string),
      pageMainJs: LayoutView.page_js(@page_js, render: :string),
      cacheStatic:
        [
          LayoutView.js_css_src(:css, @page_css),
          LayoutView.js_css_src(:js, @page_js)
        ]
        |> Enum.map(fn {_, path} -> path end)
    }

  def get_index_offline_template_assigns(conn, _),
    do:
      conn
      |> json(index_offline_template_assigns())

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
        page_top_menu_handlebar: @page_top_menu_handlebar
      )
end
