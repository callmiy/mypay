defmodule MyPayWeb.Schema do
  use Absinthe.Schema

  @dialyzer {:no_return, run_query: 1, run_query: 2}

  import_types(Absinthe.Type.Custom)
  import_types(MyPayWeb.Schema.Types)
  import_types(MyPayWeb.Schema.Shift)
  import_types(MyPayWeb.Schema.Meta)
  import_types(MyPayWeb.Schema.Adhoc)
  import_types(MyPayWeb.Schema.OfflineSync)

  alias MyPay.Shift.Api, as: ShiftApi
  alias MyPay.Meta.Api, as: MetaApi

  query do
    import_fields(:shift_query)
    import_fields(:adhoc_query)
    import_fields(:meta_query)
  end

  mutation do
    import_fields(:meta_mutation)
    import_fields(:shift_mutation)
    import_fields(:offline_sync_mutation)
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

  def run_query(%{"query" => query} = params),
    do: run_query(query, params["variables"] || %{})

  def run_query(%{query: query} = params),
    do: run_query(query, params[:variables] || %{})

  def run_query(query) when is_binary(query), do: run_query(query)

  def run_query(query, variables \\ %{}),
    do: Absinthe.run(query, __MODULE__, variables: variables)

  def get_datetime_id(other \\ "")

  def get_datetime_id(other) when is_binary(other),
    do:
      DateTime.utc_now()
      |> DateTime.to_iso8601()
      |> Kernel.<>(other)

  def get_datetime_id(other),
    do:
      other
      |> inspect()
      |> get_datetime_id()
end
