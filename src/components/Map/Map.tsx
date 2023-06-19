import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { useEffect, useState } from 'react';
import marker from './marker.png';
import {
  flights,
  allAirports,
  airport,
  flightStatus,
} from '../../api/proxy/requests';

interface IPlainData {
  0: string | null;
  1: string | null;
  2: string | null;
  3: number | null;
  4: number | null;
  5: number | null;
  6: number | null;
  7: number | null;
  8: boolean | null;
  9: number | null;
  10: number | null;
  11: number | null;
  12: number[] | null;
  13: number | null;
  14: string | null;
  15: boolean | null;
  16: number | null;
  17?: number | null;
}

function Map() {
  const [craftArr, setCraftArr] = useState<IPlainData[]>([]);
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [38, 38],
  });

  // useEffect(() => {
  //   setInterval(async () => {
  //     const res = await flights();
  //     console.log('flights', res);
  //     // const airportInfo = await airport('LED');
  //     // console.log('flightStatus', airportInfo);
  //     // const res = await fetch(
  //     //   `https://data-live.flightradar24.com/zones/fcgi/feed.js?&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=1&estimated=1&maxage=14400`
  //     //   // {
  //     //   //   headers: {
  //     //   //     Authorization: `Basic RXJtYWtvdjpFcm1ha292MjIwOA==`,
  //     //   //   },
  //     //   // }
  //     // );
  //     // const json = await res.json();
  //     // console.log(json);
  //     // setCraftArr(json.states);
  //   }, 10000);
  // }, []);

  console.log(craftArr);
  return (
    <MapContainer
      center={[55.981456, 37.413735]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {craftArr.map((craft) => (
        <Marker
          position={[craft[6] || 0, craft[5] || 0]}
          key={craft[0]}
          icon={customIcon}
        >
          <Popup>{craft[0]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
