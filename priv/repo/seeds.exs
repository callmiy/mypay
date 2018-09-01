# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     MyPay.Repo.insert!(%MyPay.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias MyPay.Shift
  alias MyPay.Factory.Shift, as: ShiftFactory
  alias MyPay.Meta
  alias MyPay.Factory.Meta, as: MetaFactory
  alias MyPay.Repo

  def run do
    Repo.delete_all(Shift)
    Repo.delete_all(Meta)

    Repo.transaction(fn ->
      metas =
        1..Enum.random(4..6)
        |> Enum.map(fn _ -> MetaFactory.insert() end)

      today = Date.utc_today()
      this_year = today.year
      this_month = today.month
      days_in_this_month = 1..Timex.days_in_month(this_year, this_month)

      # Insert for current month
      1..Enum.random(3..12)
      |> Enum.reduce([], fn _, selected_days ->
        {day, selected_days} =
          ShiftFactory.unique_random_day_of_month(
            days_in_this_month,
            selected_days
          )

        ShiftFactory.insert(
          %{
            date: Date.from_erl!({this_year, this_month, day})
          },
          Enum.random(metas)
        )

        selected_days
      end)

      months_range = 1..12
      days_range = 1..28

      1..Enum.random(20..30)
      |> Enum.each(fn _ ->
        month = get_random_if_not(this_month, months_range)

        ShiftFactory.insert(
          %{
            date: Date.from_erl!({this_year, month, Enum.random(days_range)})
          },
          Enum.random(metas)
        )
      end)
    end)
  end

  defp get_random_if_not(value, range) do
    case Enum.random(range) do
      ^value -> get_random_if_not(value, range)
      another -> another
    end
  end
end

Seeds.run()
