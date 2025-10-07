type TDeskofyNavigation = {
  canGoBack: () => Promise<boolean>;
  canGoForward: () => Promise<boolean>;
  goBack: () => void;
  goForward: () => void;
  cloneWindow: () => void;
};

const deskofyNavigation = (): TDeskofyNavigation | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofyNavigation) {
    return undefined;
  }

  const ctx = (window as any).deskofyNavigation;

  return {
    canGoBack: ctx.canGoBack,
    canGoForward: ctx.canGoForward,
    goBack: ctx.goBack,
    goForward: ctx.goForward,
    cloneWindow: ctx.cloneWindow,
  };
};

export type { TDeskofyNavigation };

export { deskofyNavigation };
