defmodule BurdaWeb.Resolver.Meta do
  alias Burda.Meta
  alias Burda.Meta.Api
  alias BurdaWeb.Resolver

  @spec create(
          any(),
          %{
            meta:
              :invalid | %{optional(:__struct__) => none(), optional(atom() | binary()) => any()}
          },
          any()
        ) :: {:error, binary()} | {:ok, Burda.Meta.t()}
  def create(_root, %{meta: input}, _info) do
    case Api.create_(input) do
      {:ok, %Meta{} = meta} ->
        {:ok, meta}

      {:error, changeset} ->
        {:error, Resolver.changeset_errors_to_string(changeset)}
    end
  end
end
