interface IAirportInfo {
  code?: { iata: string; icao: string };
  info?: { terminal?: unknown; baggage?: unknown; gate?: unknown };
  name?: string;
  position?: {
    latitude: number;
    longitude: number;
    country: { name: string; code: string; id: number };
    region: { city: string };
  };
  timezone?: {
    name: string;
    offset: number;
    abbr: string;
    abbrName: string;
    isDst: boolean;
  };
  visible?: boolean;
}

interface ITime {
  arrival?: number;
  departure?: number;
}

export default interface ISheduleRow {
  flight: {
    aircraft: {
      model: { code: string; text: string };
      hex: string;
      registration: string;
      serialNo: string;
      images?: unknown;
    };
    airline: {
      name: string;
      code: { iata: string; icao: string };
      short: string;
    };
    airport: {
      origin: IAirportInfo;
      destination: IAirportInfo;
      real?: unknown;
    };
    identification: {
      id?: unknown;
      row: 5382712336;
      number: { alternative?: unknown; default: string };
      callsign?: unknown;
      codeshare?: unknown;
    };
    owner?: unknown;
    status: {
      live: boolean;
      text: string;
      icon?: unknown;
      estimated?: unknown;
      ambiguous?: boolean;
      generic: {
        eventTime: { utc?: unknown; local?: unknown };
        status: {
          text: string;
          type: string;
          color: string;
          diverted?: unknown;
        };
      };
    };
    time: { scheduled: ITime; real: ITime; estimated: ITime; other: ITime };
  };
}
