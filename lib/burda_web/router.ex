defmodule BurdaWeb.Router do
  use BurdaWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", BurdaWeb do
    pipe_through(:browser)

    get(
      "/offline-template-assigns",
      IndexController,
      :get_offline_template_assigns
    )

    get("/", IndexController, :index)
    get("/shifts/new", ShiftController, :new)
  end

  if Mix.env() == :dev do
    scope "/" do
      pipe_through(:api)

      forward(
        "/graphql",
        Absinthe.Plug.GraphiQL,
        schema: BurdaWeb.Schema,
        context: %{pubsub: BurdaWeb.Endpoint}
      )
    end
  end
end
