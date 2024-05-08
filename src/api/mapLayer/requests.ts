import { AxiosPromise } from 'axios';
import Endpoints from '../endpoints';

import axiosInstance from '../instanceAxios';
import { ILayerRes, ILayerReq } from './types';

export const fetchLayers = (): AxiosPromise<ILayerReq[]> =>
  axiosInstance.get(Endpoints.MAPLAYER.LAYER);

export const setLayer = (params: ILayerRes): AxiosPromise =>
  axiosInstance.post(Endpoints.MAPLAYER.LAYER, params);

export const deleteLayers = (params: { layers: number[] }): AxiosPromise =>
  axiosInstance.post(Endpoints.MAPLAYER.DELLAYERS, params);
