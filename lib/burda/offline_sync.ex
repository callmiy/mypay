defmodule MyPay.OfflineSync do
  use Ecto.Schema
  import Ecto.Changeset

  alias MyPay.Repo

  @timestamps_opts [
    type: Timex.Ecto.DateTime,
    autogenerate: {Timex.Ecto.DateTime, :autogenerate, []}
  ]

  schema "offline_sync" do
    field(:rev, :string)
    field(:offline_id, :string)

    timestamps()
  end

  @doc false
  def changeset(offline, attrs \\ %{}) do
    offline
    |> cast(attrs, [:rev, :offline_id])
    |> validate_required([:rev, :offline_id])
    |> unique_constraint(:rev, name: :offline_id_rev_index)
  end

  @doc false
  def create_(%{} = attrs) do
    %__MODULE__{}
    |> changeset(attrs)
    |> Repo.insert()
  end

  @doc false
  def get_by(attrs), do: Repo.get_by(__MODULE__, attrs)
end
