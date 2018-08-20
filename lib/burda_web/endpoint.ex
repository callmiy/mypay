defmodule BurdaWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :burda

  @offline_token_id :burda
                    |> Application.get_env(:frontend)
                    |> Keyword.fetch!(:token_id)

  @offline_token_value :burda
                       |> Application.get_env(:frontend)
                       |> Keyword.fetch!(:token_value)

  @input_hidden ~s(<input type="hidden" id="#{@offline_token_id}" value="#{@offline_token_value}" style="display: none" name="3snsaaPmwVPzy6mFtib" />)
                |> Phoenix.HTML.raw()

  @cache_static_file "priv/cache-static.js"
  @cache_static_js_request_path "/offline/cache-static.js"

  socket("/socket", BurdaWeb.UserSocket)

  plug(:put_service_worker_allowed_header)
  plug(:serve_cache_static_js)

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
        offline
        service-worker.js
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

  plug(:put_offline_token)
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
  def put_service_worker_allowed_header(conn, _),
    do: put_resp_header(conn, "Service-Worker-Allowed", "/")

  def put_offline_token(conn, _),
    do: assign(conn, :offline_token, @input_hidden)

  def serve_cache_static_js(conn, _) do
    case conn.request_path == @cache_static_js_request_path do
      false ->
        conn

      _ ->
        conn
        |> put_resp_content_type("text/javascript")
        |> send_resp(200, File.read!(@cache_static_file))
        |> halt()
    end
  end
end
