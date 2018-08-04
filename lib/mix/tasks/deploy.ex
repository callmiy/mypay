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

  def run(_args) do
    invoke_webpack()
  end

  defp invoke_webpack do
    case File.exists?(@static_folder) do
      true -> File.rm_rf!(@static_folder)
      _ -> :ok
    end

    File.mkdir_p!(@static_folder)
    File.cp_r!(@static_folder_permanent, @static_folder)

    :ok = run_cmd(@node, @webpack_cmd_args, cd: @front_end_folder)
    Mix.Task.run("phx.digest")
    :ok = run_cmd("git", ["checkout", "dev"])
    :ok = run_cmd("git", ["add", "."])
    :ok = run_cmd("git", ["commit", "-m", "Production build"])

    :ok = run_cmd("git", ["checkout", "master"])
    :ok = run_cmd("git", ["merge", "dev"])
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
