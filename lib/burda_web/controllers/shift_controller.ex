defmodule BurdaWeb.ShiftController do
  use Phoenix.Controller

  def index(conn, _), do: render(conn, "index.html")
end
