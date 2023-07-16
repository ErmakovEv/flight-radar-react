import { LatLngExpression } from 'leaflet';
import { IFlightInfoData } from '../../api/proxy/types';

export type MyMapComponentProps = {
  callback: (coordZone: number[]) => void;
};

export interface IAircraftModel {
  code: string;
  text: string;
}

export interface IAircraftImages {
  large: { src: string; link: string; copyright: string; source: string }[];
  medium: { src: string; link: string; copyright: string; source: string }[];
  thumbnails: {
    src: string;
    link: string;
    copyright: string;
    source: string;
  }[];
}

export interface IArcraftFlightInfo {
  age: number | null;
  countryId: number;
  hex: string;
  images: IAircraftImages;
  model: IAircraftModel;
  msn: null;
  registration: string;
}

interface ICode {
  iata: string;
  icao: string;
}

export interface IAirLineInfo {
  code: ICode;
  name: string;
  short: string;
  url: string;
}

interface ICountry {
  code: string;
  codeLong: string;
  id: number;
  name: string;
}

interface IRegion {
  city: string;
}

interface ITimezone {
  abbr: string;
  abbrName: string;
  isDst: boolean;
  name: string;
  offset: number;
  offsetHours: string;
}

interface IAirportPosition {
  altitude: number;
  country: ICountry;
  latitude: number;
  longitude: number;
  region: IRegion;
}

interface IAirport {
  name: string;
  code: ICode;
  position: IAirportPosition;
  timezone: ITimezone;
  visible: boolean;
  website: string;
}

export interface IAirportInfo {
  destination: IAirport;
  origin: IAirport;
  real?: null;
}

export interface IIdentificationInfo {
  callsign: string;
  id: string;
  number: { alternative: unknown; default: string };
  row: number;
}

interface ITime {
  arrival: number;
  departure?: number;
}

export interface ITimeInfo {
  estimated: ITime;
  historical: { delay: string; flighttime: string };
  other: { eta: number; update: number };
  real: ITime;
  scheduled: ITime;
}

export interface IFflightStatus {
  id: string;
  aicraft: IArcraftFlightInfo;
  airlane: IAirLineInfo;
  airport: IAirportInfo;
  airspace?: unknown;
  availability: string[];
  ems?: unknown;
  firstTimestamp: number;
  identification: IIdentificationInfo;
  time: ITimeInfo;
  dataFlight: IFlightInfoData;
}

export interface IMarkerData {
  data: IFlightInfoData;
  isSelected: boolean;
  trail: Array<Array<LatLngExpression>> | null;
}

export interface ITrail {
  alt: number;
  hd: number;
  lat: number;
  lng: number;
  spd: number;
  ts: number;
}

export interface IAirports {
  alt: number;
  country: string;
  iata: string;
  icao: string;
  lat: number;
  lon: number;
  name: string;
}

export type MapLayerProps = {
  center: number[];
  zone: number[];
  getZoneCoord: (coordZone: number[]) => void;
  getSelectedFlights: (flightStatusInfoArr: IFflightStatus[]) => void;
  panelViewHandler: (id: string) => void;
};
