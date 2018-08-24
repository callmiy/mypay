defmodule MyPayWeb.Schema.MetaTest do
  use MyPay.DataCase

  alias MyPayWeb.Schema
  alias MyPayWeb.Query.Meta, as: Query
  alias MyPay.Factory.Meta, as: Factory

  @date_time_pattern ~r/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z/

  describe "Mutations" do
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
  end

  describe "Queries" do
    test "Get all metas ordered by ID desc" do
      created_metas_ids =
        1..3
        |> Enum.map(fn _ ->
          m = Factory.insert()
          Integer.to_string(m.id)
        end)
        |> Enum.sort()

      assert {
               :ok,
               %{
                 data: %{
                   "metas" => metas
                 }
               }
             } =
               Schema.run_query(Query.all_metas(), %{
                 "metaInput" => %{
                   "orderBy" => %{
                     "id" => "DESC"
                   }
                 }
               })

      assert Enum.map(metas, & &1["id"]) == Enum.reverse(created_metas_ids)
    end
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
