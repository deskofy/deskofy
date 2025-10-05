import { runProjectFromConfig } from '../flows/projectRun/runProjectFromConfig';

const runCommand = (projectConfig: string | undefined): void =>
  runProjectFromConfig(projectConfig);

export { runCommand };
