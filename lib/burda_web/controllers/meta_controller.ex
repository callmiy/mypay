defmodule BurdaWeb.MetaController do
  use Phoenix.Controller

  plug(:put_layout, false when action in [:new])

  @new_form_css_path "components/new-meta-form.css"

  @spec new(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def new(conn, _params) do
    html = Phoenix.View.render_to_string(BurdaWeb.MetaView, "new-meta.html", [])
    tag = BurdaWeb.LayoutView.page_css(@new_form_css_path, :safe)

    json(conn, %{html: html, tag: parse_html(tag)})
  end

  defp parse_html(text) do
    tag_pattern = ~r/^<\s*([^\s]+)/
    attrs_pattern = ~r/\s+(.+=".+?")\s*/
    [_, tag] = Regex.run(tag_pattern, text)
    [_, attrs] = Regex.run(attrs_pattern, text)

    attrs =
      attrs
      |> String.split()
      |> Enum.map(fn
        string ->
          [attr, val] = String.split(string, "=")
          {attr, String.replace(val, ~s("), "")}
      end)
      |> Enum.into(%{})

    %{
      name: tag,
      attrs: attrs
    }
  end
end
