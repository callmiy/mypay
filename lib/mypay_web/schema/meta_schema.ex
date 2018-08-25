defmodule MyPayWeb.Schema.Meta do
  @moduledoc ~S"""
    Absinthe schema for Meta
  """
  use Absinthe.Schema.Notation

  alias MyPayWeb.Resolver.Meta, as: Resolver
  alias MyPayWeb.Schema

  @desc "A Meta"
  object :meta do
    field(:id, non_null(:id))

    field :_id, non_null(:string) do
      resolve(fn meta, _, _ -> {:ok, Schema.get_datetime_id(meta.id)} end)
    end

    field(:break_time_secs, non_null(:integer))
    field(:pay_per_hr, non_null(:decimal))
    field(:night_suppl_pay_pct, non_null(:decimal))
    field(:sunday_suppl_pay_pct, non_null(:decimal))

    field(:inserted_at, non_null(:iso_datetime))
    field(:updated_at, non_null(:iso_datetime))

    field :schema_type, non_null(:string) do
      resolve(fn _, _, _ -> {:ok, "Meta"} end)
    end
  end

  @desc "Inputs for creating a meta"
  input_object :create_meta_input do
    field(:break_time_secs, :integer)
    field(:pay_per_hr, non_null(:decimal))
    field(:night_suppl_pay_pct, non_null(:decimal))
    field(:sunday_suppl_pay_pct, non_null(:decimal))
  end

  @desc "input for sorting"
  input_object :sort_meta do
    field(:id, :sorting_directive)
  end

  @desc "Inputs for getting meta"
  input_object :get_meta_input do
    field(:order_by, :sort_meta)
  end

  # MUTATION
  @desc "Mutations allowed on Meta object"
  object :meta_mutation do
    @desc "Create a meta"
    field :meta, type: :meta do
      arg(:meta, non_null(:create_meta_input))

      resolve(&Resolver.create/3)
    end
  end

  # QUERIES
  @desc "Queries allowed on Meta object"
  object :meta_query do
    @desc "Get all metas optionally filtered"
    field :metas, type: list_of(:meta) do
      arg(:meta, :get_meta_input)
      resolve(&Resolver.metas/3)
    end
  end
end
