defmodule MyPay.Shift.Wages do
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

  @pay_keys [:normal_pay, :night_suppl_pay, :sunday_suppl_pay]
  @hours_keys [:normal_hours, :night_hours, :sunday_hours]
  @supplemental_pay_percent_key [
    nil,
    :night_suppl_pay_pct,
    :sunday_suppl_pay_pct
  ]

  @pay_key_hrs_suppl for {p, index} <- Enum.with_index(@pay_keys),
                         do: {
                           p,
                           Enum.at(@hours_keys, index),
                           Enum.at(@supplemental_pay_percent_key, index)
                         }

  @spec wages(shift_times :: Map.t(), pay_info :: Map.t()) :: t
  def wages(%{} = times, %{} = pay_info) do
    pays =
      @pay_key_hrs_suppl
      |> Enum.map(fn {k, hrs, suppl} ->
        {k, pay(times, pay_info, hrs, suppl)}
      end)
      |> Enum.into(%{})

    pays
    |> total_pay()
    |> Map.merge(pays)
  end

  @doc false
  def pay(%{} = times, %{} = pay_info, hrs_key, suppl_pay_key),
    do:
      times[hrs_key]
      |> to_string()
      |> Decimal.mult(pay_info.pay_per_hr)
      |> Decimal.mult(
        pay_info
        |> Map.get(suppl_pay_key)
        |> Kernel.||(100)
        |> Decimal.div("100")
      )
      |> Decimal.round(@scale)

  @doc false
  def total_pay(%{} = pays),
    do: %{
      total_pay:
        pays.normal_pay
        |> Decimal.add(pays.night_suppl_pay)
        |> Decimal.add(pays.sunday_suppl_pay)
        |> Decimal.round(@scale)
    }
end
