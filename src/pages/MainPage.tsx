import Map from '../components/Map/Map';
import { useAppSelector } from '../hooks/redux';
import AirportCoord from '../utils/constants';

export default function MainPage() {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const airportIcao =
    (userProfile?.geoPos as keyof typeof AirportCoord) || 'ULLI';

  return (
    <Map
      center={AirportCoord[airportIcao].center}
      zone={AirportCoord[airportIcao].zone}
    />
  );
}
