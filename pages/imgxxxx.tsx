import React, { FC, CSSProperties, useState } from 'react';
import { useAsync, useUpdate, useInterval } from 'react-use';

const ENDPOINT = 'https://imgxxxx.herokuapp.com/link';

const styles: Record<HTMLElement['namespaceURI'], CSSProperties> = {
  p: { 
    fontSize: '18px',
    margin: '32px',
  },
  video: {
    fontFamily: 'initial',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    textAlign: 'center',
    minHeight: 200,
  },
};

const fetchData = async (): Promise<string> => {
  // eslint-disable-next-line no-undef
  const resp = await fetch(ENDPOINT);
  return await resp.text();
};

const Ellipsis: FC = () => {
  const [count, setCount] = useState(0);
  useInterval(() => { setCount(count + 1); }, 500);
  return <>{'.'.repeat(count % 4)}</>;
};

const Imgxxxx: FC = () => {
  const update = useUpdate();
  const { loading, error, value } = useAsync(fetchData);

  if (loading) {
    return <p style={styles.p}>loading<Ellipsis /></p>;
  }

  if (error) {
    update();
  }

  return (
    <video autoPlay style={styles.video} onEnded={update} width="1280" height="720" >
      <source src={value} />
    </video>
  );
};

export default Imgxxxx;
