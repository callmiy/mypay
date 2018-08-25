defmodule MyPay.Shift do
  use Ecto.Schema
  import Ecto.Changeset

  alias MyPay.Meta

  @timestamps_opts [
    type: Timex.Ecto.DateTime,
    autogenerate: {Timex.Ecto.DateTime, :autogenerate, []}
  ]

  schema "shifts" do
    field(:date, :date)
    field(:start_time, :time)
    field(:end_time, :time)
    field(:hours_gross, :float)
    field(:normal_hours, :float)
    field(:night_hours, :float)
    field(:sunday_hours, :float)
    field(:normal_pay, :decimal)
    field(:night_suppl_pay, :decimal)
    field(:sunday_suppl_pay, :decimal)
    field(:total_pay, :decimal)

    belongs_to(:meta, Meta)

    timestamps()
  end

  @doc false
  def changeset(shift, attrs) do
    shift
    |> cast(attrs, [
      :date,
      :start_time,
      :end_time,
      :hours_gross,
      :normal_hours,
      :night_hours,
      :sunday_hours,
      :normal_pay,
      :night_suppl_pay,
      :sunday_suppl_pay,
      :total_pay,
      :meta_id
    ])
    |> assoc_constraint(:meta)
    |> validate_required([
      :date,
      :start_time,
      :end_time,
      :hours_gross,
      :normal_hours,
      :night_hours,
      :sunday_hours,
      :normal_pay,
      :night_suppl_pay,
      :sunday_suppl_pay,
      :total_pay,
      :meta_id
    ])
    |> unique_constraint(:date, name: :shifts_date_start_time_index)
  end
end
