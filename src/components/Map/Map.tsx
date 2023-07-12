import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvent,
  useMap,
  Polyline,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import { flights, flightStatus } from '../../api/proxy/requests';

import CustomZoom from '../CustomZoom/CustomZoom';

import getIcon from '../../utils/iconCreater';
import AirportCoord from '../../utils/constants';
import AirportsList from '../AirportList/AirportList';

import {
  MyMapComponentProps,
  MapLayerProps,
  IMarkerData,
  IFflightStatus,
  ITrail,
} from './Map.type';

import { IFlightInfoData } from '../../api/proxy/types';

function MyMapComponent({ callback }: MyMapComponentProps) {
  const myMap = useMapEvent('moveend', () => {
    const topLeft = myMap.getBounds().getNorthWest();
    const bottomRight = myMap.getBounds().getSouthEast();
    callback([topLeft.lat, bottomRight.lat, topLeft.lng, bottomRight.lng]);
  });

  return null;
}

function MapLayer({
  center,
  zone,
  callback,
  callback2,
  callback3,
}: MapLayerProps) {
  const [aircraftArr, setAircraftArr] = useState<Map<string, IMarkerData>>(
    new Map()
  );

  const trailHandler = async (
    isSelected: boolean | undefined,
    id: string,
    resultSelectedFlightsArr: IFflightStatus[],
    dataFlight: IFlightInfoData
  ) => {
    if (isSelected) {
      const flightStatusInfo = await flightStatus(id);
      resultSelectedFlightsArr.push({
        id,
        aicraft: flightStatusInfo.data.aircraft,
        airlane: flightStatusInfo.data.airline,
        airport: flightStatusInfo.data.airport,
        airspace: flightStatusInfo.data.airspace,
        availability: flightStatusInfo.data.availability,
        ems: flightStatusInfo.data.ems,
        firstTimestamp: flightStatusInfo.data.firstTimestamp,
        identification: flightStatusInfo.data.identification,
        time: flightStatusInfo.data.time,
        dataFlight,
      });
      return flightStatusInfo.data.trail.map((obj: ITrail) => [
        obj.lat,
        obj.lng,
      ]);
    }
    return null;
  };

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const res = await flights(zone);
      const resultSelectedFlightsArr: IFflightStatus[] = [];
      const resultArrFlightInfoData: Map<string, IMarkerData> = new Map();
      const promises = Object.entries(res.data).map(async ([key, value]) => {
        const lastDataAircraft = aircraftArr.get(key);
        if (typeof value !== 'number') {
          const trail = await trailHandler(
            lastDataAircraft?.isSelected,
            key,
            resultSelectedFlightsArr,
            value
          );
          const newObj: IMarkerData = {
            data: value,
            isSelected: lastDataAircraft?.isSelected || false,
            trail,
          };
          resultArrFlightInfoData.set(key, newObj);
        }
      });
      await Promise.all(promises);
      callback2(resultSelectedFlightsArr);
      setAircraftArr(resultArrFlightInfoData);
    }, 5000);
    return () => {
      clearInterval(intervalID);
    };
  }, [aircraftArr, zone]);

  const markerSelectHandler = async (id: string) => {
    const aircraft = aircraftArr.get(id);
    if (aircraft) {
      if (aircraft.isSelected === false) callback3(id);
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
      zoomControl={false}
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
      <AirportsList />

      <MyMapComponent callback={callback} />
      <CustomZoom home={center} />
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
