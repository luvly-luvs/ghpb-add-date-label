import { debug, setFailed } from '@actions/core';
import { ProjectFieldsQueryResult } from './types';
import { getAuthenticatedOctokit } from './utils';

export type ActionArgs = {
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

    const projectFields = await graphql<ProjectFieldsQueryResult>({
      query: `query {
        node(id: 1) {
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
    });

    debug(JSON.stringify(projectFields));
  } catch (e: any) {
    setFailed(e?.message || e);
  }
};

export default action;
