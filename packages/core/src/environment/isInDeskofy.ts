const isInDeskofy = (): boolean => {
  if (
    typeof window !== 'undefined' &&
    (window as any).deskofyElectron?.isElectron
  ) {
    return true;
  }

  if (typeof process !== 'undefined' && process.versions?.electron) {
    return true;
  }

  return false;
};

export { isInDeskofy };
