/*eslint-env browser*/
import React, { FC, useState } from 'react';
import { useDeviceOrientation, useLodestone } from './hooks';

import Loader from '../../components/Loader';
import { getNeedleDiv } from './styles';

const LODESTONE_URL = 'https://192.168.2.100:7777/ratings';

const fetchOptions = {
  headers: {
    'content-type': 'application/json',
    cors: 'no-cors',
    'Access-Control-Allow-Origin': '*',
  },
};

const Compass: FC = () => {
  const { heading = 0 } = useDeviceOrientation();
  const lodestone = useLodestone(LODESTONE_URL, fetchOptions);

  if (lodestone.error) {
    console.log('error:', lodestone.error);
    return <>error: {lodestone.error.message}</>;
  }
  const NeedleDiv = getNeedleDiv(heading - lodestone.value);
  return lodestone.loading ? <Loader /> : <NeedleDiv />;
};

const CompassThing: FC = () => {
  const [geoAllowed, setGeoAllowed] = useState<boolean>(false);

  return !geoAllowed ? (
    <button onClick={(): void => setGeoAllowed(true)}>locate me</button>
  ) : (
    <Compass />
  );
};

export default CompassThing;
