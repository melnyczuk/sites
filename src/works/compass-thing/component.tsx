/*eslint-env browser*/
import React, { FC, useMemo, useState } from 'react';
import { useGeolocation } from 'react-use';

import { useDeviceOrientation, useLodestone } from './hooks';
import { BigDiv, CenterDiv, NeedleDiv } from './styles';

// eslint-disable-next-line no-undef
const LODESTONE_URL = process.env.NEXT_PUBLIC_LODESTONE_URL;

const fetchOptions = {
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const getRandomAngle = (): number => {
  return Math.random() * 360;
};

const Compass: FC = () => {
  const geo = useGeolocation();
  const alpha = useDeviceOrientation().alpha || 0;
  const [angle, setAngle] = useState(getRandomAngle());
  const lodestone = useLodestone(LODESTONE_URL, fetchOptions);

  useMemo(() => {
    if (lodestone.error) {
      setAngle(getRandomAngle());
    }

    if (lodestone.value) {
      setAngle(lodestone.value);
    }
  }, [lodestone.loading]);

  const rotation = alpha - angle;
  const transform = `rotate(${rotation}deg)`;

  return (
    <>
      <div style={{ transform }}>
        <NeedleDiv />
      </div>
      <br></br>
      {angle}
      <br></br>
      <pre>
        {JSON.stringify(geo, undefined, 2)}
      </pre>
    </>
  );
};

const CompassThing: FC = () => {
  const [geoAllowed, setGeoAllowed] = useState<boolean>(false);

  return !geoAllowed ? (
    <CenterDiv>
      <button onClick={(): void => setGeoAllowed(true)}>
        <BigDiv>locate me</BigDiv>
      </button>
    </CenterDiv>
  ) : (
    <CenterDiv>
      <Compass />
    </CenterDiv>
  );
};

export default CompassThing;
