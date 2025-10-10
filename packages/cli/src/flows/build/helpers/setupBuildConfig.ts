import { TDeskofyConfigSchema } from '@deskofy/config';
import { CliOptions, MacOsTargetName } from 'electron-builder';

import {
  returnArchitecture,
  returnPlatform,
} from '../../../helpers/returnPlatform';
import { normalizePathArrayAndCheck } from '../../../utils/normalizePathArrayAndCheck';

const setupBuildConfig = async (payload: {
  target: string;
  projectConfig: TDeskofyConfigSchema;
  appDir: string;
  outputDir: string;
  resourcesDir: string;
}): Promise<CliOptions> => {
  const currentPlatform = returnPlatform();

  return Promise.resolve({
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
        name: payload.projectConfig.name,
        version: payload.projectConfig.version,
        main: 'index.js',
      },
      ...(currentPlatform === 'windows' && {
        win: {
          icon:
            normalizePathArrayAndCheck(payload.projectConfig.icons.windows) ??
            undefined,
          target: returnArchitecture(payload.target),
        },
      }),
      ...(currentPlatform === 'mac' && {
        mac: {
          icon:
            normalizePathArrayAndCheck(payload.projectConfig.icons.mac) ?? null,
          target: returnArchitecture(payload.target) as MacOsTargetName,
          type:
            payload.projectConfig.environment === 'development'
              ? 'development'
              : 'distribution',
        },
      }),
      ...(currentPlatform === 'linux' && {
        linux: {
          icon:
            normalizePathArrayAndCheck(payload.projectConfig.icons.linux) ??
            undefined,
          target: returnArchitecture(payload.target),
        },
      }),
      asar: true,
      electronVersion: '38.1.1',
    },
  });
};

export { setupBuildConfig };
