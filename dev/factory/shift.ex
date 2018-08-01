defmodule Burda.Factory.Shift do
  alias Burda.Meta
  alias Burda.Meta.Api, as: MetaApi
  alias Burda.Shift.Api
  alias Burda.Factory, as: FactoryUtils
  alias Burda.Factory.Meta, as: MetaFactory

  @start_date ~D[1900-01-01]
  @null_time ~T[00:00:00.000000]
  @one_hr_millsecs 3_600_000_000
  @date_offset 0..30_000

  def insert(params \\ %{}) do
    {:ok, meta} =
      MetaFactory.params()
      |> MetaApi.create_()

    insert(params, meta)
  end

  def insert(params, %Meta{} = meta) do
    attrs = params(params)

    {:ok, shift} =
      meta
      |> Api.create_(Map.put(attrs, :meta_id, meta.id))

    shift
  end

  def params(attrs \\ %{})

  def params(attrs) when is_list(attrs),
    do:
      attrs
      |> Map.new()
      |> params()

  def params(attrs) do
    start_time =
      attrs
      |> Map.get(:start_time)
      |> start_time()

    %{
      date: random_date(),
      start_time: start_time,
      end_time:
        attrs
        |> Map.get(:end_time)
        |> end_time(start_time)
    }
  end

  def random_date, do: Date.add(@start_date, Enum.random(@date_offset))

  defp start_time(nil) do
    time_offset =
      0.0
      |> FactoryUtils.random_float_between(23.99, 6)
      |> Kernel.*(@one_hr_millsecs)
      |> trunc()

    Time.add(@null_time, time_offset, :millisecond)
  end

  defp start_time(val), do: val

  defp end_time(nil, %Time{} = start_time) do
    time_offset =
      0.4
      |> FactoryUtils.random_float_between(15.99, 6)
      |> Kernel.*(@one_hr_millsecs)
      |> trunc()

    Time.add(start_time, time_offset, :millisecond)
  end

  defp end_time(val, _), do: val
end
