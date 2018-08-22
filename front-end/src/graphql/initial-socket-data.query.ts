import gql from "graphql-tag";

import { shiftFragment } from "./shift.fragment";
import { newShiftUrlFragment } from "./new-shift-url.fragment";
import { offlineTokenFragment } from "./offline-token.fragment";
import { metaFragment } from "./meta.fragment";

export const InitialSocketData = gql`
  query GetInitialSocketData(
    $shift: GetShiftInput
    $getMetasInput: GetMetaInput
  ) {
    shifts(shift: $shift) {
      ...ShiftFragment
    }

    newShiftUrl {
      ...NewShiftUrlFragment
    }

    offlineToken {
      ...OfflineTokenFragment
    }

    metas(meta: $getMetasInput) {
      ...MetaFragment
    }
  }

  ${shiftFragment}
  ${newShiftUrlFragment}
  ${offlineTokenFragment}
  ${metaFragment}
`;

export default InitialSocketData;
