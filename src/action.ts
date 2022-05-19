import { info, setFailed } from '@actions/core';
import { createAppAuth } from '@octokit/auth-app';
import { ProjectFieldsQueryResult } from './types';
import { getAuthenticatedOctokit } from './utils';

export type ActionArgs = Record<string, string> & {
  appId: string;
  installationId: string;
  clientId: string;
  clientSecret: string;
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
    const auth = createAppAuth(authArgs);
    const token = await auth({
      type: 'installation',
      installationId: authArgs.installationId,
    });
    info(JSON.stringify(token));
    const octo = getAuthenticatedOctokit(authArgs);

    const projectFields = await octo.graphql<ProjectFieldsQueryResult>({
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

    info(JSON.stringify(projectFields));
  } catch (e: any) {
    setFailed(e?.message || e);
  }
};

export default action;
