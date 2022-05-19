import { StrategyOptions } from '@octokit/auth-app';

export type GetAppTokenArgs = Pick<StrategyOptions, 'appId' | 'privateKey' | 'installationId'>;
