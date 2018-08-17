import gql from "graphql-tag";

export const newShiftUrlFragment = gql`
  fragment NewShiftUrlFragment on NewShiftUrl {
    _id
    url
    schemaType
  }
`;

export default newShiftUrlFragment;
