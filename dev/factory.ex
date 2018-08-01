defmodule Burda.Factory do
  use ExMachina.Ecto, repo: Burda.Repo
  @dialyzer {:no_return, fields_for: 1}

  alias Burda.Meta
  alias Burda.Factory.Utils

  def meta_factory do
    %Meta{
      break_time_secs: Enum.random([nil, Faker.random_between(100, 5000)]),
      pay_per_hr: Utils.random_float_decimal_between(1.0, 15.9, 2),
      night_suppl_pay_pct: Utils.random_float_decimal_between(1.0, 25, 2),
      sunday_suppl_pay_pct: Utils.random_float_decimal_between(25, 65, 2)
    }
  end
end
