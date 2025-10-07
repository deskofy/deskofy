import { runProjectFromConfig } from '../flows/run/runProjectFromConfig';

const runCommand = async (projectConfig: string | undefined): Promise<void> =>
  await runProjectFromConfig(projectConfig);

export { runCommand };
