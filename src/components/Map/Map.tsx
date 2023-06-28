import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { LatLngExpression, LatLngBounds } from 'leaflet';
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
  callback: (coordZone: number[]) => void;
};

interface IMarkerData {
  data: IFlightInfoData;
  isSelected: boolean;
}

type MyMapComponentProps = {
  callback: (coordZone: number[]) => void;
};

function MyMapComponent({ callback }: MyMapComponentProps) {
  const myMap = useMapEvent('moveend', () => {
    const topLeft = myMap.getBounds().getNorthWest();

    const bottomRight = myMap.getBounds().getSouthEast();

    callback([topLeft.lat, bottomRight.lat, topLeft.lng, bottomRight.lng]);
  });

  return null;
}

function MapLayer({ center, zone, callback }: MapProps) {
  const [aircraftArr, setAircraftArr] = useState<Map<string, IMarkerData>>(
    new Map()
  );

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const res = await flights(zone);
      const resultArrFlightInfoData: Map<string, IMarkerData> = new Map();
      Object.entries(res.data).forEach(async ([key, value]) => {
        const lastDataAircraft = aircraftArr.get(key);
        if (typeof value !== 'number') {
          if (lastDataAircraft) {
            resultArrFlightInfoData.set(key, {
              data: value,
              isSelected: lastDataAircraft.isSelected,
            });
          } else {
            resultArrFlightInfoData.set(key, {
              data: value,
              isSelected: false,
            });
          }
        }
      });
      setAircraftArr(resultArrFlightInfoData);
    }, 10000);
    return () => {
      clearInterval(intervalID);
    };
  }, [aircraftArr, zone]);

  const markerSelectHandler = (id: string) => {
    const aircraft = aircraftArr.get(id);
    if (aircraft) {
      aircraft.isSelected = !aircraft.isSelected;
      aircraftArr.delete(id);
      const newArr = new Map([...aircraftArr]);
      newArr.set(id, aircraft);
      setAircraftArr(newArr);
    }
  };

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
      {[...aircraftArr]?.map((aircraft) => {
        const icon = getIcon(
          aircraft[1].data[8],
          aircraft[1].data[3],
          aircraft[1].isSelected
        );
        return (
          <Marker
            position={[aircraft[1].data[1] || 0, aircraft[1].data[2] || 0]}
            key={aircraft[0]}
            eventHandlers={{
              click: () => {
                markerSelectHandler(aircraft[0]);
              },
            }}
            icon={icon}
          >
            <Tooltip>{aircraft[1].data[0]}</Tooltip>
          </Marker>
        );
      })}
      <MyMapComponent callback={callback} />
    </MapContainer>
  );
}

export default MapLayer;
