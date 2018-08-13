defmodule BurdaWeb.MetaChannel do
  use BurdaWeb, :channel

  alias BurdaWeb.UserSocket
  alias BurdaWeb.MetaWeb
  alias BurdaWeb.Endpoint

  @doc false
  def join("meta:meta", _message, socket), do: {:ok, socket}

  @doc false
  def handle_in("new-form", _params, socket) do
    {:reply, {:ok, MetaWeb.new_form(Endpoint)}, socket}
  end

  @doc false
  def handle_in("create", params, socket),
    do: {
      :reply,
      UserSocket.run_query(params),
      socket
    }
end
