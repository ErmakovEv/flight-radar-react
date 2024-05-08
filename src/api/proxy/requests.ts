import { AxiosPromise } from 'axios';
import Endpoints from '../endpoints';
import axiosInstance from '../instanceAxios';
import { IFlightInfo, IShedule, IAirport, IAirports } from './types';
import { IFflightStatus } from '../../components/Map/Map.type';

export const flights = (bounds: number[]): AxiosPromise<IFlightInfo> =>
  axiosInstance.get(`${Endpoints.PROXY.FLIGHTS}/${bounds.join()}`);

export const allAirports = (): AxiosPromise<IAirports> =>
  axiosInstance.get(Endpoints.PROXY.ALLAIRPORTS);

export const airport = (airportCode: string): AxiosPromise<IAirport> => {
  return axiosInstance.get(`${Endpoints.PROXY.AIRPORT}/${airportCode}`);
};

export const flightStatus = (
  flightId: string
): AxiosPromise<IFflightStatus> => {
  return axiosInstance.get(`${Endpoints.PROXY.FLIGHTSTATUS}/${flightId}`);
};

export const shedule = (airportCode: string): AxiosPromise<IShedule> => {
  return axiosInstance.get(`${Endpoints.PROXY.SHEDULE}/${airportCode}`);
};
