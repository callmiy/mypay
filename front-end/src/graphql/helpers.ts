import { DocumentNode } from "graphql";
import { GraphQLError } from "graphql";

import { capitalize } from "../utils/utils";

export const toRunableDocument = <TGraphQLVariables = {}>(
  document: DocumentNode,
  variables?: TGraphQLVariables
) => {
  return {
    query: document.loc && document.loc.source.body,
    variables
  };
};

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

export const htmlfyGraphQlErrors = (
  path: string,
  { errors }: { errors: GraphQLError[] }
) => {
  const prevVal = [] as string[];

  return errors
    .reduce((prev, e) => {
      if (e.path && e.path[0] === path) {
        const msg = JSON.parse(e.message);
        const html = Object.keys(msg)
          .map(
            (m: string) => `
          <div>
            <span class="error-key" >${capitalize(m)}</span>
            <span class="error-value" >${msg[m]}</span>
          </div>
        `
          )
          .join("\n");

        return [...prev, html];
      }

      return prev;
    }, prevVal)
    .join("\n");
};
