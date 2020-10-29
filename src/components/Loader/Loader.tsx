import React, { FC, useState } from 'react';
import { useInterval } from 'react-use';
import { CenterDiv, Paragraph } from './styles';

const Loader: FC = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 500);

  return (
    <CenterDiv>
      <Paragraph>
        <>loading{'.'.repeat(count % 4)}</>
      </Paragraph>
    </CenterDiv>
  );
};

export default Loader;
