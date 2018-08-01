defmodule Burda.Shift.WagesTest do
  use ExUnit.Case, async: true
  import Burda.Factory

  alias Burda.Shift.Wages
  alias Burda.Factory.Shift, as: ShiftFactory
  alias Burda.Shift.Times
  alias Burda.Meta

  test "wages/2" do
    meta =
      Meta
      |> struct(
        params_for(
          :meta,
          pay_per_hr: Decimal.new("9.49"),
          night_suppl_pay_pct: Decimal.new("25.00"),
          sunday_suppl_pay_pct: Decimal.new("50.00")
        )
      )

    shift = ShiftFactory.params()

    times = Times.times(shift.date, shift.start_time, shift.end_time, 1_800)

    wages =
      Wages.wages(times, meta)
      |> Enum.map(fn {k, v} -> {k, Decimal.to_float(v)} end)
      |> Enum.into(%{})

    normal_pay =
      times.normal_hours
      |> Kernel.*(9.49)
      |> Float.round(2)

    night_suppl_pay =
      times.night_hours
      |> Kernel.*(9.49 * 0.25)
      |> Float.round(2)

    sunday_suppl_pay =
      times.sunday_hours
      |> Kernel.*(9.49 * 0.5)
      |> Float.round(2)

    assert normal_pay == wages.normal_pay
    assert night_suppl_pay == wages.night_suppl_pay
    assert sunday_suppl_pay == wages.sunday_suppl_pay
    assert wages.total_pay == normal_pay + night_suppl_pay + sunday_suppl_pay
  end
end
