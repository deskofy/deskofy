const normalizePathArray = (path: string[] | undefined): string | undefined => {
  if (!Array.isArray(path)) {
    return undefined;
  }

  if (path.length <= 0) {
    return undefined;
  }

  let segmentsToCombine: string[] = [];

  path.forEach((segment: string) =>
    segment.trim().length > 0 ? segmentsToCombine.push(segment) : null,
  );

  if (segmentsToCombine.length <= 0) {
    return undefined;
  }

  return path.join(...segmentsToCombine);
};

export { normalizePathArray };
