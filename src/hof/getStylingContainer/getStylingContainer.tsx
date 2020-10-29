import React, { CSSProperties, FC, ReactElement } from 'react';

function getStylingContainer(style: CSSProperties): FC {
  return function Container({ children }): ReactElement {
    return <div style={style}>{children}</div>;
  };
}

export default getStylingContainer;
