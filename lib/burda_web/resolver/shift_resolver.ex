defmodule BurdaWeb.Resolver.Shift do
  alias Burda.Shift.Api
  alias BurdaWeb.Resolver
  alias Burda.Shift

  def shifts(_root, %{shift: filter} = _args, _info),
    do: {:ok, Api.list(filter)}

  def shifts(_root, _args, _info),
    do: {:ok, Api.list()}

  def create(_root, %{shift: input}, _info) do
    case Api.create_(input) do
      {:ok, %Shift{} = shift} ->
        {:ok, shift}

      {:error, changeset} ->
        {:error, Resolver.changeset_errors_to_string(changeset)}
    end
  end
end
