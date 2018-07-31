defmodule Burda.Factory.Shift do
  use ExMachina

  alias ExMachina.Ecto, as: ExMachinaEcto
  alias Burda.Factory
  alias Burda.Shift

  @name __MODULE__
  @start_date ~D[1900-01-01]
  @range_24 -24..24
  @null_time ~T[00:00:00.000000]
  @one_hr_secs 3_600
  @one_min_sec 60
  @date_offset 0..30_000

  def shift_factory do
    time_offset =
      @range_24
      |> Enum.random()
      |> Kernel.*(@one_hr_secs)

    start_time = Time.add(@null_time, time_offset)

    end_time =
      start_time
      |> Time.add(Enum.random(1..15) * @one_hr_secs + Enum.random(-5..5) * @one_min_sec)

    %Shift{
      date: random_date(),
      start_time: start_time,
      end_time: end_time,
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

  def random_date, do: Date.add(@start_date, Enum.random(@date_offset))
end
