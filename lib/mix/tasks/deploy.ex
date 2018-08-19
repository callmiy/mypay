defmodule Mix.Tasks.Deploy do
  use Mix.Task

  @shortdoc ~S"""
  Tasks for managing deployment of burda app
  """

  alias BurdaWeb.LayoutView
  alias BurdaWeb.Offline

  @moduledoc ~S"""
  Task for deploying to heroku
  """

  @static_folder Path.expand("priv/static")
  @front_end_folder Path.expand("front-end")
  @win_cmd "cmd.exe"
  @yarn "yarn"
  @dummy_string1 "defmodule Dummy do\nend\n"
  @dummy_string2 "defmodule Dummy do\n  def dummy, do: nil\nend\n"
  @dummy_path Path.expand("lib/mix/dummy.ex")
  @static_folder_to_delete ["css", "fonts", "img", "js"]
                           |> Enum.map(&Path.expand(&1, "priv/static"))

  @spec run([<<_::32>>, ...]) :: :ok
  def run(args), do: deploy(args)

  defp deploy(["compile", "templates", "prod"]) do
    LayoutView.generate_offline_templates()

    :ok =
      run_cmd(
        @yarn,
        ["compile-handlebars-server-prod"],
        cd: @front_end_folder
      )
  end

  defp deploy(["compile", "templates", "dev"]) do
    LayoutView.generate_offline_templates()

    :ok =
      run_cmd(
        @yarn,
        ["compile-handlebars-server"],
        cd: @front_end_folder
      )
  end

  defp deploy(["local"]) do
    :ok = reset_static_folder()
    deploy(["compile", "templates", "dev"])
    :ok = process_static_files()
  end

  defp deploy(["reset"]), do: reset_static_folder()

  defp deploy(["prod"]) do
    System.put_env("MIX_ENV", "prod")

    :ok = reset_static_folder()
    deploy(["compile", "templates", "prod"])
    :ok = process_static_files()
    :ok = run_cmd("git", ["checkout", "dev"])
    :ok = run_cmd("git", ["add", "."])
    :ok = run_cmd("git", ["commit", "-m", "Production build"])

    :ok = run_cmd("git", ["checkout", "master"])
    :ok = run_cmd("git", ["merge", "dev"])

    :ok = run_cmd("git", ["push", "heroku", "master"])

    :ok =
      run_cmd("heroku", [
        "run",
        ~s(POOL_SIZE=2 mix ecto.migrate)
      ])

    :ok = run_cmd("git", ["checkout", "dev"])
    :ok = run_cmd("git", ["merge", "master"])
    :ok = reset_static_folder()
    :ok = run_cmd("git", ["add", "."])
    :ok = run_cmd("git", ["commit", "-m", "Static folder reset"])

    System.delete_env("MIX_ENV")
  end

  defp process_static_files do
    :ok = run_cmd(@yarn, ["deploy"], cd: @front_end_folder)
    Mix.Task.run("phx.digest")
    Offline.rewrite_service_worker_file()
    toggle_dummy()
    :ok
  end

  @spec toggle_dummy() :: :ok
  defp toggle_dummy do
    case File.read!(@dummy_path) == @dummy_string1 do
      true -> File.write!(@dummy_path, @dummy_string2, [:write])
      _ -> File.write!(@dummy_path, @dummy_string1, [:write])
    end
  end

  defp run_cmd(command, args), do: run_cmd(command, args, [])

  defp run_cmd(command, args, opts) do
    {os_family, _} = :os.type()

    {command, args} =
      case Atom.to_string(os_family) =~ "win" do
        true ->
          args = ["/c", command | args]
          command = @win_cmd
          {command, args}

        _ ->
          {command, args}
      end

    {cmd, status} = System.cmd(command, args, opts)

    Mix.shell().info(cmd)

    case status do
      0 ->
        :ok

      status ->
        raise "#{cmd} failed: #{status}"
    end
  end

  def reset_static_folder() do
    Enum.each(
      @static_folder_to_delete,
      &if(File.exists?(&1), do: File.rm_rf!(&1))
    )

    "cache_manifest.json"
    |> Path.expand(@static_folder)
    |> File.read!()
    |> Poison.decode!()
    |> Map.get("latest", %{})
    |> Map.values()
    |> Enum.map(&Path.expand(&1, @static_folder))
    |> Enum.filter(&File.exists?/1)
    |> Enum.concat(reset_static_folder(Path.expand(@static_folder, ""), []))
    |> Enum.each(&File.rm_rf!/1)

    :ok
  end

  def reset_static_folder(path, acc) when is_list(acc) do
    case File.dir?(path) do
      true ->
        paths =
          path
          |> File.ls!()
          |> Enum.map(&Path.expand(&1, path))

        acc =
          paths
          |> Enum.reject(&(File.dir?(&1) || Path.extname(&1) !== ".gz"))
          |> Enum.concat(acc)

        paths
        |> Enum.filter(&File.dir?/1)
        |> Enum.reduce(acc, &reset_static_folder(&1, &2))

      _ ->
        if Path.extname(path) == ".gz", do: [path | acc], else: acc
    end
  end
end
