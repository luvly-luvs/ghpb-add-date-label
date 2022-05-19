import { info, setFailed } from '@actions/core';
//import { ProjectFieldsQueryResult } from './types';
import { getAuthenticatedOctokit } from './utils';

export type ActionArgs = Record<string, string> & {
  appId: string;
  installationId: string;
  privateKey: string;
  projectId: string;
  fieldName: string;
};

export enum ActionErrors {
  MissingInput = 'Missing Input',
}

const action = async (args: ActionArgs) => {
  try {
    for (const arg in args) {
      if (arg === '') {
        throw new Error(`${ActionErrors.MissingInput} [${arg}]`);
      }
    }

    const { projectId, fieldName, ...authArgs } = args;
    const { graphql } = getAuthenticatedOctokit(authArgs);

    info(
      JSON.stringify(
        await graphql({
          query: `query {
            organization(login: "luvly-luvs") {
              projectsNext(first: 20) {
                nodes {
                  id
                  title
                }
              }
            }
          }`,
          headers: {
            'GraphQL-Features': 'projects_next_graphql',
          },
        })
      )
    );

    /*const projectFields = await graphql<ProjectFieldsQueryResult>({
      query: `query getProjectFields($projectId: ID!) {
        node(id: $projectId) {
          ... on ProjectNext {
            fields(first: 10) {
              nodes {
                id
                name
                settings
              }
            }
          }
        }
      }`,
      projectId,
    });

    info(JSON.stringify(projectFields));*/
  } catch (e: any) {
    setFailed(e?.message || e);
  }
};

export default action;
