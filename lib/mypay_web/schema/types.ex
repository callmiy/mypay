defmodule MyPayWeb.Schema.Types do
  @moduledoc """
  Custom types (scalars, objects and input types) shared among schema types
  """
  use Absinthe.Schema.Notation
  use Timex

  @iso_datetime_format "{ISO:Extended:Z}"

  scalar :iso_datetime, name: "ISODatime" do
    parse(fn value -> parse_iso_datetime(value, @iso_datetime_format) end)
    serialize(&Timex.format!(&1, @iso_datetime_format))
  end

  @desc "Sorting directive"
  enum :sorting_directive do
    value(:asc, description: "Sort from smallest to largest")
    value(:desc, description: "Sort from largest to smallest")
  end

  @desc "Less than value"
  input_object :inequality do
    field(:lt, :float)
    field(:lteq, :float)
    field(:eq, :float)
    field(:gt, :float)
  end

  @spec parse_iso_datetime(Absinthe.Blueprint.Input.String.t(), String.t()) ::
          {:ok, DateTime.t() | NaiveDateTime.t()} | :error
  defp parse_iso_datetime(
         %Absinthe.Blueprint.Input.String{value: value},
         format
       ) do
    case Timex.parse(value, format) do
      {:ok, val} -> {:ok, val}
      {:error, _} -> :error
    end
  end

  @spec parse_iso_datetime(Absinthe.Blueprint.Input.Null.t(), any) :: {:ok, nil}
  defp parse_iso_datetime(%Absinthe.Blueprint.Input.Null{}, _) do
    {:ok, nil}
  end

  defp parse_iso_datetime(_, _) do
    :error
  end
end
