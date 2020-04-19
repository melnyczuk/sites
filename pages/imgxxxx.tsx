import React, { FC, CSSProperties } from 'react';
import { useAsync } from 'react-use';

import Loader from '../components/Loader';
import '../public/static/base.css';

const ENDPOINT = 'https://imgxxxx.herokuapp.com/link';

const {
  innerHeight = 0,
  innerWidth = 0,
  location: { reload } = { reload: null },
// eslint-disable-next-line no-undef
} = (typeof window !== 'undefined') ? window : {};

const ratio = 0.6;

const style: CSSProperties = {
  display: 'block',
  fontFamily: 'initial',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  width: innerWidth * ratio,
  height: innerHeight * ratio,
  padding: innerWidth * (1.0 - ratio) * 0.5,
  paddingTop: innerHeight * (1.0 - ratio) * 0.2,
};

const fetchData = async (): Promise<string> => {
  // eslint-disable-next-line no-undef
  const resp = await fetch(ENDPOINT);
  return await resp.text();
};

const imgxxxx: FC = () => {
  const { loading, error, value } = useAsync(fetchData);

  if (error) {
    reload();
  }

  return loading
    ? (<Loader />)
    : (
      <video
        autoPlay
        style={style}
        onEnded={() => reload()}
        onStalled={() => reload()}
      >
        <source src={value} />
      </video>
    );
};

export default imgxxxx;
