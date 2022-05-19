import { getInput, setFailed } from '@actions/core';
import * as github from '@actions/github';

(async () => {
  try {
    const token = getInput('token');
    const { context } = github;

    console.log({ token, context });
  } catch (e: any) {
    console.log(e);
    setFailed(e?.message || e);
  }
})();
