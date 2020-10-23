import React, { FC } from 'react';

import Ellipsis from '../Ellipsis';
import { Paragraph, CenterDiv } from './styles';


const Loader: FC = () => (
  <CenterDiv>
    <Paragraph>
      loading
      <Ellipsis />
    </Paragraph>
  </CenterDiv>
);

export default Loader;
