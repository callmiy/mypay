defmodule BurdaWeb.UserSocket do
  use Phoenix.Socket

  @dialyzer {:no_return, run_query: 1}

  alias BurdaWeb.Schema

  ## Channels
  channel("meta:*", BurdaWeb.MetaChannel)
  channel("shift:*", BurdaWeb.ShiftChannel)
  channel("data:*", BurdaWeb.DataChannel)

  ## Transports
  transport(
    :websocket,
    Phoenix.Transports.WebSocket,
    timeout: 45_000
  )

  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(_params, socket) do
    {:ok, socket}
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     BurdaWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil

  def run_query(%{"query" => query} = params) do
    case Absinthe.run(query, Schema, variables: params["variables"] || %{}) do
      {:ok, %{errors: errors}} ->
        {:error, %{errors: errors}}

      {:ok, %{data: data}} ->
        {:ok, data}
    end
  end
end
