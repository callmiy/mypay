defmodule BurdaWeb.IndexView do
  use BurdaWeb, :view

  alias Burda.Shift

  @iso_time "{ISOtime}"
  @new_decimal Decimal.new("0.00")
  @week_day_name_month_day_format "{WDshort}, {D}"

  @spec format_time_iso(Time.t()) :: binary()
  def format_time_iso(%Time{} = time),
    do:
      time
      |> Timex.format!(@iso_time)
      |> String.slice(0, 8)

  def format_time_iso(_), do: nil

  @spec total_earnings([%Shift{}] | any()) :: Decimal.t()
  def total_earnings([]), do: ""

  def total_earnings(shifts) when is_list(shifts),
    do: Enum.reduce(shifts, @new_decimal, &Decimal.add(&1.total_pay, &2))

  def total_earnings(_), do: ""

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
