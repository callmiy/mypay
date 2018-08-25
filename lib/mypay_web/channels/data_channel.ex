defmodule MyPayWeb.DataChannel do
  use MyPayWeb, :channel

  @dialyzer {:no_return, handle_in: 3, handle_info: 2}

  alias MyPayWeb.Schema
  alias MyPay.OfflineSync

  @doc false
  def join("data:data", %{"payload" => payload}, socket) do
    send(self(), {:offline_sync, payload})
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

  def handle_info({:offline_sync, payload}, socket) do
    push(
      socket,
      "data-synced",
      %{
        synced: Enum.map(payload, &process_payload/1)
      }
    )

    {:noreply, socket}
  end

  defp process_payload(%{"query" => q, "variables" => v} = data) do
    offline_attrs = data["offline_attrs"]

    case get_offline_object(offline_attrs) do
      nil ->
        case Schema.run_query(q, v) do
          {:ok, %{errors: errors}} ->
            %{errors: errors}

          {:ok, %{data: data}} ->
            OfflineSync.create_(offline_attrs)
            %{data: data}
        end

      _ ->
        %{all_ready_synced: true}
    end
    |> Map.merge(%{
      offline_fields: offline_attrs
    })
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
