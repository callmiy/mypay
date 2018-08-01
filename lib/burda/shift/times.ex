defmodule Burda.Shift.Times do
  @moduledoc ~S"""
    Compute the various times involved with shift work
  """

  @type t :: %{
          hours_gross: Float.t(),
          normal_hours: Float.t(),
          night_hours: Float.t(),
          sunday_hours: Float.t()
        }

  @night_shift_start ~T[21:45:00]
  @morning_shift_start ~T[05:45:00]
  @midnight ~T[23:59:59.999999]
  @twenty_four_hrs_in_secs 24 * 60 * 60
  @one_hr_in_secs 1 * 60 * 60
  # one hour
  @invalid_shift_duration_secs 1 * 60 * 60
  # 2 hours
  @work_secs_half_break 2 * 60 * 60
  # 4 hours
  @work_secs_full_break 4 * 60 * 60

  @doc ~S"""
    Calculates hours grossed, normal hours (net of break time), night hours
    and sunday hours
  """
  @spec times(
          date :: Date.t(),
          start_time :: Time.t(),
          end_time :: Time.t(),
          break_time_secs :: Integer.t()
        ) :: t
  def times(
        %Date{} = date,
        %Time{} = start_time,
        %Time{} = end_time,
        break_time_secs
      )
      when is_integer(break_time_secs) do
    duration =
      end_time
      |> Time.diff(start_time)
      |> correct_seconds()
      |> to_valid_shift_duration()

    %{
      hours_gross: secs_to_hrs(duration),
      normal_hours:
        duration
        |> subtract_break(break_time_secs)
        |> secs_to_hrs(),
      night_hours:
        duration
        |> night_secs(start_time, end_time)
        |> subtract_break(break_time_secs)
        |> to_valid_shift_duration()
        |> secs_to_hrs(),
      sunday_hours:
        duration
        |> sunday_secs(date, start_time, end_time)
        |> subtract_break(break_time_secs)
        |> to_valid_shift_duration()
        |> secs_to_hrs()
    }
  end

  def secs_to_hrs(secs),
    do:
      secs
      |> Kernel./(@one_hr_in_secs)
      |> Float.round(2)

  def morning_shift_start, do: @morning_shift_start
  def night_shift_start, do: @night_shift_start
  def work_secs_half_break, do: @work_secs_half_break
  def work_secs_full_break, do: @work_secs_full_break
  def invalid_shift_duration_secs, do: @invalid_shift_duration_secs
  def correct_seconds(secs) when secs < 0, do: @twenty_four_hrs_in_secs + secs
  def correct_seconds(secs), do: secs

  defp sunday_secs(duration, _, _, _) when duration <= 0, do: 0.0

  defp sunday_secs(
         duration,
         %Date{} = date,
         %Time{} = start_time,
         %Time{} = end_time
       ) do
    case Date.day_of_week(date) do
      day when day < 7 ->
        0.00

      _ ->
        case Time.compare(end_time, start_time) do
          :gt -> duration
          :eq -> duration
          _ -> Time.diff(@midnight, start_time)
        end
    end
  end

  defp night_secs(duration, _start, _end_) when duration <= 0, do: 0.00

  defp night_secs(duration, %Time{} = start_time, %Time{} = end_time) do
    case Time.compare(end_time, start_time) do
      # start and stop same day
      :gt ->
        get_night_secs_same_day(duration, start_time, end_time)

      _ ->
        get_night_secs_ends_next_day(start_time, end_time)
    end
  end

  defp get_night_secs_ends_next_day(%Time{} = start_time, %Time{} = end_time) do
    case Time.compare(start_time, @night_shift_start) do
      # starts before night shift start - we compute from night shift start
      starting when starting == :lt or starting == :eq ->
        get_night_secs_from_time_to_ends_next_day(end_time)

      _ ->
        # starts after night shift start - we compute from start time
        get_night_secs_from_time_to_ends_next_day(end_time, start_time)
    end
  end

  defp get_night_secs_from_time_to_ends_next_day(
         %Time{} = end_time,
         %Time{} = from_time \\ @night_shift_start
       ) do
    case Time.compare(end_time, @morning_shift_start) do
      # Ends by morning shift start
      ending when ending == :lt or ending == :eq ->
        end_time
        |> Time.diff(from_time)
        |> correct_seconds()

      _ ->
        @morning_shift_start
        |> Time.diff(from_time)
        |> correct_seconds()
    end
  end

  defp get_night_secs_same_day(
         duration,
         %Time{} = start_time,
         %Time{} = end_time
       ) do
    case Time.diff(@morning_shift_start, start_time) do
      # started before morning shift
      starting when starting > 0 ->
        get_night_secs_same_day_started_before_morning_shift(
          starting,
          duration,
          end_time
        )

      _ ->
        get_night_secs_same_day_ended_by_or_after_night_shift_start(end_time)
    end
  end

  defp get_night_secs_same_day_ended_by_or_after_night_shift_start(%Time{} = end_time) do
    case Time.diff(end_time, @night_shift_start) do
      end_after_night_shift_start when end_after_night_shift_start <= 0 ->
        0.00

      end_after_night_shift_start ->
        end_after_night_shift_start
    end
  end

  defp get_night_secs_same_day_started_before_morning_shift(
         start_secs_before_morn_shift,
         duration,
         %Time{} = end_time
       ) do
    case Time.compare(end_time, @morning_shift_start) do
      # Ending by morning shift start
      x when x == :lt or x == :eq ->
        duration

      # Ending after morning shift start
      _ ->
        start_secs_before_morn_shift
    end
  end

  defp subtract_break(time, _break) when time < @work_secs_half_break, do: time

  defp subtract_break(time, break) when time < @work_secs_full_break,
    do:
      time
      |> Kernel.-(break / 2)

  defp subtract_break(time, break), do: time - break

  defp to_valid_shift_duration(secs) when secs <= @invalid_shift_duration_secs, do: 0
  defp to_valid_shift_duration(secs), do: secs
end
