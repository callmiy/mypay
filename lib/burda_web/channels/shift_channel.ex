defmodule BurdaWeb.ShiftChannel do
  use BurdaWeb, :channel

  @dialyzer {:no_return, handle_in: 3}

  alias BurdaWeb.UserSocket

  @doc false
  def join("shift:shift", _message, socket), do: {:ok, socket}

  @doc false
  def handle_in("create", params, socket),
    do: {
      :reply,
      UserSocket.run_query(params),
      socket
    }
end
