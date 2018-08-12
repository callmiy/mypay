defmodule BurdaWeb.Query.Shift do
  alias BurdaWeb.Query.Meta, as: MetaQuery

  def all_fields_fragment do
    name = "ShiftAllFieldsFragment"

    fragment = """
      fragment #{name} on Shift {
        id
        date
        startTime
        endTime
        hoursGross
        normalHours
        nightHours
        sundayHours
        normalPay
        nightSupplPay
        sundaySupplPay
        totalPay

        insertedAt
        updatedAt
      }
    """

    {name, fragment}
  end

  def query_all do
    {frag_name, frag} = all_fields_fragment()
    {meta_frag_name, meta_frag} = MetaQuery.all_fields_fragment()

    """
    query GetAllShifts {
      shifts {
        ...#{frag_name}

        meta {
          ...#{meta_frag_name}
        }
      }
    }

    #{frag}
    #{meta_frag}
    """
  end
end
