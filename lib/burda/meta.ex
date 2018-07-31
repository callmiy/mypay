defmodule Burda.Meta do
  use Ecto.Schema
  import Ecto.Changeset

  @timestamps_opts [
    type: Timex.Ecto.DateTime,
    autogenerate: {Timex.Ecto.DateTime, :autogenerate, []}
  ]

  @all_fields_uniqueness_error "Fields 'break_time_secs', 'night_suppl_pay_pct', 'sunday_suppl_pay_pct', 'pay_per_hr' already exist."

  schema "metas" do
    field(:break_time_secs, :integer)
    field(:pay_per_hr, :decimal)
    field(:night_suppl_pay_pct, :decimal)
    field(:sunday_suppl_pay_pct, :decimal)

    timestamps()
  end

  @doc false
  def changeset(meta, attrs \\ %{})

  def changeset(meta, attrs) do
    meta
    |> cast(attrs, [
      :break_time_secs,
      :night_suppl_pay_pct,
      :sunday_suppl_pay_pct,
      :pay_per_hr
    ])
    |> validate_required([
      :night_suppl_pay_pct,
      :sunday_suppl_pay_pct,
      :pay_per_hr
    ])
    |> unique_constraint(
      :break_time_secs,
      name: :all_fields_unique_index,
      message: @all_fields_uniqueness_error
    )
  end

  def all_fields_uniqueness_error, do: @all_fields_uniqueness_error
end
