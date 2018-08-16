defmodule BurdaWeb.Schema.MetaTest do
  use Burda.DataCase

  alias BurdaWeb.Schema
  alias BurdaWeb.Query.Meta, as: Query
  alias Burda.Factory.Meta, as: Factory

  @date_time_pattern ~r/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z/

  test "create succeeds" do
    params =
      Factory.params()
      |> stringify()

    assert {:ok,
            %{
              data: %{
                "meta" => %{
                  "id" => _,
                  "_id" => id_,
                  "breakTimeSecs" => _
                }
              }
            }} =
             Absinthe.run(
               Query.create(),
               Schema,
               variables: %{
                 "meta" => params
               }
             )

    assert Regex.match?(@date_time_pattern, id_)
  end

  test "create fails" do
    params =
      Factory.params()
      |> Map.drop([:pay_per_hr])
      |> stringify()

    assert {:ok,
            %{
              errors: [%{}]
            }} =
             Absinthe.run(
               Query.create(),
               Schema,
               variables: %{
                 "meta" => params
               }
             )
  end

  defp stringify(%{} = params),
    do:
      params
      |> Enum.map(fn
        {k, %Decimal{} = v} -> {Atom.to_string(k), Decimal.to_float(v)}
        {k, v} -> {Atom.to_string(k), v}
      end)
      |> Enum.into(%{})
end
