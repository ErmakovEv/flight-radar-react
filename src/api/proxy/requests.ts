import { AxiosPromise } from 'axios';
import Endpoints from '../endpoints';
import axiosInstance from '../instanceAxios';
import { IFlightInfo } from './types';

export const flights = (bounds: number[]): AxiosPromise<IFlightInfo> =>
  axiosInstance.get(`${Endpoints.PROXY.FLIGHTS}/${bounds.join()}`);

export const allAirports = (): AxiosPromise<any> =>
  axiosInstance.get(Endpoints.PROXY.ALLAIRPORTS);

export const airport = (airportCode: string): AxiosPromise<any> => {
  return axiosInstance.get(`${Endpoints.PROXY.AIRPORT}/${airportCode}`);
};

export const flightStatus = (flightId: string): AxiosPromise<any> => {
  return axiosInstance.get(`${Endpoints.PROXY.FLIGHTSTATUS}/${flightId}`);
};
