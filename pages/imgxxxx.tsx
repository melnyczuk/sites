import React, { FC } from 'react';
import { useAsync } from 'react-use';

const fetchData = async (): Promise<string> => {
  // eslint-disable-next-line no-undef
  const resp = await fetch('http://localhost:3001/link');
  return await resp.text();
};

// eslint-disable-next-line no-undef
const reload = () => window.location.reload();

const Imgxxxx: FC = () => {
  const { loading, error, value } = useAsync(fetchData);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    reload();
  }

  return (
    <video autoPlay onEnded={reload} width="1280" height="720" >
      <source src={value} />
    </video>
  );
};

export default Imgxxxx;
