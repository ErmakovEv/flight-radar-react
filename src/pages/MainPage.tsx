import { createContext, useCallback, useContext, useState } from 'react';
import { LatLngBounds } from 'leaflet';
import Map from '../components/Map/Map';
import { useAppSelector } from '../hooks/redux';
import AirportCoord from '../utils/constants';

export default function MainPage() {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const airportIcao =
    (userProfile?.geoPos as keyof typeof AirportCoord) || 'ULLI';

  const [zone, setZone] = useState(AirportCoord[airportIcao].zone);

  const handler = (coordZone: number[]) => {
    setZone(coordZone);
  };

  return (
    <Map
      center={AirportCoord[airportIcao].center}
      zone={zone}
      callback={handler}
    />
  );
}
