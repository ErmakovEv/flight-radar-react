/* eslint-disable react/prop-types */
import { memo } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAppSelector } from '../../hooks/redux';
import blueLocation from '../../img/blue-location.png';
import redLocation from '../../img/red-location.png';

export interface IAirports {
  alt: number;
  country: string;
  iata: string;
  icao: string;
  lat: number;
  lon: number;
  name: string;
}

type AirportProps = {
  airports: IAirports[];
};

const AirportsList = memo(function AirportsList({ airports }: AirportProps) {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);

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
      </Marker>
    );
  });
});

export default AirportsList;
