defmodule Burda.Shift.ApiTest do
  use Burda.DataCase

  alias Burda.Shift
  alias Burda.Shift.Api
  alias Burda.Factory.Shift, as: Factory

  test "list/0" do
    shift = Factory.insert()
    assert Api.list() == [shift]
  end

  test "get/1 returns shift when shift exists" do
    shift = Factory.insert()
    assert Api.get(shift.id) == shift
  end

  test "get/1 returns nil when shift does not exist" do
    assert Api.get(0) == nil
  end

  test "update/2 succeeds for correct attributes" do
    shift = Factory.insert()
    attrs = Factory.params()

    assert {:ok, %Shift{} = _shift} = Api.update_(shift, attrs)
  end

  test "delete/1" do
    shift = Factory.insert()
    assert {:ok, shift} = Api.delete_(shift)
    assert Api.get(shift.id) == nil
  end

  test "shifts_for_current_month/2" do
    today = Date.utc_today()
    this_year = today.year
    this_month = today.month
    days_for_month = 1..Timex.days_in_month(this_year, this_month)

    created_shifts =
      1..3
      |> Enum.reduce([[], []], fn _, [shifts, selected_days] ->
        {day, selected_days} = Factory.unique_random_day_of_month(days_for_month, selected_days)

        shift =
          Factory.insert(%{
            date: Date.from_erl!({this_year, this_month, day})
          })

        [[shift | shifts], selected_days]
      end)
      |> hd()

    query_shifts = Api.shifts_for_current_month(this_year, this_month)

    assert length(created_shifts) == 3
    assert Enum.all?(query_shifts, &Enum.member?(created_shifts, &1))
  end
end