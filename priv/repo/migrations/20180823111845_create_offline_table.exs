defmodule Burda.Repo.Migrations.CreateOfflineTable do
  use Ecto.Migration

  def change do
    create table(:offline_sync) do
      add(
        :offline_id,
        :string,
        null: false,
        comment: "A unique ID from PouchDb, but really _id"
      )

      add(
        :rev,
        :string,
        null: false,
        comment: "Revision ID from PouchDB, but really _rev"
      )

      timestamps()
    end

    :offline_sync
    |> unique_index([:offline_id, :rev])
    |> create()
  end
end
