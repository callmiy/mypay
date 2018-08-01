defmodule Burda.Shift.Wages do
  @moduledoc ~S"""
    The various wages earned by a shift worker are computed
  """

  @type t :: %{
          normal_pay: Decimal.t(),
          night_suppl_pay: Decimal.t(),
          sunday_suppl_pay: Decimal.t(),
          total_pay: Decimal.t()
        }

  @scale 2

  @spec wages(shift_times :: Map.t(), pay_info :: Map.t()) :: t
  def wages(%{} = times, %{} = pay_info) do
    normal_pay =
      times.normal_hours
      |> to_string()
      |> Decimal.mult(pay_info.pay_per_hr)
      |> Decimal.round(@scale)

    night_suppl_pay =
      times.night_hours
      |> to_string()
      |> Decimal.mult(pay_info.pay_per_hr)
      |> Decimal.mult(
        pay_info.night_suppl_pay_pct
        |> Decimal.div("100")
      )
      |> Decimal.round(@scale)

    sunday_suppl_pay =
      times.sunday_hours
      |> to_string()
      |> Decimal.mult(pay_info.pay_per_hr)
      |> Decimal.mult(
        pay_info.sunday_suppl_pay_pct
        |> Decimal.div("100")
      )
      |> Decimal.round(@scale)

    %{
      normal_pay: normal_pay,
      night_suppl_pay: night_suppl_pay,
      sunday_suppl_pay: sunday_suppl_pay,
      total_pay:
        normal_pay
        |> Decimal.add(night_suppl_pay)
        |> Decimal.add(sunday_suppl_pay)
        |> Decimal.round(@scale)
    }
  end
end
