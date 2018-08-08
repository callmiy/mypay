import { DocumentNode } from "graphql";
import { GraphQLError } from "graphql";

export const toRunableDocument = <TGraphQLVariables = {}>(
  document: DocumentNode,
  variables?: TGraphQLVariables
) => {
  return {
    query: document.loc && document.loc.source.body,
    variables
  };
};

// {errors: Array<{
//   path: string[], message: string
// }> }

export const stringifyGraphQlErrors = (
  path: string,
  { errors }: { errors: GraphQLError[] }
) => {
  const prevVal = [] as string[];

  return errors
    .reduce((prev, e) => {
      if (e.path && e.path[0] === path) {
        return [...prev, e.message];
      }

      return prev;
    }, prevVal)
    .join(" | ");
};
