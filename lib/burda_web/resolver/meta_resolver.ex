defmodule BurdaWeb.Resolver.Meta do
  alias Burda.Meta
  alias Burda.Meta.Api
  alias BurdaWeb.Resolver

  def create(_root, %{meta: input}, _info) do
    case Api.create_(input) do
      {:ok, %Meta{} = meta} ->
        {:ok, meta}

      {:error, changeset} ->
        {:error, Resolver.changeset_errors_to_string(changeset)}
    end
  end

  def metas(_root, %{meta: filter} = _args, _info),
    do: {:ok, Api.list(filter)}

  def metas(_root, _args, _info),
    do: {:ok, Api.list()}
end
