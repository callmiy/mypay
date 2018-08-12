defmodule BurdaWeb.Resolver.Shift do
  alias Burda.Shift.Api
  alias BurdaWeb.Resolver
  alias Burda.Shift

  @spec shifts(any(), any(), any()) :: {:ok, [Shift.t()]}
  def shifts(_root, _args, _info), do: {:ok, Api.list()}

  @spec create(
          any(),
          %{
            shift: %{
              date: Date.t(),
              end_time: Time.t(),
              meta_id: any(),
              start_time: Time.t()
            }
          },
          any()
        ) :: {:error, binary()} | {:ok, Shift.t()}
  def create(_root, %{shift: input}, _info) do
    case Api.create_(input) do
      {:ok, %Shift{} = shift} ->
        {:ok, shift}

      {:error, changeset} ->
        {:error, Resolver.changeset_errors_to_string(changeset)}
    end
  end
end
