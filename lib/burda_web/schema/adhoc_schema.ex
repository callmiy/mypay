defmodule BurdaWeb.Schema.Adhoc do
  @moduledoc ~S"""
    Absinthe schema for objects that do not map to any Ecto Schema
  """
  use Absinthe.Schema.Notation

  alias BurdaWeb.Endpoint

  @desc "New shift URL"
  object :new_shift_url do
    field :_id, non_null(:id) do
      resolve(fn _, _, _ -> {:ok, DateTime.to_iso8601(DateTime.utc_now())} end)
    end

    field :schema_type, non_null(:string) do
      resolve(fn _, _, _ -> {:ok, "NewShiftUrl"} end)
    end

    field :url, non_null(:string) do
      resolve(fn _, _, _ ->
        {
          :ok,
          BurdaWeb.Router.Helpers.shift_path(Endpoint, :new)
        }
      end)
    end
  end

  # QUERIES
  @desc "Queries allowed on adhoc object"
  object :adhoc_query do
    @desc "Get New shift URL"
    field(
      :new_shift_url,
      type: :new_shift_url,
      resolve: fn _, _, _ -> {:ok, %{}} end
    )
  end
end
