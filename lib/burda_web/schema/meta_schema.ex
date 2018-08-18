defmodule BurdaWeb.Schema.Meta do
  @moduledoc ~S"""
    Absinthe schema for Meta
  """
  use Absinthe.Schema.Notation

  alias BurdaWeb.Resolver.Meta, as: Resolver

  @desc "A Meta"
  object :meta do
    field(:id, non_null(:id))

    field :_id, non_null(:id) do
      resolve(fn _, _, _ -> {:ok, DateTime.to_iso8601(DateTime.utc_now())} end)
    end

    field(:break_time_secs, non_null(:integer))
    field(:pay_per_hr, non_null(:decimal))
    field(:night_suppl_pay_pct, non_null(:decimal))
    field(:sunday_suppl_pay_pct, non_null(:decimal))

    field(:inserted_at, non_null(:iso_datetime))
    field(:updated_at, non_null(:iso_datetime))
  end

  object :new_meta_form do
    field :html, non_null(:string) do
      resolve(fn _, _, _ ->
        {
          :ok,
          Phoenix.View.render_to_string(BurdaWeb.MetaView, "new-meta.html", [])
        }
      end)
    end
  end

  @desc "Inputs for creating a meta"
  input_object :create_meta_input do
    field(:break_time_secs, :integer)
    field(:pay_per_hr, non_null(:decimal))
    field(:night_suppl_pay_pct, non_null(:decimal))
    field(:sunday_suppl_pay_pct, non_null(:decimal))
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
    @desc "Get the form for creating a meta"
    field(:new_meta_form, type: :new_meta_form, resolve: &empty/3)
  end

  defp empty(_, _, _), do: {:ok, %{}}
end
