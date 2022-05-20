import { getInput, setFailed } from '@actions/core';
import action from './action';

(async () => {
  try {
    const clientId = getInput('client_id', { required: true });
    const clientSecret = getInput('client_secret', { required: true });
    const fieldName = getInput('field_name', { required: true });
    const projectId = getInput('project_id', { required: true });

    await action({ clientId, clientSecret, fieldName, projectId });
  } catch (e: any) {
    setFailed(e?.message || e);
  }
})();
