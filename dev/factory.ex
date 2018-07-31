defmodule Burda.Factory do
  use ExMachina.Ecto, repo: Burda.Repo
  @dialyzer {:no_return, fields_for: 1}

  alias Burda.Meta

  def meta_factory do
    %Meta{
      break_time_secs: Enum.random([nil, Faker.random_between(100, 5000)]),
      pay_per_hr: Decimal.new("9.49"),
      night_suppl_pay_pct: Decimal.new("25.00"),
      sunday_suppl_pay_pct: Decimal.new("50.00")
    }
  end
end
