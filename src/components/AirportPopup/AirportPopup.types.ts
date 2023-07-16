import { IAircraftImages } from '../Map/Map.type';

interface AirportInfoDetailsPosition {
  latitude: number;
  longitude: number;
  elevation: number;
  country: { code: string; id: number; name: 'string' };
}

interface AirportInfoDetailsStatsFlights {
  delayAvg: number;
  delayIndex: number;
  percentage: { delayed: number; canceled: number; trend: string };
  recent: {
    delayIndex: number;
    delayAvg: number;
    percentage: { canceled: number; delayed: number; trend: string };
    quantity: { onTime: number; delayed: number; canceled: number };
  };
  today: {
    percentage: { canceled: number; delayed: number };
    quantity: { canceled: number; delayed: number; onTime: number };
  };
  tomorrow: {
    percentage: { canceled: number };
    quantity: { canceled: number };
  };
  yesterday: {
    percentage: { delayed: number; canceled: number };
    quantity: { onTime: number; delayed: number; canceled: number };
  };
}

interface AirportInfoDetailsStats {
  arrivals: AirportInfoDetailsStatsFlights;
  departures: AirportInfoDetailsStatsFlights;
}

interface AirportInfoDetailsTimeZone {
  abbr: string;
  abbrName: string;
  isDst: boolean;
  name: string;
  offset: number;
}

interface Railway {
  length: { ft: number; m: number };
  name: string;
  surface: { code: string; name: string };
}

interface AirportInfoDetails {
  airportImages: IAircraftImages;
  code: { iata: string; icao: string };
  delayIndex: { arrivals: number; departures: 0.67 };
  name: string;
  position: AirportInfoDetailsPosition;
  stats: AirportInfoDetailsStats;
  timezone: AirportInfoDetailsTimeZone;
  url: { homepage?: string; webcam?: string; wikipedia: string };
  visibly: boolean;
}

interface Weather {
  cached: number;
  dewpoint: { celsius: number; fahrenheit: number };
  elevation: { m: number; ft: number };
  flight: { category?: unknown };
  humidity: number;
  metar: string;
  pressure: { hg: number; hpa: number };
  qnh: number;
  sky: {
    condition: { text: string };
    visibility: { km: number; mi: number; nmi: number };
  };
  temp: { celsius: number; fahrenheit: number };
  time: number;
  wind: {
    direction: { degree: number; text: string };
    speed: { kmh: number; kts: number; mph: number; text: string };
  };
}

interface AirportInfo {
  aircraftCount: {
    ground: number;
    onGround: { total: number; visible: number };
  };
  details: AirportInfoDetails;
  runways: Railway[];
  satelliteImage: string;
  satelliteImageProperties: { center: number[]; zoom: number; scale: number };
  schedule?: unknown;
  scheduledRoutesStatistics: {
    airportsServed: number;
    countriesServed: number;
    topRoute: { from: string; to: string; count: number };
    totalFlights: number;
  };
  weather: Weather;
}

export default AirportInfo;
