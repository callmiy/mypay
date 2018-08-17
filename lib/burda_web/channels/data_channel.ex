defmodule BurdaWeb.DataChannel do
  use BurdaWeb, :channel

  @dialyzer {:no_return, handle_in: 3}

  alias BurdaWeb.UserSocket

  @doc false
  def join("data:data", _message, socket), do: {:ok, socket}

  @doc false
  def handle_in("all-shifts", params, socket),
    do: {
      :reply,
      UserSocket.run_query(params),
      socket
    }
end
