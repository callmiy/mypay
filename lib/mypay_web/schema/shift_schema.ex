defmodule MyPayWeb.Schema.Shift do
  @moduledoc ~S"""
    Absinthe schema for Shift
  """
  use Absinthe.Schema.Notation

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  alias MyPayWeb.Resolver.Shift, as: Resolver
  alias MyPayWeb.Schema

  @desc "A shift"
  object :shift do
    field(:id, non_null(:id))

    field :_id, non_null(:string) do
      resolve(fn shift, _, _ -> {:ok, Schema.get_datetime_id(shift.id)} end)
    end

    field(:date, non_null(:date))
    field(:start_time, non_null(:time))
    field(:end_time, non_null(:time))
    field(:hours_gross, non_null(:float))
    field(:normal_hours, non_null(:float))
    field(:night_hours, non_null(:float))
    field(:sunday_hours, non_null(:float))
    field(:normal_pay, non_null(:decimal))
    field(:night_suppl_pay, non_null(:decimal))
    field(:sunday_suppl_pay, non_null(:decimal))
    field(:total_pay, non_null(:decimal))

    field(:inserted_at, non_null(:iso_datetime))
    field(:updated_at, non_null(:iso_datetime))

    field(:meta, :meta, resolve: dataloader(MyPay.Meta.Api))

    field :schema_type, non_null(:string) do
      resolve(fn _, _, _ -> {:ok, "Shift"} end)
    end
  end

  @desc "Inputs for creating shift"
  input_object :create_shift_input do
    field(:meta_id, :id)
    field(:date, non_null(:date))
    field(:start_time, non_null(:time))
    field(:end_time, non_null(:time))
    field(:meta, :create_meta_input)
  end

  @desc "input for sorting"
  input_object :sorting do
    field(:id, :sorting_directive)
    field(:date, :sorting_directive)
  end

  @desc "Where condition for retrieving a shift"
  input_object :where_condition do
    field(:year, :integer)
    field(:month, :integer)
  end

  @desc "Inputs for getting shift"
  input_object :get_shift_input do
    field(:where, :where_condition)
    field(:order_by, :sorting)
  end

  @desc "Inputs for updating shift"
  input_object :update_shift_input do
    field(:id, non_null(:id))
    field(:sunday_hours, non_null(:float))
  end

  # QUERIES
  @desc "Queries allowed on Shift object"
  object :shift_query do
    @desc "Get all shifts"
    field :shifts, type: list_of(:shift) do
      arg(:shift, :get_shift_input)
      resolve(&Resolver.shifts/3)
    end
  end

  # MUTATIONS
  @desc "Mutations allowed on Shift object"
  object :shift_mutation do
    @desc "Create a shift"
    field :shift, type: :shift do
      arg(:shift, non_null(:create_shift_input))

      resolve(&Resolver.create/3)
    end

    @desc "Update a shift"
    field :update, type: :shift do
      arg(:shift, non_null(:update_shift_input))

      resolve(&Resolver.create/3)
    end
  end
end
