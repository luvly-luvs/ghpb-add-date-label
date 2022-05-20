import { getInput, setFailed } from '@actions/core';
import action from './action';

(async () => {
  try {
    const args = {
      fieldName: getInput('fieldName', { required: true }),
      projectId: getInput('projectId', { required: true }),
      token: getInput('token', { required: true }),
    };

    await action(args);
  } catch (e: any) {
    setFailed(e?.message || e);
  }
})();
