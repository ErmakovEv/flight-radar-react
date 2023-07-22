import { AxiosPromise } from 'axios';
import Endpoints from '../endpoints';
// eslint-disable-next-line import/no-cycle
import axiosInstance from '../instanceAxios';
import ILayerRes from './types';

export const fetchLayers = (): AxiosPromise<any> =>
  axiosInstance.get(Endpoints.MAPLAYER.LAYER);

export const setLayer = (params: ILayerRes): AxiosPromise<any> =>
  axiosInstance.post(Endpoints.MAPLAYER.LAYER, params);

export const deleteLayers = (params: { layers: number[] }): AxiosPromise<any> =>
  axiosInstance.post(Endpoints.MAPLAYER.DELLAYERS, params);
