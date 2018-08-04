defmodule BurdaWeb.IndexController do
  use Phoenix.Controller

  # alias BurdaWeb.Schema
  # alias BurdaWeb.Query.Shift, as: Query
  alias Burda.Shift.Api

  @page_js "routes/index.js"

  plug(:assign_defaults)

  def index(conn, _),
    do:
      render(
        conn,
        "index.html",
        all_shifts: Api.list_by_date()
      )

  def assign_defaults(conn, _),
    do:
      merge_assigns(
        conn,
        page_js: @page_js,
        current_month:
          Timex.now()
          |> Timex.format!("{Mshort}/{YYYY}")
      )

  # defp run_query(query, opts \\ []) do
  #   {:ok, result} = Absinthe.run(query, Schema, opts)
  #   result
  # end
end
