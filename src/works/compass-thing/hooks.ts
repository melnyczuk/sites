/*eslint-env browser*/
import Axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import {
  useAsync,
  useAsyncRetry,
  useGeolocation,
  useInterval,
} from 'react-use';
import { AsyncState } from 'react-use/lib/useAsync';

export interface DeviceOrientationState {
  absolute: number | null;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  heading: number | null;
}

const defaultState: DeviceOrientationState = {
  absolute: null,
  alpha: null,
  beta: null,
  gamma: null,
  heading: null,
};

export const useDeviceOrientation = (
  initialState: DeviceOrientationState = defaultState
): DeviceOrientationState => {
  const [state, setState] = useState<DeviceOrientationState>(initialState);

  useEffect(() => {
    const handler = (event): void => {
      const { absolute, alpha, beta, gamma } = event;
      const heading = getCompassHeading({ alpha, beta, gamma });
      setState({ absolute, alpha, beta, gamma, heading });
    };

    window.addEventListener('deviceorientation', handler);

    return (): void => {
      window.removeEventListener('deviceorientation', handler);
    };
  }, []);

  return state;
};

export const useLodestone = (
  url: string,
  opts: AxiosRequestConfig
): AsyncState<number> => {
  const geo = useGeolocation();

  const task = useAsync(async (): Promise<string> => {
    if (geo.latitude && geo.longitude) {
      const { latitude: lat, longitude: lng } = geo;
      const response = await Axios.post(url, { lat, lng }, opts);
      console.log('task', response);
      return response.data;
    }
  }, [geo.latitude, geo.longitude]);

  const angle = useAsyncRetry<string>(
    async (): Promise<string> => {
      console.log('geo', geo);
      console.log('task', task);
      if (task.value) {
        const response = await Axios.get(`${url}/${task.value}`, opts);
        console.log('angle', response);
        return response.data;
      }
    }
  );

  const noGeo = geo.loading === false && !geo.latitude && !geo.longitude;

  const angleReady = !!angle.value && angle.value !== 'PENDING';

  const stopPolling = noGeo || angleReady;

  useInterval(angle.retry, stopPolling ? null : 2000);

  if (task.loading || angle.loading || !stopPolling) {
    return { loading: true };
  }

  if (task.error || angle.error || noGeo) {
    return {
      loading: false,
      error:
        task.error || angle.error || new Error('no geolocation data available'),
    };
  }

  return {
    loading: false,
    value: parseFloat(angle.value),
  };
};

// https://stackoverflow.com/questions/18112729/calculate-compass-heading-from-deviceorientation-event-api
function getCompassHeading({ alpha, beta, gamma }): number {
  // Convert degrees to radians
  const alphaRad = alpha * (Math.PI / 180);
  const betaRad = beta * (Math.PI / 180);
  const gammaRad = gamma * (Math.PI / 180);

  // Calculate equation components
  const cA = Math.cos(alphaRad);
  const sA = Math.sin(alphaRad);
  // const cB = Math.cos(betaRad);
  const sB = Math.sin(betaRad);
  const cG = Math.cos(gammaRad);
  const sG = Math.sin(gammaRad);

  // Calculate A, B, C rotation components
  const rA = -cA * sG - sA * sB * cG;
  const rB = -sA * sG + cA * sB * cG;
  // const rC = - cB * cG;

  // Calculate compass heading
  let compassHeading = Math.atan(rA / rB);

  // Convert from half unit circle to whole unit circle
  if (rB < 0) {
    compassHeading += Math.PI;
  } else if (rA < 0) {
    compassHeading += 2 * Math.PI;
  }

  // Convert radians to degrees
  compassHeading *= 180 / Math.PI;

  return compassHeading;
}
