const getDeskofyContext = (): 'main' | 'renderer' | 'browser' | 'node' => {
  if (typeof process !== 'undefined' && process.versions?.electron) {
    if ((process as any).type === 'renderer') {
      return 'renderer';
    }

    return 'main';
  }

  if (
    typeof window !== 'undefined' &&
    (window as any).deskofyElectron?.isElectron
  ) {
    return 'renderer';
  }

  if (typeof window !== 'undefined') {
    return 'browser';
  }

  return 'node';
};

export { getDeskofyContext };
