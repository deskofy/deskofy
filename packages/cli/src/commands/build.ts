import { buildProject } from '../flows/build/buildProject';

const supportedBuildPlatforms = ['linux', 'windows', 'mac'] as const;

type TSupportedBuildPlatforms = (typeof supportedBuildPlatforms)[number];

const supportedBuildTargets: Record<TSupportedBuildPlatforms, string[]> = {
  linux: ['deb', 'rpm', 'app-image', 'flatpak', 'snap'],
  windows: ['msi', 'exe'],
  mac: ['dmg'],
};

const buildCommand = async (
  config: string,
  architecture: string,
): Promise<void> => await buildProject(config, architecture);

export type { TSupportedBuildPlatforms };

export { supportedBuildPlatforms, supportedBuildTargets, buildCommand };
