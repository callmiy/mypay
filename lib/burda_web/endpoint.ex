defmodule BurdaWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :burda

  socket("/socket", BurdaWeb.UserSocket)

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug(
    Plug.Static,
    # from: {:app_name, "priv/app/path"},
    at: "/",
    from: :burda,
    gzip: true,
    only: ~w(
        css
        fonts
        img
        images
        js
        favicon
        robots.txt
        service-worker.js
        service-worker1.js
      )
  )

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket("/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket)
    plug(Phoenix.LiveReloader)
    plug(Phoenix.CodeReloader)
  end

  plug(Plug.RequestId)
  plug(Plug.Logger)

  plug(
    Plug.Parsers,
    parsers: [
      :urlencoded,
      :multipart,
      :json,
      Absinthe.Plug.Parser
    ],
    pass: ["*/*"],
    json_decoder: Poison
  )

  plug(Plug.MethodOverride)
  plug(Plug.Head)

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug(
    Plug.Session,
    store: :cookie,
    key: "_burda_key",
    signing_salt: "AL7ymQAm"
  )

  plug(:assign_all_resources)
  plug(BurdaWeb.Router)

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  def init(_key, config) do
    if config[:load_from_system_env] do
      port = System.get_env("PORT") || raise "expected the PORT environment variable to be set"
      {:ok, Keyword.put(config, :http, [:inet6, port: port])}
    else
      {:ok, config}
    end
  end

  @doc ~S"""
    Load all all CSS and JS files for all routes so we can do offline first.
  """
  def assign_all_resources(conn, _),
    do:
      assign(
        conn,
        :resources,
        BurdaWeb.LayoutView.resources(conn.request_path)
      )
end
