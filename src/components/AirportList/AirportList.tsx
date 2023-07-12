import { memo, useState, useEffect } from 'react';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAppSelector } from '../../hooks/redux';
import blueLocation from '../../img/blue-location.png';
import redLocation from '../../img/red-location.png';
import { allAirports, airport } from '../../api/proxy/requests';
import './AirportList.css';
import AirportPopup from '../AirportPopup/AirportPopup';

export interface IAirports {
  alt: number;
  country: string;
  iata: string;
  icao: string;
  lat: number;
  lon: number;
  name: string;
}

const AirportsList = memo(function AirportsList() {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);

  const [airports, setAirports] = useState<IAirports[]>([]);

  useEffect(() => {
    allAirports()
      .then((res) => res)
      .then((res) => setAirports(res.data.rows));
  }, []);

  return airports.map((airportMarker) => {
    const airportIcon = new Icon({
      iconUrl:
        airportMarker.icao === userProfile?.geoPos ? redLocation : blueLocation,
      iconSize: [24, 24],
    });

    return (
      <Marker
        key={airportMarker.iata}
        position={[airportMarker.lat, airportMarker.lon]}
        icon={airportIcon}
      >
        <Tooltip>{airportMarker.name}</Tooltip>
        <Popup minWidth={200} className="test">
          <AirportPopup airportCode={airportMarker.iata} />
        </Popup>
      </Marker>
    );
  });
});

export default AirportsList;
