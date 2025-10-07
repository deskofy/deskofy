type TDeskofyWindow = {
  minimize: () => void;
  maximize: () => void;
  unmaximize: () => void;
  close: () => void;
  toggleFullScreen: () => void;
  focus: () => void;
  open: (url?: string, config?: any) => void;
  getBounds: () => any;
  setBounds: (bounds: any) => void;
  isMaximized: (callback: (event: any, state: boolean) => void) => any;
};

const deskofyWindow = (): TDeskofyWindow | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofyWindow) {
    return undefined;
  }

  const winCtx = (window as any).deskofyWindow;

  return {
    minimize: winCtx.minimize,
    maximize: winCtx.maximize,
    unmaximize: winCtx.unmaximize,
    close: winCtx.close,
    toggleFullScreen: winCtx.toggleFullScreen,
    focus: winCtx.focus,
    open: winCtx.open,
    getBounds: winCtx.getBounds,
    setBounds: winCtx.setBounds,
    isMaximized: winCtx.isMaximized,
  };
};

export type { TDeskofyWindow };
export { deskofyWindow };
