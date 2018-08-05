# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Burda.Repo.insert!(%Burda.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Burda.Shift
alias Burda.Factory.Shift, as: ShiftFactory
alias Burda.Meta
alias Burda.Factory.Meta, as: MetaFactory
alias Burda.Repo

Repo.delete_all(Shift)
Repo.delete_all(Meta)

Repo.transaction(fn ->
  metas =
    1..Enum.random(4..6)
    |> Enum.map(fn _ -> MetaFactory.insert() end)

  1..Enum.random(8..10)
  |> Enum.each(fn _ -> ShiftFactory.insert(%{}, Enum.random(metas)) end)

  today = Date.utc_today()
  this_year = today.year
  this_month = today.month
  days_for_month = 1..Timex.days_in_month(this_year, this_month)

  1..Enum.random(3..12)
  |> Enum.reduce([], fn _, selected_days ->
    {day, selected_days} =
      ShiftFactory.unique_random_day_of_month(
        days_for_month,
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
end)
