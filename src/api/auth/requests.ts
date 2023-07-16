import { AxiosPromise } from 'axios';
import Endpoints from '../endpoints';
// eslint-disable-next-line import/no-cycle
import axiosInstance from '../instanceAxios';
import { ILoginReq, ILoginRes, IProfileRes, ISettingsRes } from './types';

export const login = (params: ILoginReq): AxiosPromise<ILoginRes> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const logout = (): AxiosPromise =>
  axiosInstance.get(Endpoints.AUTH.LOGOUT);

export const fetchProfile = (): AxiosPromise<IProfileRes> =>
  axiosInstance.get(Endpoints.AUTH.PROFILE);

export const refreshToken = (): AxiosPromise<ILoginRes> =>
  axiosInstance.get(Endpoints.AUTH.REFRECH);

export const setProfile = (
  params: ISettingsRes,
  email: string
): AxiosPromise<IProfileRes> =>
  axiosInstance.post(`${Endpoints.AUTH.SETPROFILE}/${email}`, params);
