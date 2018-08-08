import { DocumentNode } from "graphql";

export const toRunableDocument = <TGraphQLVariables = {}>(
  document: DocumentNode,
  variables?: TGraphQLVariables
) => {
  return {
    query: document.loc && document.loc.source.body,
    variables
  };
};
