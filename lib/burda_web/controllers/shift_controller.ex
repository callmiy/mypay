defmodule BurdaWeb.ShiftController do
  use Phoenix.Controller

  alias Burda.Meta.Api, as: MetaApi
  alias BurdaWeb.LayoutView
  alias BurdaWeb.ShiftView

  @new_shift_html "new-shift.html"
  @menu_html "menu.html"
  @page_css "routes/shift.css"
  @page_js "routes/shift.js"
  @new_form_css_path "components/new-meta-form.css"

  @new_offline_templates [
    new_offline_template: "newShiftTemplate",
    new_offline_menu_template: "newShiftMenuTemplate",
    new_date_offline_template: "newShiftDateTemplate",
    new_metas_select_offline_template: "newShiftMetasSelectTemplate"
  ]

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
    now = Timex.now(Timex.Timezone.Local.lookup())

    months_of_year =
      Map.update!(
        @months_of_year,
        now.month,
        &Map.put(&1, :selected, "selected")
      )

    days_of_month =
      Map.update!(
        @days_of_month,
        now.day,
        &Map.put(&1, :selected, "selected")
      )

    year = now.year

    years =
      -4..-1
      |> Enum.map(&{&1 + year, ""})
      |> Enum.concat([{year, "selected"}])

    metas =
      case MetaApi.list(%{order_by: %{id: :desc}}) do
        [] ->
          {%{id: 0}, []}

        [latest_meta | rest_metas] ->
          [
            {latest_meta, "selected"}
            | Enum.map(rest_metas, &{&1, ""})
          ]
      end

    index_path = BurdaWeb.Router.Helpers.index_path(conn, :index)
    this_path = BurdaWeb.Router.Helpers.shift_path(conn, :new)

    go_back_url =
      case get_req_header(conn, "referer") do
        [url | _] ->
          if(url == this_path, do: index_path, else: url)

        _ ->
          index_path
      end

    render(
      conn,
      @new_shift_html,
      metas: metas,
      year_default: year,
      months_of_year: months_of_year,
      days_of_month: days_of_month,
      years: years,
      page_title: "New Shift",
      go_back_url: go_back_url
    )
  end

  def new_offline_template,
    do: Phoenix.View.render_to_string(ShiftView, @new_shift_html, [])

  def new_offline_menu_template,
    do: Phoenix.View.render_to_string(ShiftView, @menu_html, [])

  def new_date_offline_template,
    do: Phoenix.View.render_to_string(ShiftView, "_new-shift-date.html", [])

  def new_metas_select_offline_template,
    do:
      Phoenix.View.render_to_string(
        ShiftView,
        "_new-shift-metas-select.html",
        []
      )

  def new_offline_template_assigns,
    do: %{
      page_title: "New Shift",
      page_main_css: LayoutView.page_css(@page_css, nil),
      page_main_js: LayoutView.page_js(@page_js, nil),
      page_other_css: LayoutView.page_css(@new_form_css_path, nil)
    }

  def new_offline_templates, do: @new_offline_templates

  @spec assign_defaults(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def assign_defaults(conn, _),
    do:
      merge_assigns(
        conn,
        page_css: @page_css,
        page_js: @page_js,
        preload_resources: [
          LayoutView.js_css_src(:css, @new_form_css_path)
        ]
      )
end
