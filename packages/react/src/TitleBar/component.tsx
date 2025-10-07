import React, { CSSProperties, JSX, ReactNode } from 'react';

const Platform = {
  LINUX: 'LINUX',
  MAC: 'MAC',
  WINDOWS: 'WINDOWS',
} as const;

const ContentAlignment = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  CENTER: 'CENTER',
  SPACE_BETWEEN: 'SPACE_BETWEEN',
  SPACE_AROUND: 'SPACE_AROUND',
  SPACE_EVENLY: 'SPACE_EVENLY',
} as const;

type TPlatform = (typeof Platform)[keyof typeof Platform];

type TContentAlignment =
  (typeof ContentAlignment)[keyof typeof ContentAlignment];

type TComponent = {
  id?: string | number;
  component?: ReactNode | JSX.Element;
  className?: string;
  style?: CSSProperties;
  isDragable?: boolean;
  isVisible?: boolean;
};

type TProps = {
  platform?: TPlatform;
  children?: ReactNode;
  components?: TComponent[];
  contentAlignment?: TContentAlignment;
  height?: number;
  inlinePadding?: number;
  blockPadding?: number;
  className?: string;
  style?: CSSProperties;
  isDragable?: boolean;
  isVisible?: boolean;
};

const TitleBarContainer = (props: TProps): JSX.Element => {
  const {
    components = [],
    contentAlignment = ContentAlignment.SPACE_BETWEEN,
    height = 32,
    inlinePadding = 8,
    blockPadding = 0,
    className = '',
    style = {},
    isDragable = true,
  } = props;

  const getJustifyContent = (): string => {
    const alignmentMap: Record<TContentAlignment, string> = {
      LEFT: 'flex-start',
      RIGHT: 'flex-end',
      CENTER: 'center',
      SPACE_BETWEEN: 'space-between',
      SPACE_AROUND: 'space-around',
      SPACE_EVENLY: 'space-evenly',
    };
    return alignmentMap[contentAlignment];
  };

  const containerStyle: CSSProperties = {
    height: `${height}px`,
    paddingLeft: `${inlinePadding}px`,
    paddingRight: `${inlinePadding}px`,
    paddingTop: `${blockPadding}px`,
    paddingBottom: `${blockPadding}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: getJustifyContent(),
    width: '100%',
    position: 'relative',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitAppRegion: isDragable ? 'drag' : 'no-drag',
    ...style,
  };

  const visibleComponents = components.filter(
    (comp) => comp.isVisible !== false,
  );

  return (
    <div className={`title-bar__container ${className}`} style={containerStyle}>
      {visibleComponents.map((comp, index) => {
        const componentStyle: CSSProperties = {
          WebkitAppRegion: comp.isDragable === false ? 'no-drag' : undefined,
          ...comp.style,
        };

        return (
          <div
            key={comp.id ?? index}
            className={comp.className}
            style={componentStyle}
          >
            {comp.component}
          </div>
        );
      })}
    </div>
  );
};

const TitleBar = (props: TProps): JSX.Element => {
  const { isVisible = true, children } = props;

  if (!isVisible) {
    return <></>;
  }

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  };

  const titleBarStyle: CSSProperties = {
    flexShrink: 0,
  };

  const containerStyle: CSSProperties = {
    flex: 1,
    overflow: 'auto',
    position: 'relative',
  };

  return children ? (
    <div style={wrapperStyle}>
      <div style={titleBarStyle}>
        <TitleBarContainer {...props} />
      </div>
      <div style={containerStyle}>{children}</div>
    </div>
  ) : (
    <div style={titleBarStyle}>
      <TitleBarContainer {...props} />
    </div>
  );
};

TitleBarContainer.displayName = 'TitleBarContainer';

TitleBar.displayName = 'TitleBar';

export type {
  TPlatform,
  TContentAlignment,
  TComponent,
  TProps as TTitleBarProps,
};

export { Platform, ContentAlignment };

export default TitleBar;
