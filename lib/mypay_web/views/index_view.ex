defmodule MyPayWeb.IndexView do
  use MyPayWeb, :view

  @iso_time "{ISOtime}"
  @week_day_name_month_day_format "{WDshort}, {D}"

  @spec format_time_iso(Time.t() | nil) :: binary() | nil
  def format_time_iso(%Time{} = time),
    do:
      time
      |> Timex.format!(@iso_time)
      |> String.slice(0, 8)

  def format_time_iso(_), do: nil

  @doc ~S"""
    Send the top menu to be rendered by the layout view
  """
  @spec top_menu(%{current_month: String.t()}) :: Plug.Conn.t()
  def top_menu(%{current_month: month}),
    do: render("menu.html", current_month: month)

  def format_week_day_name_month_day(%Date{} = date),
    do: Timex.format!(date, @week_day_name_month_day_format)

  def format_week_day_name_month_day(_), do: nil
end
