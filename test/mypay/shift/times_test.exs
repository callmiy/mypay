defmodule MyPay.Shift.TimeTest do
  use ExUnit.Case, async: true

  alias MyPay.Shift.Times, as: Times
  alias MyPay.Factory.Shift, as: ShiftFactory
  alias MyPay.Factory, as: FactoryUtils

  @one_hour_secs 60 * 60
  @one_min_secs 60
  @break_time_secs 1_800
  @fixed_date Timex.now() |> Timex.to_date()
  @midnight_zero ~T[00:00:00.000000]
  @midnight ~T[23:59:59.999999]
  @invalid_shift_duration_secs Times.invalid_shift_duration_secs()
  @work_secs_half_break Times.work_secs_half_break()
  @work_secs_full_break Times.work_secs_full_break()

  test "times/4 starting close to an hour before morning shift start" do
    # 15 hrs 10 mins
    secs = 15 * @one_hour_secs + 10 * 60

    # between 1 and 60 minutes before morning shift starts
    start_time =
      Times.morning_shift_start()
      |> Time.add(-60 * Enum.random(1..60))

    end_time = Time.add(start_time, secs)
    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross == Times.secs_to_hrs(secs)
    assert times.night_hours == 0.00

    assert times.normal_hours ==
             secs
             |> Kernel.-(@break_time_secs)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting more than an hour before morning shift start, ending at/after morning shift - half break during night" do
    # between 2.1 and 3.9 hours before morning shift starts
    secs_before_morning_shift =
      2.1
      |> FactoryUtils.random_float_between(3.9, 1)
      |> trunc()
      |> Kernel.*(@one_hour_secs)

    start_time =
      Times.morning_shift_start()
      |> Time.add(-secs_before_morning_shift)

    # between 0 and 15 minutes
    secs_after_morning_shift = Enum.random(0..15) * 60

    end_time =
      Times.morning_shift_start()
      |> Time.add(secs_after_morning_shift)

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)
    total_work_secs = secs_before_morning_shift + secs_after_morning_shift
    assert times.hours_gross == Times.secs_to_hrs(total_work_secs)

    assert times.night_hours ==
             secs_before_morning_shift
             |> Kernel.-(@break_time_secs / 2)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting more than an hour before morning shift start, ending at/after morning shift - full break during night" do
    # between 4.2 and 4.9 hours before morning shift starts
    secs_before_morning_shift =
      4.2
      |> FactoryUtils.random_float_between(4.9, 1)
      |> Kernel.*(@one_hour_secs)
      |> trunc()

    start_time =
      Times.morning_shift_start()
      |> Time.add(-secs_before_morning_shift)

    # between 0 and 15 minutes
    secs_after_morning_shift = Enum.random(0..15) * 60
    end_time = Time.add(Times.morning_shift_start(), secs_after_morning_shift)
    total_work_secs = secs_before_morning_shift + secs_after_morning_shift
    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross == Times.secs_to_hrs(total_work_secs)

    assert times.night_hours ==
             secs_before_morning_shift
             |> Kernel.-(@break_time_secs)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting more than an hour before morning shift start, ending by morning shift - full break during night" do
    # between 5.1 and 5.74 hours before morning shift starts
    secs_before_morning_shift =
      5.1
      |> FactoryUtils.random_float_between(5.74, 1)
      |> Kernel.*(@one_hour_secs)
      |> trunc()

    start_time =
      Times.morning_shift_start()
      |> Time.add(-secs_before_morning_shift)

    # between 0 and 15 minutes before morning shift starts
    end_secs_before_morning_shift = Enum.random(0..15) * -60

    end_time =
      Times.morning_shift_start()
      |> Time.add(end_secs_before_morning_shift)

    total_work_secs =
      end_time
      |> Time.diff(start_time)
      |> Times.correct_seconds()

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross == Times.secs_to_hrs(total_work_secs)

    assert times.night_hours ==
             total_work_secs
             |> Kernel.-(@break_time_secs)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting more than an hour before morning shift start, ending by morning shift - half break during night" do
    # between 3.1 and 3.8 hours before morning shift starts
    secs_before_morning_shift =
      3.1
      |> FactoryUtils.random_float_between(3.8, 1)
      |> Kernel.*(@one_hour_secs)
      |> trunc()

    start_time =
      Times.morning_shift_start()
      |> Time.add(-secs_before_morning_shift)

    # between 0 and 15 minutes before morning shift starts
    end_secs_before_morning_shift = Enum.random(0..15) * -60

    end_time =
      Times.morning_shift_start()
      |> Time.add(end_secs_before_morning_shift)

    total_work_secs = secs_gross(start_time, end_time)
    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross == Times.secs_to_hrs(total_work_secs)

    assert times.night_hours ==
             total_work_secs
             |> Kernel.-(@break_time_secs / 2)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting by/after morning shift start, ending by night shift start same day" do
    # between 0 and 1.9 hours before/after morning shift starts
    secs_before_morning_shift =
      0.0
      |> FactoryUtils.random_float_between(1.9, 1)
      |> Kernel.*(@one_hour_secs * Enum.random([1, +1]))
      |> trunc()

    start_time =
      Times.morning_shift_start()
      |> Time.add(secs_before_morning_shift)

    # between 0 and 11 hours before night shift
    # night shift is 16 hours from morning shift.
    # 0 hour before night shift means 16 hours after morning shift start
    # 11 hours from night shift means 5 hours after morning shift
    # 5 hours should give us full break time
    end_secs_before_night_shift = Enum.random(0..11) * -@one_hour_secs

    end_time =
      Times.night_shift_start()
      |> Time.add(end_secs_before_night_shift)

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross ==
             start_time
             |> secs_gross(end_time)
             |> Times.secs_to_hrs()

    assert times.night_hours == 0.00
  end

  test "times/4 starting by/after morning shift start, ending after night shift start same day" do
    # between 0 and 0.9 hours before/after morning shift starts
    secs_before_morning_shift =
      0.0
      |> FactoryUtils.random_float_between(0.9, 1)
      |> Kernel.*(@one_hour_secs * Enum.random([1, +1]))
      |> trunc()

    start_time =
      Times.morning_shift_start()
      |> Time.add(secs_before_morning_shift)

    # between 1.5 and 1.9 hours after night shift - means no break
    end_secs_after_night_shift_start =
      1.5
      |> FactoryUtils.random_float_between(1.9, 1)
      |> Kernel.*(@one_hour_secs)
      |> trunc()

    end_time =
      Times.night_shift_start()
      |> Time.add(end_secs_after_night_shift_start)

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross ==
             start_time
             |> secs_gross(end_time)
             |> Times.secs_to_hrs()

    assert times.night_hours ==
             end_secs_after_night_shift_start
             |> Times.secs_to_hrs()
  end

  test "times/4 starting by night shift start, ending by morning shift start next day" do
    # between 0 and 4 hours before night shift starts
    secs_bf_night_shift = Enum.random(0..4) * @one_hour_secs

    start_time =
      Times.night_shift_start()
      |> Time.add(-secs_bf_night_shift)

    # between 4 and 0 hours before morning shift start - for full break
    end_secs_bf_morning_shift = Enum.random(0..4) * @one_hour_secs

    end_time =
      Times.morning_shift_start()
      |> Time.add(-end_secs_bf_morning_shift)

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross ==
             start_time
             |> secs_gross(end_time)
             |> Times.secs_to_hrs()

    assert times.night_hours ==
             end_time
             |> Time.diff(Times.night_shift_start())
             |> Times.correct_seconds()
             |> Kernel.-(@break_time_secs)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting by night shift start, ending after morning shift start next day" do
    # between 0 and 4 hours before night shift starts
    secs_bf_night_shift = Enum.random(0..4) * @one_hour_secs

    start_time =
      Times.night_shift_start()
      |> Time.add(-secs_bf_night_shift)

    # between 1 and 4 hours after morning shift start
    end_secs_after_morning_shift = Enum.random(1..4) * @one_hour_secs

    end_time =
      Times.morning_shift_start()
      |> Time.add(end_secs_after_morning_shift)

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross ==
             start_time
             |> secs_gross(end_time)
             |> Times.secs_to_hrs()

    assert times.night_hours ==
             Times.morning_shift_start()
             |> Time.diff(Times.night_shift_start())
             |> Times.correct_seconds()
             |> Kernel.-(@break_time_secs)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting after night shift start, ending by morning shift start next day" do
    # between 0 and 2 hours after night shift starts
    secs_after_night_shift = Enum.random(0..2) * @one_hour_secs

    start_time =
      Times.night_shift_start()
      |> Time.add(secs_after_night_shift)

    # between 0 and 1 hour before morning shift start
    end_secs_bf_morning_shift =
      0.0
      |> FactoryUtils.random_float_between(1.0, 1)
      |> Kernel.*(@one_hour_secs)
      |> trunc()

    end_time =
      Times.morning_shift_start()
      |> Time.add(-end_secs_bf_morning_shift)

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross ==
             start_time
             |> secs_gross(end_time)
             |> Times.secs_to_hrs()

    assert times.night_hours ==
             end_time
             |> Time.diff(start_time)
             |> Times.correct_seconds()
             |> Kernel.-(@break_time_secs)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting after night shift start, ending after morning shift start next day" do
    # between 0 and 2 hours after night shift starts
    secs_after_night_shift = Enum.random(0..2) * @one_hour_secs

    start_time =
      Times.night_shift_start()
      |> Time.add(secs_after_night_shift)

    # between 0 and 5 hours after morning shift start
    end_secs_after_morning_shift =
      0.0
      |> FactoryUtils.random_float_between(5.0, 1)
      |> Kernel.*(@one_hour_secs)
      |> trunc()

    end_time =
      Times.morning_shift_start()
      |> Time.add(end_secs_after_morning_shift)

    times = Times.times(@fixed_date, start_time, end_time, @break_time_secs)

    assert times.hours_gross ==
             start_time
             |> secs_gross(end_time)
             |> Times.secs_to_hrs()

    assert times.night_hours ==
             Times.morning_shift_start()
             |> Time.diff(start_time)
             |> Times.correct_seconds()
             |> Kernel.-(@break_time_secs)
             |> Times.secs_to_hrs()
  end

  test "times/4 starting on sunday and ending on sunday" do
    date =
      ShiftFactory.random_date()
      |> FactoryUtils.next_sunday_date()

    assert Date.day_of_week(date) == 7

    start_hrs_bf_midnight = FactoryUtils.random_float_between(2.0, 22.9, 2)

    start_time =
      @midnight
      |> Time.add(
        @one_hour_secs
        |> Kernel.*(-start_hrs_bf_midnight)
        |> trunc()
      )

    end_time =
      start_time
      |> Time.add(
        2.0
        |> FactoryUtils.random_float_between(start_hrs_bf_midnight, 2)
        |> Kernel.*(@one_hour_secs)
        |> trunc()
      )

    times = Times.times(date, start_time, end_time, @break_time_secs)

    sunday_hours =
      case end_time
           |> Time.diff(start_time)
           |> Times.correct_seconds() do
        duration when duration <= @invalid_shift_duration_secs ->
          0.00

        duration when duration < @work_secs_half_break ->
          Times.secs_to_hrs(duration)

        duration when duration < @work_secs_full_break ->
          duration
          |> Kernel.-(@break_time_secs / 2)
          |> Times.secs_to_hrs()

        duration ->
          duration
          |> Kernel.-(@break_time_secs)
          |> Times.secs_to_hrs()
      end

    assert times.sunday_hours == sunday_hours
  end

  test "times/4 starting on saturday and ending on sunday by morning shift" do
    date =
      ShiftFactory.random_date()
      |> FactoryUtils.next_sunday_date()
      |> Date.add(-1)

    assert Date.day_of_week(date) == 6

    start_hrs_bf_midnight = FactoryUtils.random_float_between(1.0, 2.25, 2)

    start_time =
      @midnight
      |> Time.add(
        @one_hour_secs
        |> Kernel.*(-start_hrs_bf_midnight)
        |> trunc()
      )

    # ends between 0 and 3 hours before morning_shift_start
    end_time =
      Times.morning_shift_start()
      |> Time.add(
        0.00
        |> FactoryUtils.random_float_between(1.00)
        |> Kernel.*(-@one_hour_secs)
        |> trunc()
      )

    times = Times.times(date, start_time, end_time, @break_time_secs)

    sunday_hours =
      end_time
      |> Time.diff(@midnight_zero)
      |> Kernel.-(@break_time_secs)
      |> Times.secs_to_hrs()

    assert times.sunday_hours == sunday_hours
  end



  defp secs_gross(%Time{} = start_time, %Time{} = end_time),
    do:
      end_time
      |> Time.diff(start_time)
      |> Times.correct_seconds()
end
