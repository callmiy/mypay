defmodule BurdaWeb.IndexView do
  use BurdaWeb, :view

  alias Burda.Shift

  @iso_time "{ISOtime}"
  @new_decimal Decimal.new("0.00")

  @spec format_time_iso(Time.t()) :: binary()
  def format_time_iso(%Time{} = time),
    do:
      time
      |> Timex.format!(@iso_time)
      |> String.slice(0, 8)

  @spec total_earnings(nonempty_list(%Shift{})) :: Decimal.t()
  def total_earnings(shifts) when is_list(shifts),
    do: Enum.reduce(shifts, @new_decimal, &Decimal.add(&1.total_pay, &2))

  @doc ~S"""
    Send the top menu to be rendered by the layout view
  """
  @spec top_menu(%{current_month: String.t()}) :: Plug.Conn.t()
  def top_menu(%{current_month: month}),
    do: render("menu.html", current_month: month)
end
