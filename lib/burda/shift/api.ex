defmodule Burda.Shift.Api do
  @moduledoc """
  The Shifts context.
  """

  import Ecto.Query, warn: false
  alias Burda.Repo

  alias Burda.Shift

  @doc """
  Returns the list of ShiftApi.

  ## Examples

      iex> list()
      [%Shift{}, ...]

  """
  def list do
    Repo.all(Shift)
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

      iex> create_(%{field: value})
      {:ok, %Shift{}}

      iex> create_(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_(attrs) do
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
end
