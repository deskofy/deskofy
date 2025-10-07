type TDeskofyVersion = {
  node: string;
  chrome: string;
  electron: string;
};

const deskofyVersion = (): TDeskofyVersion | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofyVersion) {
    return undefined;
  }

  const versionObj = (window as any).deskofyVersion;

  return {
    node:
      typeof versionObj.node === 'function'
        ? versionObj.node()
        : versionObj.node,
    chrome:
      typeof versionObj.chrome === 'function'
        ? versionObj.chrome()
        : versionObj.chrome,
    electron:
      typeof versionObj.electron === 'function'
        ? versionObj.electron()
        : versionObj.electron,
  };
};

export type { TDeskofyVersion };

export { deskofyVersion };
