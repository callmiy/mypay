import gql from "graphql-tag";

import { shiftFragment } from "./shift.fragment";
import { newShiftUrlFragment } from "./new-shift-url.fragment";

export const InitialSocketData = gql`
  query GetInitialSocketData($shift: GetShiftInput) {
    shifts(shift: $shift) {
      ...ShiftFragment
    }

    newShiftUrl {
      ...NewShiftUrlFragment
    }
  }

  ${shiftFragment}
  ${newShiftUrlFragment}
`;

export default InitialSocketData;
