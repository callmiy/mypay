defmodule BurdaWeb.Schema.Shift do
  @moduledoc ~S"""
    Absinthe schema for Shift
  """
  use Absinthe.Schema.Notation

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  alias BurdaWeb.Resolver.Shift, as: Resolver

  @desc "A shift"
  object :shift do
    field(:id, non_null(:id))
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

    field(:meta, :meta, resolve: dataloader(Burda.Meta.Api))
  end

  @desc "Inputs for creating shift"
  input_object :create_shift_input do
    field(:meta_id, non_null(:id))
    field(:date, non_null(:date))
    field(:start_time, non_null(:time))
    field(:end_time, non_null(:time))
  end

  # QUERIES
  @desc "Queries allowed on Shift object"
  object :shift_query do
    @desc "Get all shifts"
    field :shifts, type: list_of(:shift) do
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
  end
end
