import gql from "graphql-tag";

import { shiftFragment } from "./shift.fragment";

export const createShift = gql`
  mutation CreateShift($shift: CreateShiftInput!) {
    shift(shift: $shift) {
      ...ShiftFragment
    }
  }

  ${shiftFragment}
`;

export default createShift;
