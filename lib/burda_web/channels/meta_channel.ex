defmodule BurdaWeb.MetaChannel do
  use BurdaWeb, :channel

  alias BurdaWeb.MetaWeb
  alias BurdaWeb.Endpoint
  alias Burda.Meta.Api
  alias Burda.MapHelpers

  @doc false
  def join("meta:meta", _message, socket), do: {:ok, socket}

  @doc false
  def handle_in("new-form", _params, socket) do
    {:reply, {:ok, MetaWeb.new_form(Endpoint)}, socket}
  end

  @doc false
  def handle_in("create", params, socket) do
    with {:ok, meta} <-
           params
           |> MapHelpers.atomize_keys()
           |> Api.create_() do
      meta = Map.from_struct(meta) |> Map.drop([:__meta__])
      IO.inspect(meta, label: "
            -----------meta------------
            ")
      {:reply, {:ok, meta}, socket}
    else
      error ->
        IO.inspect(error, label: "
        -----------error------------
        ")
        {:reply, {:error, error}, socket}
    end
  end
end
