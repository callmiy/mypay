defmodule BurdaWeb.ShiftView do
  use BurdaWeb, :view

  @doc ~S"""
    Send the top menu to be rendered by the layout view
  """

  def top_menu(%{go_back_url: url}),
    do: render("menu.html", go_back_url: url)
end
