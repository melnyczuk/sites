/* eslint-disable no-undef */
import React, { FC, CSSProperties, useState } from 'react';
import { useAsync, useInterval } from 'react-use';
import '../public/static/base.css';

const ENDPOINT = 'https://imgxxxx.herokuapp.com/link';

const { innerHeight = 0, innerWidth = 0 } = (typeof window !== 'undefined') ? window : {};

const ratio = 0.6; 

const styles: Record<HTMLElement['namespaceURI'], CSSProperties> = {
  p: {
    fontFamily: 'initial',
    fontSize: '18px',
    margin: '32px',
  },
  video: {
    display: 'block',
    fontFamily: 'initial',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: innerWidth * ratio,
    height: innerHeight * ratio,
    padding: innerWidth * (1.0 - ratio) * 0.5,
    paddingTop: innerHeight * (1.0 - ratio) * 0.2,
  },
};

const reload = () => window?.location?.reload();

const fetchData = async (): Promise<string> => {
  const resp = await fetch(ENDPOINT);
  return await resp.text();
};

const Ellipsis: FC = () => {
  const [count, setCount] = useState(0);
  useInterval(() => { setCount(count + 1); }, 500);
  return <>{'.'.repeat(count % 4)}</>;
};

const Imgxxxx: FC = () => {
  const { loading, error, value } = useAsync(fetchData);

  if (loading) {
    return <p style={styles.p}>loading<Ellipsis /></p>;
  }

  if (error) {
    reload();
  }

  return (
    <video 
      autoPlay 
      style={styles.video} 
      onEnded={() => reload()} 
      onStalled={() => reload()}
    >
      <source src={value} />
    </video>
  );
};

export default Imgxxxx;
