defmodule BurdaWeb.Schema.ShiftTest do
  use Burda.DataCase

  alias BurdaWeb.Schema
  alias BurdaWeb.Query.Shift, as: Query
  alias Burda.Factory.Shift, as: Factory

  @iso_time "{ISOtime}"
  @iso_date "{ISOdate}"

  test "Get all shift" do
    shift = Factory.insert()
    id = Integer.to_string(shift.id)
    date = Timex.format!(shift.date, @iso_date)
    start_time = Timex.format!(shift.start_time, @iso_time)
    end_time = Timex.format!(shift.end_time, @iso_time)
    hours_gross = shift.hours_gross
    normal_hours = shift.normal_hours
    night_hours = shift.night_hours
    sunday_hours = shift.sunday_hours
    normal_pay = Decimal.to_string(shift.normal_pay)
    night_suppl_pay = Decimal.to_string(shift.night_suppl_pay)
    sunday_suppl_pay = Decimal.to_string(shift.sunday_suppl_pay)
    total_pay = Decimal.to_string(shift.total_pay)

    assert {:ok,
            %{
              data: %{
                "shifts" => [
                  %{
                    "id" => ^id,
                    "date" => ^date,
                    "startTime" => ^start_time,
                    "endTime" => ^end_time,
                    "hoursGross" => ^hours_gross,
                    "normalHours" => ^normal_hours,
                    "nightHours" => ^night_hours,
                    "sundayHours" => ^sunday_hours,
                    "normalPay" => ^normal_pay,
                    "nightSupplPay" => ^night_suppl_pay,
                    "sundaySupplPay" => ^sunday_suppl_pay,
                    "totalPay" => ^total_pay
                  }
                ]
              }
            }} = Absinthe.run(Query.query_all(), Schema)
  end
end
