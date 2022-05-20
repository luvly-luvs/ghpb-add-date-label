import { info, setFailed } from '@actions/core';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { Octokit } from '@octokit/core';

export type ActionArgs = {
  clientId: string;
  clientSecret: string;
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

    const { clientId, clientSecret } = args;
    const { graphql } = new Octokit({
      authStrategy: createOAuthAppAuth,
      auth: {
        clientType: 'oauth-app',
        clientId,
        clientSecret,
      },
    });

    info(
      JSON.stringify(
        await graphql({
          query: `query getProjects($org: String!) {
            organization(login: $org) {
              projectsNext(first: 20) {
                nodes {
                  id
                  title
                }
              }
            }
          }`,
          org: 'luvly-luvs',
        })
      )
    );
  } catch (e: any) {
    setFailed(e?.message || e);
  }
};

export default action;
