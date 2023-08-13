import ISheduleRow from '../../components/SheduleModal/SheduleModal.types';
// eslint-disable-next-line import/no-cycle
import AirportInfo from '../../components/AirportPopup/AirportPopup.types';

export type IFlightInfo = {
  [key: string]: IFlightInfoData | number;
  full_count: number;
  version: number;
};

export type IFlightInfoData = [
  string,
  number,
  number,
  number,
  number,
  number,
  string,
  string,
  string,
  string,
  number,
  string,
  string,
  string,
  number,
  number,
  string,
  number,
  string,
  string?
];

export type IShedule = {
  result: {
    response: {
      airport: {
        pluginData: {
          details: {
            name: string;
          };
          schedule: {
            arrivals: {
              data: Array<ISheduleRow>;
            };
            departures: {
              data: Array<ISheduleRow>;
            };
          };
        };
      };
    };
  };
};

export type IAirport = {
  result: {
    response: {
      airport: {
        pluginData: AirportInfo;
      };
    };
  };
};

export type IAirports = {
  rows: Array<{
    alt: number;
    country: string;
    iata: string;
    icao: string;
    lat: number;
    lon: number;
    name: string;
  }>;
};
