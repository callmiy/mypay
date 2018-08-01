defmodule Burda.Factory.Meta do
  alias Burda.Factory.Utils
  alias Burda.Meta.Api
  alias Burda.Meta

  @non_required_keys Meta.non_required_keys()

  def insert(attrs \\ %{})

  def insert(attrs) when is_list(attrs),
    do:
      attrs
      |> Map.new()
      |> insert()

  def insert(attrs) do
    {:ok, meta} =
      attrs
      |> params()
      |> Api.create_()

    meta
  end

  def params(attrs \\ %{})

  def params(attrs) when is_list(attrs),
    do:
      attrs
      |> Map.new()
      |> params()

  def params(attrs),
    do:
      [
        :break_time_secs,
        :pay_per_hr,
        :night_suppl_pay_pct,
        :sunday_suppl_pay_pct
      ]
      |> Enum.reduce(%{}, fn k, acc ->
        v = Map.get(attrs, k)

        case Map.has_key?(attrs, k) do
          true ->
            Map.put(acc, k, v)

          _ ->
            case {k, apply(__MODULE__, k, [])} do
              {field, nil} when field in @non_required_keys -> acc
              {_, v} -> Map.put(acc, k, v)
            end
        end
      end)

  def break_time_secs(), do: Enum.random([nil, Enum.random(100..5000)])

  def pay_per_hr(), do: Utils.random_float_decimal_between(1.0, 15.9, 2)

  def night_suppl_pay_pct(), do: Utils.random_float_decimal_between(1.0, 25, 2)

  def sunday_suppl_pay_pct(), do: Utils.random_float_decimal_between(25, 65, 2)
end
