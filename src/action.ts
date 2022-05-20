import { info, setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';

export type ActionArgs = Record<string, string> & {
  token: string;
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

    const { token } = args;
    const { graphql } = getOctokit(token);

    info(`--${token}--`);

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
