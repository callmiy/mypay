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
end
