import gql from "graphql-tag";

export const offlineTokenFragment = gql`
  fragment OfflineTokenFragment on OfflineToken {
    id
    _id
    value
    schemaType
  }
`;

export default offlineTokenFragment;
