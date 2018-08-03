defmodule BurdaWeb.IndexController do
  use Phoenix.Controller

  @page_js "routes/index.js"

  plug(:put_js_path)

  def index(conn, _), do: render(conn, "index.html")

  def put_js_path(conn, _), do: assign(conn, :page_js, @page_js)
end
