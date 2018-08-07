defmodule BurdaWeb.MetaController do
  use Phoenix.Controller

  alias BurdaWeb.Meta

  @spec new(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def new(conn, _params), do: json(conn, Meta.new_form(conn))
end
