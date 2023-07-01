/* eslint-disable react/prop-types */
import { memo } from 'react';
import { Marker, Tooltip } from 'react-leaflet';

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
  return airports.map((airportMarker) => (
    <Marker
      key={airportMarker.iata}
      position={[airportMarker.lat, airportMarker.lon]}
    >
      <Tooltip>{airportMarker.name}</Tooltip>
    </Marker>
  ));
});

export default AirportsList;
