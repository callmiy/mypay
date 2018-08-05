defmodule BurdaWeb.IndexView do
  use BurdaWeb, :view

  @iso_time "{ISOtime}"

  @spec format_time_iso(Time.t()) :: binary()
  def format_time_iso(%Time{} = time),
    do:
      time
      |> Timex.format!(@iso_time)
      |> String.slice(0, 8)
end
