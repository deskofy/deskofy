import { TDeskofyConfigSchema } from '@deskofy/config';
import { CliOptions, MacOsTargetName } from 'electron-builder';

import { returnArchitecture } from '../../../helpers/returnArchitecture';
import { normalizePathArray } from '../../../utils/normalizePathArray';

const setupBuildConfig = async (payload: {
  architecture: string;
  projectConfig: TDeskofyConfigSchema;
  appDir: string;
  outputDir: string;
  resourcesDir: string;
}): Promise<CliOptions> =>
  Promise.resolve({
    config: {
      directories: {
        app: payload.appDir,
        output: payload.outputDir,
        buildResources: payload.resourcesDir,
      },
      files: [
        '**/*',
        'package.json',
        '!tsconfig.json',
        '!node_modules/*/{test,__tests__,tests}/**',
      ],
      extraMetadata: {
        name: payload.projectConfig.packageName,
        version: payload.projectConfig.version,
        main: 'index.js',
      },
      win: {
        icon:
          normalizePathArray(payload.projectConfig.icons.windows) ?? undefined,
        target: returnArchitecture(payload.architecture),
      },
      mac: {
        icon: normalizePathArray(payload.projectConfig.icons.mac) ?? null,
        target: returnArchitecture(payload.architecture) as MacOsTargetName,
        type:
          payload.projectConfig.environment === 'development'
            ? 'development'
            : 'distribution',
      },
      linux: {
        icon:
          normalizePathArray(payload.projectConfig.icons.windows) ?? undefined,
        target: returnArchitecture(payload.architecture),
      },
      asar: true,
      electronVersion: '38.1.1',
    },
  });

export { setupBuildConfig };
