import path from 'path';

import { isFileExists } from './isFileExists';
import { printError } from './printLog';

const normalizePathArrayAndCheck = (
  pathToNormalize: string[] | undefined,
): string | undefined => {
  if (!Array.isArray(pathToNormalize)) {
    return undefined;
  }

  if (pathToNormalize.length <= 0) {
    return undefined;
  }

  let segmentsToCombine: string[] = [];

  pathToNormalize.forEach((segment: string) =>
    segment.trim().length > 0 ? segmentsToCombine.push(segment) : null,
  );

  if (segmentsToCombine.length <= 0) {
    return undefined;
  }

  const resolvedPath = path.join(...segmentsToCombine);
  if (!isFileExists(resolvedPath)) {
    printError('Unable to find file in ', resolvedPath);
    return undefined;
  }

  return resolvedPath;
};

export { normalizePathArrayAndCheck };
