import React, { FC, useState } from 'react';
import { useInterval } from 'react-use';

const Ellipsis: FC = () => {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(count + 1);
  }, 500);
  return <>{'.'.repeat(count % 4)}</>;
};

export default Ellipsis;
