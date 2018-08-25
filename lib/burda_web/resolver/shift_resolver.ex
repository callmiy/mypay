defmodule MyPayWeb.Resolver.Shift do
  alias MyPay.Shift.Api
  alias MyPayWeb.Resolver
  alias MyPay.Shift
  alias MyPay.Meta.Api, as: MetaApi

  def shifts(_root, %{shift: filter} = _args, _info),
    do: {:ok, Api.list(filter)}

  def shifts(_root, _args, _info),
    do: {:ok, Api.list()}

  def create(_root, %{shift: input}, _info) do
    case create_shift(input) do
      {:ok, %Shift{} = shift} ->
        {:ok, shift}

      {:error, changeset} ->
        {:error, Resolver.changeset_errors_to_string(changeset)}
    end
  end

  defp create_shift(%{meta_id: _} = input), do: Api.create_(input)

  defp create_shift(%{meta: meta} = input) do
    case MetaApi.create_(meta) do
      {:ok, meta_} ->
        input =
          input
          |> Map.drop([:meta])
          |> Map.put(:meta_id, meta_.id)

        case Api.create_(input) do
          {:ok, %Shift{} = shift} ->
            {:ok, shift}

          other ->
            MetaApi.delete_(meta_)
            other
        end

      other ->
        other
    end
  end

  defp create_shift(input), do: Api.create_(input)
end
