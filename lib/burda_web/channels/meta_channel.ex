defmodule BurdaWeb.MetaChannel do
  use BurdaWeb, :channel

  alias BurdaWeb.Meta
  alias BurdaWeb.Endpoint

  @doc false
  def join("meta:meta", _message, socket), do: {:ok, socket}

  @doc false
  def handle_in("new-form", _params, socket) do
    {:reply, {:ok, Meta.new_form(Endpoint)}, socket}
  end
end
