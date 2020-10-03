import React, { CSSProperties, FC, ReactElement } from 'react';
import '../../public/static/base.css';

function StylingContainer(style: CSSProperties): FC {
  return function Container({ children }): ReactElement {
    return <div style={style}>{children}</div>;
  };
}

export const PageDiv = StylingContainer({
  display: 'block',
  marginLeft: '25%',
  marginRight: '25%',
  justifyContent: 'center',
});

export const VideoDiv = StylingContainer({
  marginTop: 50,
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const DescDiv = StylingContainer({
  fontFamily: 'Sans-Serif',
  textAlign: 'left',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});
