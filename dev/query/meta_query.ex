defmodule BurdaWeb.Query.Meta do
  @doc false
  def all_fields_fragment do
    name = "MetaAllFieldsFragment"

    fragment = """
      fragment #{name} on Meta {
        id
        breakTimeSecs
        payPerHr
        nightSupplPayPct
        sundaySupplPayPct

        insertedAt
        updatedAt
      }
    """

    {name, fragment}
  end

  @doc false
  def create do
    {frag_name, frag} = all_fields_fragment()

    """
    mutation CreateMeta($meta: CreateMetaInput!) {
      meta(meta: $meta) {
        ...#{frag_name}
      }
    }

    #{frag}
    """
  end
end
