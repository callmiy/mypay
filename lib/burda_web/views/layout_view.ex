defmodule BurdaWeb.LayoutView do
  use BurdaWeb, :view

  def js_script_tag(conn) do
    path =
      if Mix.env() == :prod,
        do: static_path(conn, "/js/app.js"),
        else: "http://localhost:8080/app.js"

    raw(~s(<script src="#{path}"></script>))
  end

  def css_link_tag(conn) do
    if(
      Mix.env() == :prod,
      do:
        ~s(<link rel="stylesheet" type="text/css" href="#{static_path(conn, "/js/styles.css")}" media="screen,projection" />),
      else: ~s(<script src="http://localhost:8080/styles.js"></script>)
    )
    |> raw()
  end
end
