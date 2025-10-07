import { buildProject } from '../flows/build/buildProject';

const buildCommand = async (
  config: string,
  architecture: string,
): Promise<void> => await buildProject(config, architecture);

export { buildCommand };
