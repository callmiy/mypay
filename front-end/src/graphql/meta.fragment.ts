import gql from "graphql-tag";

export const metaFragment = gql`
  fragment MetaFragment on Meta {
    id
    _id
    breakTimeSecs
    payPerHr
    nightSupplPayPct
    sundaySupplPayPct
    schemaType
  }
`;

export default metaFragment;
