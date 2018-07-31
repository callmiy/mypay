defmodule Burda.Shift do
  use Ecto.Schema
  import Ecto.Changeset

  alias Burda.Meta

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
    field(:normal_pay, :float)
    field(:night_suppl_pay, :float)
    field(:sunday_suppl_pay, :float)
    field(:total_pay, :float)

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
      :total_pay
    ])
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
      :total_pay
    ])
    |> unique_constraint(:date, name: :shifts_date_start_time_index)
  end
end
