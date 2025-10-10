type TDeskofyPlugins = Record<string, any>;

const deskofyPlugins = (): TDeskofyPlugins | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofy?.plugins) {
    return undefined;
  }

  return (window as any).deskofy.plugins as TDeskofyPlugins;
};

export type { TDeskofyPlugins };

export { deskofyPlugins };
