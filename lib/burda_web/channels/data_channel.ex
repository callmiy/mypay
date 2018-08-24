defmodule MyPayWeb.DataChannel do
  use MyPayWeb, :channel

  @dialyzer {:no_return, handle_in: 3, handle_info: 2}

  alias MyPayWeb.Schema
  alias MyPay.OfflineSync

  @offline_fields ["rev", "offline_id"]

  @doc false
  def join("data:data", %{"query" => query} = params, socket) when is_binary(query) do
    send(self(), {:offline_sync, params})
    {:ok, socket}
  end

  def join("data:data", _params, socket), do: {:ok, socket}

  def join("data:client:" <> _client, _params, socket) do
    {:ok, socket}
  end

  @doc false
  def handle_in("graphql", params, socket) do
    response =
      case Schema.run_query(params) do
        {:ok, %{errors: errors}} ->
          {:error, %{errors: errors}}

        {:ok, %{data: data}} ->
          {:ok, data}
      end

    {:reply, response, socket}
  end

  def handle_info({:offline_sync, params}, socket) do
    query = params["query"]
    variables = params["variables"] || %{}

    case Map.get(variables, "shift") do
      nil ->
        :ok

      shift ->
        offline_attrs = Map.take(shift, @offline_fields)

        response =
          case get_offline_object(offline_attrs) do
            nil ->
              case Schema.run_query(
                     query,
                     %{"shift" => Map.drop(shift, @offline_fields)}
                   ) do
                {:ok, %{errors: errors}} ->
                  %{errors: errors, offline_fields: offline_attrs}

                {:ok, %{data: data}} ->
                  OfflineSync.create_(offline_attrs)
                  %{data: data, offline_fields: offline_attrs}
              end

            _ ->
              %{
                all_ready_synced: true,
                offline_fields: offline_attrs
              }
          end

        broadcast(socket, "data-synced", response)
    end

    {:noreply, socket}
  end

  defp get_offline_object(fields),
    do:
      fields
      |> Enum.map(fn
        {k, v} when is_binary(k) -> {String.to_existing_atom(k), v}
        entry -> entry
      end)
      |> OfflineSync.get_by()
end
