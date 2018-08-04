defmodule BurdaWeb.Resolver.Shift do
  alias Burda.Shift.Api

  def shifts(_root, _args, _info), do: {:ok, Api.list()}
end
