defmodule BurdaWeb.MetaChannel do
  use BurdaWeb, :channel

  @dialyzer {:no_return, run_query: 1}

  alias BurdaWeb.MetaWeb
  alias BurdaWeb.Endpoint
  alias Absinthe
  alias BurdaWeb.Schema

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
      run_query(params),
      socket
    }

  defp run_query(%{"query" => query} = params) do
    case Absinthe.run(query, Schema, variables: params["variables"] || %{}) do
      {:ok, %{errors: errors}} ->
        {:error, %{errors: errors}}

      {:ok, %{data: data}} ->
        {:ok, data}
    end
  end
end
