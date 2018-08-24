defmodule MyPay.Factory do
  @ten 10

  def random_float_between(lower, upper, scale \\ 0)
      when lower < upper and is_integer(scale) do
    low_exponent = to_exponent_ten(lower)
    upper_exponent = to_exponent_ten(upper)
    random_float_between(lower, upper, low_exponent..upper_exponent, scale)
  end

  def random_float_between(lower, upper, exponent_range, scale) do
    case :rand.uniform()
         |> Kernel.*(Enum.random(exponent_range))
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

  def next_sunday_date(%Date{} = date) do
    case Date.day_of_week(date) do
      7 -> date
      x -> Date.add(date, 7 - x)
    end
  end

  defp to_exponent_ten(num) when is_float(num),
    do:
      num
      |> trunc()
      |> to_exponent_ten()

  defp to_exponent_ten(num) when is_integer(num) do
    len =
      num
      |> to_string()
      |> String.length()

    @ten
    |> :math.pow(len)
    |> trunc()
  end
end
