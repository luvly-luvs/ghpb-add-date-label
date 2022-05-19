import { getInput, setFailed } from '@actions/core';
import action from './action';

(async () => {
  try {
    const args = {
      appId: getInput('appId', { required: true }),
      installationId: getInput('installationId', { required: true }),
      privateKey: getInput('privateKey', { required: true }),
      projectId: getInput('projectId', { required: true }),
      fieldName: getInput('fieldName', { required: true }),
    };

    await action(args);
  } catch (e: any) {
    setFailed(e?.message || e);
  }
})();
