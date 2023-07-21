import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Polygon,
  Tooltip,
  Popup,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import CustomZoom from '../CustomZoom/CustomZoom';
import getIcon from '../../utils/iconCreater';
import AirportsList from '../AirportList/AirportList';
import FlightMarker from '../FlightMarker/FlightMarker';
import CustomDrawer from '../CustomDrawer/CustomDrawer';
import { mapStyleList } from '../../utils/constants';
import { fetchLayers } from '../../api/mapLayer/requests';
import { ILayerReq } from '../../api/mapLayer/types';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import { MyMapComponentProps, MapLayerProps } from './Map.type';

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
  aircraftMap,
  aircraftMapHandler,
  getZoneCoord,
  getSelectedFlights,
  panelViewHandler,
  drawerState,
  drawerCloseHandler,
  viewInPanelDrawerHandler,
  flightStatusObjArray,
}: MapLayerProps) {
  const markerSelectHandler = async (id: string) => {
    const aircraft = aircraftMap.get(id);
    if (aircraft) {
      if (aircraft.isSelected === false) {
        panelViewHandler(id);
      }
      aircraft.isSelected = !aircraft.isSelected;
      aircraftMap.delete(id);
      const newArr = new Map([...aircraftMap]);
      newArr.set(id, aircraft);
      aircraftMapHandler(newArr);
    }
  };
  const [mapLayers, setMapLayers] = useState<ILayerReq[]>([]);

  const userProfile = useAppSelector((state) => state.auth.profileData.profile);

  const mapLayerHandler = async () => {
    const res = await fetchLayers();
    const newMapLayerArr = res.data.map(
      (item: {
        createdAt: string;
        id: number;
        mapLayerCoord: string[][];
        name: string;
        updatedAt: string;
      }) => {
        const { id, mapLayerCoord, name } = item;
        return { mapLayerCoord, name, id };
      }
    );
    setMapLayers(newMapLayerArr);
  };

  useEffect(() => {
    mapLayerHandler();
  }, []);

  return (
    <MapContainer
      center={center as LatLngExpression}
      zoom={12}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={mapStyleList[userProfile?.mapType || 0][1]}
      />
      {[...aircraftMap]?.map((aircraft) => {
        const icon = getIcon(
          aircraft[1].data[8],
          aircraft[1].data[3],
          aircraft[1].isSelected
        );
        return (
          <FlightMarker
            aircraft={aircraft}
            handler={markerSelectHandler}
            icon={icon}
            key={aircraft[0]}
          />
        );
      })}
      <AirportsList />

      <MyMapComponent callback={getZoneCoord} />
      <CustomZoom home={center} />
      <CustomDrawer
        state={drawerState}
        closeHandler={drawerCloseHandler}
        viewInPanelHandler={viewInPanelDrawerHandler}
        flightStatusObjArray={flightStatusObjArray}
      />
      {mapLayers.length
        ? mapLayers.map((layer) => {
            const intArr = layer.mapLayerCoord[0].map((strArr) => {
              if (typeof strArr !== 'number')
                return strArr.map((str) => +str).reverse();
              return null;
            });
            return (
              <Polygon
                pathOptions={{ color: 'red' }}
                positions={intArr as LatLngExpression[]}
                key={layer.id}
              >
                <Popup>{layer.name}</Popup>
              </Polygon>
            );
          })
        : null}
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
