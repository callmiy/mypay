defmodule MyPay.QueryHelper do
  @extract_month_from_date_eq "extract(month from date) = ?"
  @extract_month_from_date_gt "extract(month from date) > ?"
  @extract_month_from_date_lt "extract(month from date) < ?"
  @extract_month_from_date_lteq "extract(month from date) <= ?"
  @extract_year_from_date_eq "extract(year from date) = ?"

  import Ecto.Query, warn: false

  @doc false
  def filter(query, %{} = filter),
    do: Enum.reduce(filter, query, &filter(&2, &1))

  def filter(query, {:limit, limit}), do: limit(query, [], ^limit)

  def filter(query, {:order_by, order_bys}),
    do:
      Enum.reduce(order_bys, query, fn {field, directive}, acc ->
        filter(acc, {:order_by, field, directive})
      end)

  def filter(query, {:where, conditions}),
    do:
      Enum.reduce(conditions, query, fn {field, condition}, acc ->
        filter(acc, {:where, field, condition})
      end)

  def filter(query, {:order_by, :date, directive}),
    do: order_by(query, [s], {^directive, s.date})

  def filter(query, {:order_by, :id, directive}),
    do: order_by(query, [s], {^directive, s.id})

  def filter(query, {:where, :month, %{} = month}),
    do: Enum.reduce(month, query, &filter(&2, {:where, :month, &1}))

  def filter(query, {:where, :month, {:gt, month}}),
    do: where(query, [s], fragment(@extract_month_from_date_gt, ^month))

  def filter(query, {:where, :month, {:lt, month}}),
    do: where(query, [s], fragment(@extract_month_from_date_lt, ^month))

  def filter(query, {:where, :month, {:lteq, month}}),
    do: where(query, [s], fragment(@extract_month_from_date_lteq, ^month))

  def filter(query, {:where, :month, {:eq, month}}),
    do: where(query, [s], fragment(@extract_month_from_date_eq, ^month))

  def filter(query, {:where, :year, year}),
    do: where(query, [s], fragment(@extract_year_from_date_eq, ^year))

  def filter(query, _), do: query
end
