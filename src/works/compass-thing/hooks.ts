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

type DeviceOrientationState = Pick<
  DeviceOrientationEvent,
  'absolute' | 'alpha' | 'beta' | 'gamma'
>;

const defaultState: DeviceOrientationState = {
  absolute: false,
  alpha: null,
  beta: null,
  gamma: null,
};

export const useDeviceOrientation = (
  initialState: DeviceOrientationState = defaultState
): DeviceOrientationState => {
  const [state, setState] = useState<DeviceOrientationState>(initialState);

  useEffect(() => {
    const handler = (event): void => {
      const { absolute, alpha, beta, gamma } = event;
      setState({ absolute, alpha, beta, gamma });
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
  opts: AxiosRequestConfig,
): AsyncState<number> => {
  const geo = useGeolocation();

  const task = useAsync(async (): Promise<string> => {
    if (geo.latitude && geo.longitude) {
      const { latitude: lat, longitude: lng } = geo;
      const response = await Axios.post(url, { lat, lng }, opts);
      const { result, error } = response.data;
      if (error) throw new Error(error);
      return result;
    }
  }, [geo.latitude, geo.longitude]);

  const angle = useAsyncRetry<string>(async (): Promise<string> => {
    if (task.value) {
      const response = await Axios.get(`${url}/${task.value}`, opts);
      const { result, error } = response.data;
      if (error) throw new Error(error);
      return result;
    }
  }, [geo.latitude, geo.longitude]);

  const noGeo = geo.loading === false && !geo.latitude && !geo.longitude;
  const stopPolling = noGeo || !!angle.value;

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
