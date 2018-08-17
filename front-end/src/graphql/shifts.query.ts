import gql from "graphql-tag";

import { shiftFragment } from "./shift.fragment";

export const getAllShifts = gql`
  query GetAllShifts($shift: GetShiftInput) {
    shifts(shift: $shift) {
      ...ShiftFragment
    }
  }

  ${shiftFragment}
`;

export default getAllShifts;
