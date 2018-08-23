import gql from "graphql-tag";

import { metaFragment } from "./meta.fragment";

export const createMeta = gql`
  mutation CreateMeta($meta: CreateMetaInput!) {
    meta(meta: $meta) {
      ...MetaFragment
    }
  }

  ${metaFragment}
`;

export default createMeta;
