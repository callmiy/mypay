defmodule MyPayWeb.Schema.OfflineSync do
  @moduledoc ~S"""
    Absinthe schema for OfflineSync
  """
  use Absinthe.Schema.Notation

  alias MyPay.OfflineSync
  alias MyPayWeb.Resolver

  @desc "An Offline Sync Object"
  object :offline_sync do
    field(:id, non_null(:id))
    field(:offline_id, non_null(:id))
    field(:rev, non_null(:string))

    field(:inserted_at, non_null(:iso_datetime))
    field(:updated_at, non_null(:iso_datetime))
  end

  @desc "Inputs for creating an offline sync object"
  input_object :create_offline_sync_input do
    field(:offline_id, non_null(:string))
    field(:rev, non_null(:string))
  end

  # MUTATIONS
  @desc "Mutations allowed on Offline Sync object"
  object :offline_sync_mutation do
    @desc "Create an offline sync object"
    field :offline_sync, type: :offline_sync do
      arg(:offline_sync, non_null(:create_offline_sync_input))

      resolve(fn _, %{offline_sync: params}, _ ->
        case OfflineSync.create_(params) do
          {:ok, %OfflineSync{} = data} ->
            {:ok, data}

          {:error, changeset} ->
            {:error, Resolver.changeset_errors_to_string(changeset)}
        end
      end)
    end
  end
end
