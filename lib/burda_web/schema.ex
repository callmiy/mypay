defmodule BurdaWeb.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)
  import_types(BurdaWeb.Schema.Types)
  import_types(BurdaWeb.Schema.Shift)
  import_types(BurdaWeb.Schema.Meta)
  import_types(BurdaWeb.Schema.Adhoc)

  alias Burda.Shift.Api, as: ShiftApi
  alias Burda.Meta.Api, as: MetaApi

  query do
    import_fields(:shift_query)
    import_fields(:adhoc_query)
  end

  mutation do
    import_fields(:meta_mutation)
    import_fields(:shift_mutation)
  end

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(ShiftApi, ShiftApi.data())
      |> Dataloader.add_source(MetaApi, MetaApi.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end
end
