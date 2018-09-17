defmodule MyPayWeb.Schema.Adhoc do
  @moduledoc ~S"""
    Absinthe schema for objects that do not map to any Ecto Schema
  """
  use Absinthe.Schema.Notation

  alias MyPayWeb.Endpoint
  alias MyPayWeb.LayoutView
  alias MyPayWeb.IndexController
  alias MyPayWeb.ShiftController
  alias MyPayWeb.Schema

  @desc "New shift URL"
  object :new_shift_url do
    field :_id, non_null(:id) do
      resolve(fn _, _, _ -> {:ok, Schema.get_datetime_id("new-shift-url")} end)
    end

    field :schema_type, non_null(:string) do
      resolve(fn _, _, _ -> {:ok, "NewShiftUrl"} end)
    end

    field :url, non_null(:string) do
      resolve(fn _, _, _ ->
        {
          :ok,
          MyPayWeb.Router.Helpers.shift_path(Endpoint, :new)
        }
      end)
    end
  end

  @desc "Assigns for rendering app.html.eex in offline mode"
  object :main_app_template_assigns do
    field :main_css, non_null(:string) do
      resolve(fn _, _, _ ->
        {
          :ok,
          LayoutView.index_css_path()
          |> LayoutView.page_css(nil)
        }
      end)
    end

    field :main_js, non_null(:string) do
      resolve(fn _, _, _ ->
        {
          :ok,
          LayoutView.index_js_path()
          |> LayoutView.page_js(nil)
        }
      end)
    end
  end

  @desc ~S"""
  App main child template assigns. App main template is app.html.eex, but it
  will be rendered by a child template at
  render(@view_module, @view_template, assigns). The caller child will export
  assigns that will be used by the parent to help parent render itself. This
  schema represents such assigns - and mostly needed for offline first
  client rendering.
  """
  object :main_child_template_assigns do
    field(:page_title, :string)
    field(:page_main_css, :string)
    field(:page_main_js, :string)

    @desc "Other CSS link tags - usually preloaded for child templates"
    field(:page_other_css, list_of(:string))
  end

  # --------------------------------ENUMS-----------------------------------
  enum :route_action_enum do
    value(:index_new, description: "IndexController.new/2")
    value(:shift_new, description: "ShiftController.new/2")
  end

  # --------------------------------/ENUMS-----------------------------------

  input_object :get_main_child_template_assigns do
    field(:action, non_null(:route_action_enum))
  end

  # QUERIES
  @desc "Queries allowed on adhoc object"
  object :adhoc_query do
    @desc "Get New shift URL"
    field(:new_shift_url, type: :new_shift_url, resolve: &get_empty/3)

    @desc "Get main app child template assigns"
    field :main_child_template_assigns, type: :main_child_template_assigns do
      arg(:route, non_null(:get_main_child_template_assigns))
      resolve(&get_main_child_template_assigns/3)
    end

    @desc "Get main app template assigns"
    field(
      :main_app_template_assigns,
      type: :main_app_template_assigns,
      resolve: &get_empty/3
    )
  end

  defp get_empty(_, _, _), do: {:ok, %{}}

  defp get_main_child_template_assigns(_, %{route: %{action: :shift_new}}, _) do
    {:ok, ShiftController.new_offline_template_assigns()}
  end

  defp get_main_child_template_assigns(_, %{route: %{action: :index_new}}, _) do
    {:ok, IndexController.index_offline_template_assigns()}
  end
end
