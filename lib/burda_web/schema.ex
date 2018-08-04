defmodule BurdaWeb.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)
  import_types(BurdaWeb.Schema.Types)
  import_types(BurdaWeb.Schema.Shift)

  query do
    import_fields(:shift_query)
  end
end
