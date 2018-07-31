defmodule BurdaWeb.ShiftControllerTest do
  use BurdaWeb.ConnCase

  alias Burda.ShiftApi
  alias Burda.Shift

  @create_attrs %{
    date: ~D[2010-04-17],
    end_time: ~T[14:00:00.000000],
    hours_gross: 120.5,
    night_hours: 120.5,
    night_suppl_pay: 120.5,
    normal_hours: 120.5,
    normal_pay: 120.5,
    start_time: ~T[14:00:00.000000],
    sunday_hours: 120.5,
    sunday_suppl_pay: 120.5,
    total_pay: 120.5
  }
  @update_attrs %{
    date: ~D[2011-05-18],
    end_time: ~T[15:01:01.000000],
    hours_gross: 456.7,
    night_hours: 456.7,
    night_suppl_pay: 456.7,
    normal_hours: 456.7,
    normal_pay: 456.7,
    start_time: ~T[15:01:01.000000],
    sunday_hours: 456.7,
    sunday_suppl_pay: 456.7,
    total_pay: 456.7
  }
  @invalid_attrs %{
    date: nil,
    end_time: nil,
    hours_gross: nil,
    night_hours: nil,
    night_suppl_pay: nil,
    normal_hours: nil,
    normal_pay: nil,
    start_time: nil,
    sunday_hours: nil,
    sunday_suppl_pay: nil,
    total_pay: nil
  }

  def fixture(:shift) do
    {:ok, shift} = ShiftApi.create_(@create_attrs)
    shift
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all shifts", %{conn: conn} do
      conn = get(conn, shift_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create shift" do
    test "renders shift when data is valid", %{conn: conn} do
      conn = post(conn, shift_path(conn, :create), shift: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, shift_path(conn, :show, id))

      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "date" => ~D[2010-04-17],
               "end_time" => ~T[14:00:00.000000],
               "hours_gross" => 120.5,
               "night_hours" => 120.5,
               "night_suppl_pay" => 120.5,
               "normal_hours" => 120.5,
               "normal_pay" => 120.5,
               "start_time" => ~T[14:00:00.000000],
               "sunday_hours" => 120.5,
               "sunday_suppl_pay" => 120.5,
               "total_pay" => 120.5
             }
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, shift_path(conn, :create), shift: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update shift" do
    setup [:create_]

    test "renders shift when data is valid", %{conn: conn, shift: %Shift{id: id} = shift} do
      conn = put(conn, shift_path(conn, :update, shift), shift: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, shift_path(conn, :show, id))

      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "date" => ~D[2011-05-18],
               "end_time" => ~T[15:01:01.000000],
               "hours_gross" => 456.7,
               "night_hours" => 456.7,
               "night_suppl_pay" => 456.7,
               "normal_hours" => 456.7,
               "normal_pay" => 456.7,
               "start_time" => ~T[15:01:01.000000],
               "sunday_hours" => 456.7,
               "sunday_suppl_pay" => 456.7,
               "total_pay" => 456.7
             }
    end

    test "renders errors when data is invalid", %{conn: conn, shift: shift} do
      conn = put(conn, shift_path(conn, :update, shift), shift: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete shift" do
    setup [:create_]

    test "deletes chosen shift", %{conn: conn, shift: shift} do
      conn = delete(conn, shift_path(conn, :delete, shift))
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, shift_path(conn, :show, shift))
      end)
    end
  end

  defp create_(_) do
    shift = fixture(:shift)
    {:ok, shift: shift}
  end
end
