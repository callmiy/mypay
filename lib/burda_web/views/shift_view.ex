defmodule MyPayWeb.ShiftView do
  use MyPayWeb, :view

  @doc ~S"""
    Send the top menu to be rendered by the layout view
  """

  def top_menu(assigns),
    do: render("menu.html", go_back_url: assigns[:go_back_url])
end
