import React, { FC } from 'react';

import Ellipsis from '../Ellipsis';

const style = {
  fontFamily: 'initial',
  fontSize: '18px',
  margin: '32px',
};

const Loader: FC = () => (<p style={style}>loading<Ellipsis /></p>);

export default Loader;
