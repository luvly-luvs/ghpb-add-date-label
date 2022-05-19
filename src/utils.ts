import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/core';
import { GetAppTokenArgs } from './types';

export const getAuthenticatedOctokit = (options: GetAppTokenArgs) => {
  return new Octokit({
    authStrategy: createAppAuth,
    auth: options,
  });
};
