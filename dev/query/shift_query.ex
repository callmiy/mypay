defmodule BurdaWeb.Query.Shift do
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

    """
    query GetAllShifts {
      shifts {
        ...#{frag_name}
      }
    }

    #{frag}
    """
  end
end
