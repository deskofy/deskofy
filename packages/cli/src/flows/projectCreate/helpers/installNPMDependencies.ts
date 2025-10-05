import { exec } from 'child_process';
import util from 'util';

import { TProjectCreatePayload } from '../createCleanProject';

const execAsync = util.promisify(exec);

const installNPMDependencies = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  await execAsync('npm install', { cwd: payload.directoryToPerform });
};

export { installNPMDependencies };
