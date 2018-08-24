defmodule MyPay.Repo.Migrations.CreateShifts do
  use Ecto.Migration

  def change do
    create table(:shifts) do
      add(:date, :date, null: false, comment: "Date of shift.")
      add(:start_time, :time, null: false, comment: "Time shift started.")
      add(:end_time, :time, null: false, comment: "Time shift ended.")

      add(
        :hours_gross,
        :float,
        null: false,
        comment: "Total hours worked, including breaks."
      )

      add(
        :normal_hours,
        :float,
        null: false,
        comment: "Total hours worked, net of breaks."
      )

      add(
        :night_hours,
        :float,
        null: false,
        comment: "Hours worked during the night, net of breaks."
      )

      add(
        :sunday_hours,
        :float,
        null: false,
        comment: "Hours worked during sunday shift."
      )

      add(
        :normal_pay,
        :decimal,
        precision: 9,
        scale: 2,
        null: false,
        comment: "Earning for normal hours worked."
      )

      add(
        :night_suppl_pay,
        :decimal,
        precision: 9,
        scale: 2,
        null: false,
        comment: "Supplemental earning for night shift."
      )

      add(
        :sunday_suppl_pay,
        :decimal,
        precision: 9,
        scale: 2,
        null: false,
        comment: "Supplemental earning for sunday ShiftApi."
      )

      add(
        :total_pay,
        :decimal,
        precision: 9,
        scale: 2,
        null: false,
        comment: "Sum of normal, night shift supplemental and sunday shifts earnings."
      )

      add(
        :meta_id,
        references(:metas, on_delete: :delete_all),
        null: false
      )

      timestamps()
    end

    :shifts
    |> unique_index([:date, :start_time])
    |> create()

    :shifts
    |> index([:meta_id])
    |> create()
  end
end
