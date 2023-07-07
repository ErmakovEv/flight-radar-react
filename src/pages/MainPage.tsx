import { createContext, useCallback, useContext, useState } from 'react';
import { LatLngBounds } from 'leaflet';
import { Card, CardContent, Typography, Box } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import MapLayer from '../components/Map/Map';
import { useAppSelector } from '../hooks/redux';
import AirportCoord from '../utils/constants';
import FlightInfoPanelList from '../components/FlightInfoPanelList/FlightInfoPanelList';

interface IAircraftImages {
  large: { src: string; link: string; copyright: string; source: string };
  medium: { src: string; link: string; copyright: string; source: string };
  thumbnails: { src: string; link: string; copyright: string; source: string };
}

interface IAircraftModel {
  code: string;
  text: string;
}

interface IArcraftFlightInfo {
  age: number | null;
  countryId: number;
  hex: string;
  images: IAircraftImages;
  model: IAircraftModel;
  msn: null;
  registration: string;
}

export interface IFflightStatus {
  aicraft: IArcraftFlightInfo;
}

export default function MainPage() {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const airportIcao =
    (userProfile?.geoPos as keyof typeof AirportCoord) || 'ULLI';

  const [zone, setZone] = useState(AirportCoord[airportIcao].zone);

  const [flightsStatusMap, setFlightStatusMap] = useState<
    Map<string, IFflightStatus>
  >(new Map());

  const handler = (coordZone: number[]) => {
    setZone(coordZone);
  };

  const flightsStatusMapHandler = (
    id: string,
    flightStatusInfo: IFflightStatus
  ) => {
    const newFlightsInfoMap = new Map([...flightsStatusMap]);
    newFlightsInfoMap.set(id, flightStatusInfo);
    setFlightStatusMap(newFlightsInfoMap);
  };

  return (
    <>
      {/* <MapLayer
        center={AirportCoord[airportIcao].center}
        zone={zone}
        callback={handler}
        callback2={flightsStatusMapHandler}
      /> */}
      <FlightInfoPanelList flightsStatusMap={flightsStatusMap} />
    </>
  );
}
