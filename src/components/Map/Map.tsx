import { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  useMapEvent,
  Polyline,
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
import AirportsList from './AirportList';

type MapProps = {
  center: number[];
  zone: number[];
  callback: (coordZone: number[]) => void;
};

interface IMarkerData {
  data: IFlightInfoData;
  isSelected: boolean;
  trail: Array<Array<LatLngExpression>> | null;
}

type MyMapComponentProps = {
  callback: (coordZone: number[]) => void;
};

interface ITrail {
  alt: number;
  hd: number;
  lat: number;
  lng: number;
  spd: number;
  ts: number;
}

export interface IAirports {
  alt: number;
  country: string;
  iata: string;
  icao: string;
  lat: number;
  lon: number;
  name: string;
}

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

  const [airports, setAirports] = useState<IAirports[]>([]);

  const trailHandler = async (isSelected: boolean | undefined, id: string) => {
    if (isSelected) {
      const flightStatusInfo = await flightStatus(id);
      return flightStatusInfo.data.trail.map((obj: ITrail) => [
        obj.lat,
        obj.lng,
      ]);
    }
    return null;
  };

  useEffect(() => {
    allAirports()
      .then((res) => res)
      .then((res) => setAirports(res.data.rows));
  }, []);

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const res = await flights(zone);
      const resultArrFlightInfoData: Map<string, IMarkerData> = new Map();
      const promises = Object.entries(res.data).map(async ([key, value]) => {
        const lastDataAircraft = aircraftArr.get(key);
        if (typeof value !== 'number') {
          const trail = await trailHandler(lastDataAircraft?.isSelected, key);
          const newObj: IMarkerData = {
            data: value,
            isSelected: lastDataAircraft?.isSelected || false,
            trail,
          };
          resultArrFlightInfoData.set(key, newObj);
        }
      });
      await Promise.all(promises);
      setAircraftArr(resultArrFlightInfoData);
    }, 5000);
    return () => {
      clearInterval(intervalID);
    };
  }, [aircraftArr, zone]);

  const markerSelectHandler = async (id: string) => {
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
          <div key={aircraft[0]}>
            <Marker
              position={[aircraft[1].data[1] || 0, aircraft[1].data[2] || 0]}
              eventHandlers={{
                click: () => {
                  markerSelectHandler(aircraft[0]);
                },
              }}
              icon={icon}
            >
              <Tooltip>{aircraft[1].data[0]}</Tooltip>
            </Marker>
            {aircraft[1].trail ? (
              <Polyline positions={aircraft[1].trail} />
            ) : null}
          </div>
        );
      })}
      <AirportsList airports={airports} />
      <MyMapComponent callback={callback} />
    </MapContainer>
  );
}

export default MapLayer;

/*
const trailHandlerPromise = (isSelected, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const flightStatusInfo = await flightStatus(id);
      if (isSelected) {
        const trail = flightStatusInfo.data.trail.map((obj) => [obj.lat, obj.lng]);
        resolve(trail);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handlerPromise = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await flights(zone);
      const resultArrFlightInfoData = new Map();

      const promises = Object.entries(res.data).map(([key, value]) => {
        const lastDataAircraft = aircraftArr.get(key);
        if (typeof value !== 'number') {
          return trailHandlerPromise(lastDataAircraft?.isSelected, key)
            .then((trail) => {
              const newObj = {
                data: value,
                isSelected: lastDataAircraft?.isSelected || false,
                trail,
              };
              resultArrFlightInfoData.set(key, newObj);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });

      Promise.all(promises)
        .then(() => {
          resolve(resultArrFlightInfoData);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Использование
handlerPromise()
  .then((data) => {
    // Обработка данных
  })
  .catch((error) => {
    // Обработка ошибок
  });

В этом примере мы создаем новый промис с использованием конструктора Promise и используем асинхронные операции, такие как await, внутри функций обратного вызова промиса.

Метод trailHandlerPromise возвращает новый промис, который разрешается с массивом trail в случае, если isSelected истинно, или с null, если isSelected ложно.

Метод handlerPromise также возвращает новый промис. Внутри этого промиса мы выполняем асинхронные операции и используем Promise.all для ожидания разрешения всех промисов, возвращенных методом trailHandlerPromise. Затем мы разрешаем главный промис с объектом resultArrFlightInfoData, содержащим информацию о полетах.

Внешний код может использовать этот промис, вызывая метод .then для обработки успешного разрешения или .catch для обработки ошибок.

Хотя этот пример с промисами достигает той же функциональности, что и предыдущий пример с async/await, код становится более громоздким и сложным для чтения. async/await обеспечивает более простой и понятный син


*/
