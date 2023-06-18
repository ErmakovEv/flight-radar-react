import { AxiosPromise } from 'axios';
import Endpoints from '../endpoints';
import axiosInstance from '../instanceAxios';

export const flights = (): AxiosPromise<any> =>
  axiosInstance.get(Endpoints.PROXY.FLIGHTS);

export const allAirports = (): AxiosPromise<any> =>
  axiosInstance.get(Endpoints.PROXY.ALLAIRPORTS);

export const airport = (airportCode: string): AxiosPromise<any> => {
  return axiosInstance.get(`${Endpoints.PROXY.AIRPORT}/${airportCode}`);
};

export const flightStatus = (flightId: string): AxiosPromise<any> => {
  return axiosInstance.get(`${Endpoints.PROXY.FLIGHTSTATUS}/${flightId}`);
};
