defmodule BurdaWeb.Schema.Adhoc do
  @moduledoc ~S"""
    Absinthe schema for objects that do not map to any Ecto Schema
  """
  use Absinthe.Schema.Notation

  alias BurdaWeb.Endpoint

  @offline_token_id :burda
                    |> Application.get_env(:frontend)
                    |> Keyword.fetch!(:token_id)

  @offline_token_value :burda
                       |> Application.get_env(:frontend)
                       |> Keyword.fetch!(:token_value)

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

  @desc "Offline Token"
  object :offline_token do
    field :id, non_null(:id) do
      resolve(fn _, _, _ -> {:ok, @offline_token_id} end)
    end

    field :_id, non_null(:string) do
      resolve(fn _, _, _ -> {:ok, DateTime.to_iso8601(DateTime.utc_now())} end)
    end

    field(
      :value,
      non_null(:string),
      do: resolve(fn _, _, _ -> {:ok, @offline_token_value} end)
    )

    field :schema_type, non_null(:string) do
      resolve(fn _, _, _ -> {:ok, "OfflineToken"} end)
    end
  end

  # QUERIES
  @desc "Queries allowed on adhoc object"
  object :adhoc_query do
    @desc "Get New shift URL"
    field(:new_shift_url, type: :new_shift_url, resolve: &get_empty/3)

    @desc "Get Offline Token"
    field(:offline_token, type: :offline_token, resolve: &get_empty/3)
  end

  defp get_empty(_, _, _), do: {:ok, %{}}
end
