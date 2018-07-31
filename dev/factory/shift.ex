defmodule Burda.Factory.Shift do
  use ExMachina

  alias ExMachina.Ecto, as: ExMachinaEcto
  alias Burda.Factory
  alias Burda.Shift

  @name __MODULE__
  @start_date ~D[1998-01-01]
  @end_date ~D[2099-12-31]
  @now Timex.now()

  def shift_factory do
    start_time =
      @now
      |> Timex.shift(hours: Faker.random_between(-24, 24))
      |> Timex.to_datetime()
      |> DateTime.to_time()

    %Shift{
      date: random_date(),
      start_time: start_time,
      end_time: end_time(start_time),
      meta: Factory.build(:meta)
    }
  end

  def params(attrs \\ %{})

  def params(attrs),
    do:
      ExMachinaEcto.params_for(
        @name,
        :shift,
        attrs
      )

  defp random_date, do: Faker.Date.between(@start_date, @end_date)

  # shift ends between 3 and 16 hours after shift starts (give or take 5
  # minutes)
  defp end_time(start_time),
    do:
      Time.add(
        start_time,
        Faker.random_between(3, 16) * 60 * 60 + Faker.random_between(-5, 5) * 60
      )
end
