defmodule MyPayWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :mypay

  @offline_token_id :mypay
                    |> Application.get_env(:frontend)
                    |> Keyword.fetch!(:token_id)

  @offline_token_value :mypay
                       |> Application.get_env(:frontend)
                       |> Keyword.fetch!(:token_value)

  @input_hidden ~s(<input type="hidden" id="#{@offline_token_id}" value="#{@offline_token_value}" style="display: none" name="3snsaaPmwVPzy6mFtib" />)
                |> Phoenix.HTML.raw()

  socket("/socket", MyPayWeb.UserSocket)

  plug(:put_service_worker_allowed_header)

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug(
    Plug.Static,
    # from: {:app_name, "priv/app/path"},
    at: "/",
    from: :mypay,
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
    key: "_mypay_key",
    signing_salt: "AL7ymQAm"
  )

  plug(:put_offline_token)
  plug(MyPayWeb.Router)

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
end
