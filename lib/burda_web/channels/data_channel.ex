defmodule BurdaWeb.DataChannel do
  use BurdaWeb, :channel

  @dialyzer {:no_return, handle_in: 3}

  @doc false
  def join("data:data", _message, socket), do: {:ok, socket}

  @doc false
  def handle_in("graphql", params, socket) do
    response =
      case BurdaWeb.Schema.run_query(params) do
        {:ok, %{errors: errors}} ->
          {:error, %{errors: errors}}

        {:ok, %{data: data}} ->
          {:ok, data}
      end

    {:reply, response, socket}
  end
end
