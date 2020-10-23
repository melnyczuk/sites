import React, { CSSProperties, FC, ReactElement } from 'react';

export default function StylingContainer(style: CSSProperties): FC {
  return function Container({ children }): ReactElement {
    return <div style={style}>{children}</div>;
  };
}
