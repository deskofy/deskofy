type TDeskofyNetwork = {
  getStatus: () => Promise<{ online: boolean }>;
  onStatusChange: (callback: (status: { online: boolean }) => void) => void;
  speedTest: () => Promise<any>;
};

const deskofyNetwork = (): TDeskofyNetwork | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofyNetwork) {
    return undefined;
  }

  const ctx = (window as any).deskofyNetwork;

  return {
    getStatus: ctx.getStatus,
    onStatusChange: (callback): void => {
      ctx.onStatusChange((_event: any, status: any) => callback(status));
    },
    speedTest: ctx.speedTest,
  };
};

export type { TDeskofyNetwork };
export { deskofyNetwork };
