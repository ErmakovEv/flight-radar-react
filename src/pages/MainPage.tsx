import { useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';
import MapLayer from '../components/Map/Map';
import BottomMenu from '../components/BottomMenu/BottomMenu';
import { useAppSelector } from '../hooks/redux';
import { AirportCoord } from '../utils/constants';
import FlightInfoPanel from '../components/FlightInfoPanel/FlightInfoPanel';
import {
  IFflightStatus,
  IMarkerData,
  ITrail,
} from '../components/Map/Map.type';
import SheduleModal from '../components/SheduleModal/SheduleModal';
import SettingsModal from '../components/SettingsModal/SettingsModal';
import { flights, flightStatus } from '../api/proxy/requests';
import { IFlightInfoData } from '../api/proxy/types';
import CustomSceleton from '../components/CustomSceleton/CustomSceleton';

export default function MainPage() {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);

  const airportIcao = userProfile?.geoPos as keyof typeof AirportCoord;

  const [zone, setZone] = useState(AirportCoord[airportIcao]?.zone || []);

  const [aircraftMap, setAircraftMap] = useState<Map<string, IMarkerData>>(
    new Map()
  );

  const [flightStatusObjArray, setFlightStatusObjArray] = useState<
    IFflightStatus[]
  >([]);

  // const [viewInPanel, setViewInPanel] = useState<string | undefined>('');

  const [selectedFlightID, setSelectedFlightID] = useState<string>('');

  const [flightOnPanel, setFlightOnPanel] = useState<
    IFflightStatus | undefined
  >(undefined);

  const [viewSceleton, setViewSceleton] = useState<boolean>(false);

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
        aircraft: flightStatusInfo.data.aircraft,
        airline: flightStatusInfo.data.airline,
        airport: flightStatusInfo.data.airport,
        airspace: flightStatusInfo.data.airspace,
        availability: flightStatusInfo.data.availability,
        ems: flightStatusInfo.data.ems,
        firstTimestamp: flightStatusInfo.data.firstTimestamp,
        identification: flightStatusInfo.data.identification,
        time: flightStatusInfo.data.time,
        dataFlight,
        trail: flightStatusInfo.data.trail,
      });

      return flightStatusInfo.data.trail?.map((obj: ITrail) => [
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
        const lastDataAircraft = aircraftMap.get(key);
        if (typeof value !== 'number') {
          const path = await trailHandler(
            lastDataAircraft?.isSelected,
            key,
            resultSelectedFlightsArr,
            value
          );
          const latLngData: LatLngExpression[][] | null = path as
            | LatLngExpression[][]
            | null;
          const newObj: IMarkerData = {
            data: value,
            isSelected: lastDataAircraft?.isSelected || false,
            path: latLngData,
          };
          resultArrFlightInfoData.set(key, newObj);
        }
      });
      await Promise.all(promises);
      if (selectedFlightID) {
        const displaedInPanelInfo = resultSelectedFlightsArr.find(
          (obj) => obj.id === selectedFlightID
        );
        setFlightOnPanel(displaedInPanelInfo);
        if (displaedInPanelInfo) {
          setViewSceleton(false);
        }
      }
      setFlightStatusObjArray(resultSelectedFlightsArr);
      setAircraftMap(resultArrFlightInfoData);
    }, 5000);
    return () => {
      clearInterval(intervalID);
    };
  }, [aircraftMap, setAircraftMap, selectedFlightID, zone]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [openSheduleModal, setOpenSheduleModal] = useState<boolean>(false);

  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);

  const handlerZone = (coordZone: number[]) => {
    setZone(coordZone);
  };

  const selectHandler = (id: string) => {
    const aircraft = aircraftMap.get(id);
    const newArr = new Map<string, IMarkerData>([...aircraftMap]);
    if (aircraft) {
      if (aircraft.isSelected === false) {
        aircraft.isSelected = true;
        setViewSceleton(true);
      } else {
        aircraft.isSelected = false;
      }
      newArr.set(id, aircraft);
      setAircraftMap(newArr);
    }
  };

  return (
    <>
      {viewSceleton ? <CustomSceleton /> : null}
      {flightOnPanel ? (
        <FlightInfoPanel flightStatusObj={flightOnPanel} />
      ) : null}
      <BottomMenu
        openerDarwer={(isOpen) => setIsDrawerOpen(isOpen)}
        openerSheduleModal={() => setOpenSheduleModal(true)}
        openerSettingsModal={() => setOpenSettingsModal(true)}
      />
      {userProfile?.geoPos ? (
        <>
          <SheduleModal
            closeCB={() => setOpenSheduleModal(false)}
            isOpen={openSheduleModal}
          />
          <SettingsModal
            closeCB={() => setOpenSettingsModal(false)}
            isOpen={openSettingsModal}
          />
          <MapLayer
            center={
              AirportCoord[userProfile?.geoPos as keyof typeof AirportCoord]
                .center
            }
            zone={[]}
            aircraftMap={aircraftMap}
            aircraftMapHandler={(id: string) => {
              setSelectedFlightID(id);
              selectHandler(id);
            }}
            getZoneCoord={handlerZone}
            getSelectedFlights={(flightStatusInfoArr: IFflightStatus[]) =>
              setFlightStatusObjArray(flightStatusInfoArr)
            }
            drawerState={isDrawerOpen}
            drawerCloseHandler={() => setIsDrawerOpen(false)}
            viewInPanelDrawerHandler={(id: string) => setSelectedFlightID(id)}
            flightStatusObjArray={flightStatusObjArray}
          />
        </>
      ) : null}
    </>
  );
}
