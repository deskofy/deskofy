import React, { CSSProperties, JSX, ReactNode } from 'react';

const ContentAlignment = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  CENTER: 'CENTER',
  SPACE_BETWEEN: 'SPACE_BETWEEN',
  SPACE_AROUND: 'SPACE_AROUND',
  SPACE_EVENLY: 'SPACE_EVENLY',
} as const;

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
  id?: string;
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
    background: 'red',
    height: `${height}px`,
    paddingLeft: `${inlinePadding}px`,
    paddingRight: `${inlinePadding}px`,
    paddingTop: `${blockPadding}px`,
    paddingBottom: `${blockPadding}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: getJustifyContent(),
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
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
  const { isVisible = true } = props;

  if (!isVisible) {
    return <></>;
  }

  return <TitleBarContainer {...props} />;
};

TitleBarContainer.displayName = 'TitleBarContainer';

TitleBar.displayName = 'TitleBar';

export type { TContentAlignment, TComponent, TProps as TTitleBarProps };

export { ContentAlignment, TitleBar };
