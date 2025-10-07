import { TDeskofyConfigSchema } from '@deskofy/config';
import path from 'path';

const normalizeToPaths = (
  runningDir: string,
  value: string | string[] | string[][] | undefined,
): string[] => {
  if (!value) {
    return [];
  }

  const joinAndFilter = (segments: string[]): string | null => {
    const filtered = segments.filter((s) => s.trim().length > 0);

    return filtered.length > 0 ? path.join(runningDir, ...filtered) : null;
  };

  if (typeof value === 'string') {
    return value.trim().length > 0 ? [path.join(runningDir, value)] : [];
  }

  if (Array.isArray(value) && value.length > 0) {
    if (value.every((v) => typeof v === 'string')) {
      const joined = joinAndFilter(value as string[]);
      return joined ? [joined] : [];
    }

    if (value.every((v) => Array.isArray(v))) {
      return (value as string[][])
        .map(joinAndFilter)
        .filter((v): v is string => v !== null);
    }
  }

  return [];
};

const extractExternalFiles = async (
  runningDir: string,
  config: TDeskofyConfigSchema,
): Promise<string[]> => {
  const filePaths: string[] = [];

  const collect = (
    ...paths: (string | string[] | string[][] | undefined)[]
  ): string[] => paths.flatMap((p) => normalizeToPaths(runningDir, p));

  filePaths.push(
    ...collect(
      config.icons.mac,
      config.icons.windows,
      config.icons.linux,
      config.htmlPages.splashScreen,
      config.htmlPages.offline,
      config.htmlPages.httpNotAllowed,
      config.plugins,
      config.rendererPlugins,
    ),
  );

  return filePaths;
};

export { extractExternalFiles };
