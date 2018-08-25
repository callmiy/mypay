defmodule MyPayWeb.Resolver do
  @moduledoc """
  Helper utilities for resolvers
  """

  @unauthorized "Unauthorized"

  @doc """
  Takes a changeset error and converts it to a string
  """
  @spec changeset_errors_to_string(%Ecto.Changeset{}) :: String.t()
  def changeset_errors_to_string(%Ecto.Changeset{errors: errors}) do
    errors
    |> Enum.map(fn
      {k, {v, _}} ->
        {k, v}

      kv ->
        kv
    end)
    |> Enum.into(%{})
    |> Poison.encode!()
  end

  @spec unauthorized() :: {:error, [{:message, <<_::96>>}, ...]}
  def unauthorized do
    {:error, message: @unauthorized}
  end

  @doc """
  Take an error returned by applying Ecto.Repo.transaction to a Multi
  operation and return a string representation.
  """
  @spec transaction_errors_to_string(%Ecto.Changeset{}, Multi.name()) :: String.t()
  def transaction_errors_to_string(%Ecto.Changeset{} = changeset, failed_operation) do
    changeset_string = changeset_errors_to_string(changeset)
    "{name: #{failed_operation}, error: #{changeset_string}}"
  end
end
