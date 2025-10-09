const normalizePackageName = (input: string): string => {
  if (!input) {
    return '';
  }

  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 214);
};

export { normalizePackageName };
