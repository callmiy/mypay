defmodule Burda.Factory.Utils do
  def random_float_between(lower, upper, scale \\ 0)
      when lower < upper and is_integer(scale) do
    case :rand.uniform()
         |> Kernel.*(10)
         |> Float.round(scale) do
      z when z <= upper and z >= lower -> z
      _ -> random_float_between(lower, upper, scale)
    end
  end

  def random_float_decimal_between(lower, upper, scale \\ 0)
      when lower < upper and is_integer(scale),
      do:
        lower
        |> random_float_between(upper, scale)
        |> Decimal.from_float()
        |> Decimal.round(scale)
end
