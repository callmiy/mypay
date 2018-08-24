defmodule MyPay.Repo.Migrations.CreateMetas do
  use Ecto.Migration

  def change do
    create table(:metas) do
      add(
        :break_time_secs,
        :integer,
        null: false,
        # 30 minutes
        default: fragment("#{30 * 60}"),
        comment: "Number of seconds of breaks allowed."
      )

      add(
        :pay_per_hr,
        :decimal,
        precision: 7,
        scale: 2,
        null: false,
        comment: "Earning per hour."
      )

      add(
        :night_suppl_pay_pct,
        :decimal,
        precision: 4,
        scale: 2,
        null: false,
        comment: "Percentage of earning per hour paid for night shift."
      )

      add(
        :sunday_suppl_pay_pct,
        :decimal,
        precision: 4,
        scale: 2,
        null: false,
        comment: "Percentage of earning per hour paid for morning and afternoon Shifts on Sunday."
      )

      timestamps()
    end

    :metas
    |> unique_index(
      [
        :break_time_secs,
        :night_suppl_pay_pct,
        :sunday_suppl_pay_pct,
        :pay_per_hr
      ],
      name: :all_fields_unique_index
    )
    |> create()
  end
end
