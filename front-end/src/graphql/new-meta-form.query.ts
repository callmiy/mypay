import gql from "graphql-tag";

export const newMetaForm = gql`
  query GetNewMetaForm {
    newMetaForm {
      html
    }
  }
`;

export default newMetaForm;
