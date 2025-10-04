const versionIpcContext = {
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
};

export { versionIpcContext };
