defmodule BurdaWeb.Meta do
  @moduledoc ~S"""
  Utilites used by MeteChannel and MetaController
  """

  alias Burda.Meta.Api
  alias BurdaWeb.MetaView
  alias BurdaWeb.LayoutView

  @new_form_css_path "components/new-meta-form.css"
  @new_form_js_path "components/new-meta-form.js"

  def new_form(conn_end_point) do
    html =
      Phoenix.View.render_to_string(
        MetaView,
        "new-meta.html",
        changeset: Api.change_(),
        conn: conn_end_point
      )

    css = LayoutView.page_css(@new_form_css_path, :safe)
    js = LayoutView.page_js(@new_form_js_path, :safe)

    %{
      html: html,
      css: parse_html(css),
      js: parse_html(js)
    }
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
          [attr, val] =
            string
            |> String.split("=")
            |> Enum.take(2)

          {attr, String.replace(val, ~s("), "")}
      end)
      |> Enum.into(%{})

    %{
      name: tag,
      attrs: attrs
    }
  end
end
