const setupCommand = (type: string | undefined): void => {
  let isGlobal: boolean = false;

  if (type && type === 'global') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isGlobal = true;
  }
};

export { setupCommand };
