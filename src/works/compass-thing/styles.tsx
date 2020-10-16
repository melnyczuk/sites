import React, { CSSProperties, FC, ReactElement } from 'react';

function StylingContainer(style: CSSProperties): FC {
  return function Container({ children }): ReactElement {
    return <div style={style}>{children}</div>;
  };
}

export const getNeedleDiv = (rotation: number): ReturnType<typeof StylingContainer> =>
  StylingContainer({
    margin: '0 auto',
    width: '3px',
    height: '100px',
    border: 'solid 1px black',
    borderTop: 'solid 10px red',
    transform: `rotate(${rotation}deg)`,
  });
