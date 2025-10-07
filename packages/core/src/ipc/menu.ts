type TDeskofyMenuItem = {
  click?: (event: KeyboardEvent) => void;
  role?:
    | 'undo'
    | 'redo'
    | 'cut'
    | 'copy'
    | 'paste'
    | 'pasteAndMatchStyle'
    | 'delete'
    | 'selectAll'
    | 'reload'
    | 'forceReload'
    | 'toggleDevTools'
    | 'resetZoom'
    | 'zoomIn'
    | 'zoomOut'
    | 'toggleSpellChecker'
    | 'togglefullscreen'
    | 'window'
    | 'minimize'
    | 'close'
    | 'help'
    | 'about'
    | 'services'
    | 'hide'
    | 'hideOthers'
    | 'unhide'
    | 'quit'
    | 'showSubstitutions'
    | 'toggleSmartQuotes'
    | 'toggleSmartDashes'
    | 'toggleTextReplacement'
    | 'startSpeaking'
    | 'stopSpeaking'
    | 'zoom'
    | 'front'
    | 'appMenu'
    | 'fileMenu'
    | 'editMenu'
    | 'viewMenu'
    | 'shareMenu'
    | 'recentDocuments'
    | 'toggleTabBar'
    | 'selectNextTab'
    | 'selectPreviousTab'
    | 'showAllTabs'
    | 'mergeAllWindows'
    | 'clearRecentDocuments'
    | 'moveTabToNewWindow'
    | 'windowMenu';
  type?:
    | 'normal'
    | 'separator'
    | 'submenu'
    | 'checkbox'
    | 'radio'
    | 'header'
    | 'palette';
  label?: string;
  sublabel?: string;
  toolTip?: string;
  accelerator?: string;
  icon?: string;
  enabled?: boolean;
  acceleratorWorksWhenHidden?: boolean;
  visible?: boolean;
  checked?: boolean;
  registerAccelerator?: boolean;
  submenu?: TDeskofyMenuItem[];
  id?: string;
  before?: string[];
  after?: string[];
  beforeGroupContaining?: string[];
  afterGroupContaining?: string[];
};

type TDeskofyMenu = {
  setDynamic: (template: TDeskofyMenuItem[]) => void;
  addDynamic: (template: TDeskofyMenuItem[]) => void;
  clearDynamic: () => void;
};

const deskofyMenu = (): TDeskofyMenu | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofyMenu) {
    return undefined;
  }

  const ctx = (window as any).deskofyMenu;

  return {
    setDynamic: ctx.setDynamic,
    addDynamic: ctx.addDynamic,
    clearDynamic: ctx.clearDynamic,
  };
};

export type { TDeskofyMenu, TDeskofyMenuItem };

export { deskofyMenu };
