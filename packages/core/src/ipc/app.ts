type TDeskofyApp = {
  getAppUrl: () => Promise<string>;
  quit: () => void;
  restart: () => void;
  getHistory: () => Promise<
    { url: string; title: string; timestamp: number }[]
  >;
  filterHistory: (filters: {
    url?: string;
    title?: string;
  }) => Promise<{ url: string; title: string; timestamp: number }[]>;
  cleanHistory: () => void;
};

const deskofyApp = (): TDeskofyApp | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofyApp) {
    return undefined;
  }

  const appContext = (window as any).deskofyApp;

  return {
    getAppUrl: appContext.getAppUrl,
    quit: appContext.quit,
    restart: appContext.restart,
    getHistory: appContext.getHistory,
    filterHistory: appContext.filterHistory,
    cleanHistory: appContext.cleanHistory,
  };
};

export type { TDeskofyApp };

export { deskofyApp };
