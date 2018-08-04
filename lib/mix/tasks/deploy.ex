defmodule Mix.Tasks.Deploy do
  use Mix.Task

  @shortdoc ~S"""
  Tasks for managing deployment of burda app
  """

  @moduledoc ~S"""
  Task for deploying to heroku
  """

  @static_folder Path.expand("priv/static")
  @static_folder_permanent Path.expand("priv/static.permanent")
  @front_end_folder Path.expand("front-end")
  @node "node"
  @webpack_cmd_args [
    "node_modules/webpack/bin/webpack.js",
    "--config",
    "config/webpacks/prod.js"
  ]

  @spec run([<<_::32>>, ...]) :: :ok
  def run(args), do: deploy(args)

  defp deploy(["local"]) do
    :ok = reset_static_folder()
    :ok = process_static_files()
  end

  defp deploy(["reset"]), do: reset_static_folder()

  defp deploy(["prod"]) do
    :ok = reset_static_folder()
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
        ~s("POOL_SIZE=2 mix ecto.migrate")
      ])

    :ok = run_cmd("git", ["checkout", "dev"])
    :ok = run_cmd("git", ["merge", "master"])
    :ok = reset_static_folder()
    :ok = run_cmd("git", ["add", "."])
    :ok = run_cmd("git", ["commit", "-m", "Static folder reset"])
  end

  defp reset_static_folder do
    case File.exists?(@static_folder) do
      true -> File.rm_rf!(@static_folder)
      _ -> :ok
    end

    File.mkdir_p!(@static_folder)
    File.cp_r!(@static_folder_permanent, @static_folder)
    :ok
  end

  defp process_static_files do
    :ok = run_cmd(@node, @webpack_cmd_args, cd: @front_end_folder)
    Mix.Task.run("phx.digest")
    :ok
  end

  # defp run_cmd(command), do: run_cmd(command, [], [])
  defp run_cmd(command, args), do: run_cmd(command, args, [])

  defp run_cmd(command, args, opts) do
    {cmd, status} = System.cmd(command, args, opts)

    Mix.shell().info(cmd)

    case status do
      0 ->
        :ok

      status ->
        raise "#{cmd} failed: #{status}"
    end
  end
end
