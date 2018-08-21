defmodule Burda.Meta.Api do
  @moduledoc """
  The Metas context.
  """

  import Ecto.Query, warn: false

  alias Burda.Repo
  alias Burda.Meta
  alias Burda.QueryHelper

  @default_break_time_secs 30 * 60

  @doc """
  Returns the list of metas.

  ## Examples

      iex> list()
      [%Meta{}, ...]

  """
  def list(filter \\ nil) do
    Meta
    |> QueryHelper.filter(filter)
    |> Repo.all()
  end

  @doc """
  Gets a single meta.

  Raises `Ecto.NoResultsError` if the Meta does not exist.

  ## Examples

      iex> get(123)
      %Meta{}

      iex> get(456)
      ** (Ecto.NoResultsError)

  """
  def get(id), do: Repo.get(Meta, id)

  @doc """
  Creates a meta.

  ## Examples

      iex> create_(%{field: value})
      {:ok, %Meta{}}

      iex> create_(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_(attrs \\ %{}) do
    %Meta{}
    |> Meta.changeset(attrs)
    |> Repo.insert(returning: true)
  end

  @doc """
  Updates a meta.

  ## Examples

      iex> update_(meta, %{field: new_value})
      {:ok, %Meta{}}

      iex> update_(meta, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_(%Meta{} = meta, attrs) do
    meta
    |> Meta.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Meta.

  ## Examples

      iex> delete_(meta)
      {:ok, %Meta{}}

      iex> delete_(meta)
      {:error, %Ecto.Changeset{}}

  """
  def delete_(%Meta{} = meta) do
    Repo.delete(meta)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking meta changes.

  ## Examples

      iex> change_(meta)
      %Ecto.Changeset{source: %Meta{}}

  """

  @spec change_(meta :: Burda.Meta.t()) :: Ecto.Changeset.t()
  def change_(meta \\ %Meta{}), do: change_(meta, %{})

  @spec change_(
          meta :: Burda.Meta.t(),
          params :: %{
            optional(:__struct__) => none(),
            optional(atom() | binary()) => any()
          }
        ) :: Ecto.Changeset.t()
  def change_(%Meta{} = meta, %{} = attrs) do
    Meta.changeset(meta, attrs)
  end

  def get_latest,
    do:
      Meta
      |> order_by([m], desc: m.id)
      |> limit([m], 1)
      |> Repo.one()

  def default_break_time,
    do: @default_break_time_secs

  def data() do
    Dataloader.Ecto.new(Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end
end
