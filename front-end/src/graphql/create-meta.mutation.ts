import gql from "graphql-tag";

export const createMeta = gql`
  mutation CreateMeta($meta: CreateMetaInput!) {
    meta(meta: $meta) {
      id
    }
  }
`;

export default createMeta;
