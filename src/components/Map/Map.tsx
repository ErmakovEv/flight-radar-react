import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { LatLngExpression } from 'leaflet';
import {
  flights,
  allAirports,
  airport,
  flightStatus,
} from '../../api/proxy/requests';
import { IFlightInfoData } from '../../api/proxy/types';
import getIcon from '../../utils/iconCreater';
import AirportCoord from '../../utils/constants';

type MapProps = {
  center: number[];
  zone: number[];
};

function Map({ center, zone }: MapProps) {
  const [aircraftArr, setAircraftArr] = useState<IFlightInfoData[]>();

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const res = await flights(zone);
      const resultArrFlightInfoData: IFlightInfoData[] = [];
      Object.entries(res.data).forEach(async ([key, value]) => {
        if (typeof value !== 'number') {
          value.push(key);
          resultArrFlightInfoData.push(value);
        }
      });
      setAircraftArr(resultArrFlightInfoData);
    }, 10000);
    return () => {
      clearInterval(intervalID);
    };
  }, [zone]);

  return (
    <MapContainer
      center={(center as LatLngExpression) || AirportCoord.ULLI.center}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {aircraftArr?.map((aircraft) => {
        const icon = getIcon(aircraft[8], aircraft[3]);
        return (
          <Marker
            position={[aircraft[1] || 0, aircraft[2] || 0]}
            key={aircraft[19]}
            icon={icon}
          >
            <Popup>{aircraft[0]}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
