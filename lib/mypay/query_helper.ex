defmodule MyPay.QueryHelper do
  import Ecto.Query

  @doc false
  def filter(query, %{} = filter),
    do: Enum.reduce(filter, query, &filter(&2, &1))

  def filter(query, {:limit, limit}), do: limit(query, [], ^limit)

  def filter(query, {:order_by, order_bys}),
    do:
      Enum.reduce(order_bys, query, fn {field, directive}, acc ->
        filter(acc, {:order_by, field, directive})
      end)

  def filter(query, {:where, :date, %{key: :eq, value: v}}),
    do: where(query, [s], s.date == ^v)

  def filter(query, {:where, :date, %{key: :lt, value: v}}),
    do: where(query, [s], s.date < ^v)

  def filter(query, {:where, :date, %{key: :lte, value: v}}),
    do: where(query, [s], s.date <= ^v)

  def filter(query, {:where, :date, %{key: :gt, value: v}}),
    do: where(query, [s], s.date > ^v)

  def filter(query, {:where, :date, %{key: :gte, value: v}}),
    do: where(query, [s], s.date >= ^v)

  def filter(query, {:where, fields_or_directives}),
    do:
      fields_or_directives
      |> Enum.reduce(query, fn {field_or_directive, conditions}, acc ->
        filter(acc, {:where, field_or_directive, conditions})
      end)

  def filter(query, {:where, :and, conditions}),
    do:
      Enum.reduce(conditions, query, fn field_directive, acc ->
        [{field, directive}] = Map.to_list(field_directive)
        filter(acc, {:where, field, directive})
      end)

  def filter(query, {:order_by, :date, directive}),
    do: order_by(query, [s], {^directive, s.date})

  def filter(query, {:order_by, :id, directive}),
    do: order_by(query, [s], {^directive, s.id})

  def filter(query, _), do: query
end
