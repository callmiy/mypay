defmodule Burda.Shift.Api do
  @moduledoc """
  The Shifts context.
  """

  import Ecto.Query, warn: false
  alias Burda.Repo

  alias Burda.Shift
  alias Burda.Shift.Wages
  alias Burda.Shift.Times
  alias Burda.Meta

  @doc """
  Returns the list of ShiftApi.

  ## Examples

      iex> list()
      [%Shift{}, ...]

  """
  def list do
    Repo.all(Shift)
  end

  def shifts_for_current_month(year, month),
    do:
      Shift
      |> where([s], fragment("extract(month from date) = ?", ^month))
      |> where([s], fragment("extract(year from date) = ?", ^year))
      |> order_by([s], desc: s.date)
      |> Repo.all()

  @doc """
  Gets a single shift.

  Raises `Ecto.NoResultsError` if the Shift does not exist.

  ## Examples

      iex> get(123)
      %Shift{}

      iex> get(456)
      ** (Ecto.NoResultsError)

  """
  def get(id), do: Repo.get(Shift, id)

  @doc """
  Creates a shift.

  ## Examples

      iex> create_(%{date: ~D[2018-07-03], start_time: ~T[05:08:49.000], end_time: ~T[15:17:08.000] }, %Meta{})
      {:ok, %Shift{}}

      iex> create_(%{date: invalid_date})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_(
          %{
            date: Date.t(),
            end_time: Time.t(),
            start_time: Time.t(),
            meta_id: Integer.t() | String.t()
          },
          Burda.Meta.t()
        ) :: {:ok, %Shift{}} | {:error, %Ecto.Changeset{}}
  def create_(%{} = attrs, %Meta{} = meta) do
    times =
      Times.times(
        attrs.date,
        attrs.start_time,
        attrs.end_time,
        meta.break_time_secs
      )

    attrs =
      attrs
      |> Map.merge(Wages.wages(times, meta))
      |> Map.merge(times)

    %Shift{}
    |> Shift.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a shift.

  ## Examples

      iex> update_(shift, %{field: new_value})
      {:ok, %Shift{}}

      iex> update_(shift, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_(%Shift{} = shift, attrs) do
    shift
    |> Shift.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Shift.

  ## Examples

      iex> delete_(shift)
      {:ok, %Shift{}}

      iex> delete_(shift)
      {:error, %Ecto.Changeset{}}

  """
  def delete_(%Shift{} = shift) do
    Repo.delete(shift)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking shift changes.

  ## Examples

      iex> change_(shift)
      %Ecto.Changeset{source: %Shift{}}

  """
  def change_(%Shift{} = shift) do
    Shift.changeset(shift, %{})
  end

  def data() do
    Dataloader.Ecto.new(Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end
end
