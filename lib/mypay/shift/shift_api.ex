defmodule MyPay.Shift.Api do
  @moduledoc """
  The Shifts context.
  """

  import Ecto.Query, warn: false

  alias MyPay.Repo
  alias MyPay.QueryHelper
  alias MyPay.Shift
  alias MyPay.Shift.Wages
  alias MyPay.Shift.Times
  alias MyPay.Meta
  alias MyPay.Meta.Api, as: MetaApi

  @doc """
  Returns the list of ShiftApi.

  ## Examples

      iex> list()
      [%Shift{}, ...]

  """
  def list(filter \\ nil) do
    Shift
    |> QueryHelper.filter(filter)
    |> Repo.all()
  end

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
          MyPay.Meta.t() | nil
        ) :: {:ok, %Shift{}} | {:error, %Ecto.Changeset{}}

  def create_(%{meta_id: id} = attrs) do
    case MetaApi.get(id) do
      nil ->
        changes =
          %Shift{}
          |> change_(attrs)
          |> Map.put(:errors, meta_id: meta_id_not_found_error(id))

        {:error, changes}

      meta ->
        create_(attrs, meta)
    end
  end

  def create_(attrs),
    do: {
      :error,
      %Shift{}
      |> change_(attrs)
      |> Map.put(:errors, meta_id: meta_id_blank_error())
    }

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
  def change_(%Shift{} = shift, attrs \\ %{}) do
    Shift.changeset(shift, attrs)
  end

  def data() do
    Dataloader.Ecto.new(Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end

  def meta_id_not_found_error(id), do: ~s(meta with ID "#{id}" not found)

  def meta_id_blank_error, do: ~s(meta ID can not be blank)
end
