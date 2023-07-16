import { useState, useEffect } from 'react';
import MapLayer from '../components/Map/Map';
import BottomMenu from '../components/BottomMenu/BottomMenu';
import { useAppSelector } from '../hooks/redux';
import AirportCoord from '../utils/constants';
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

export default function MainPage() {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const airportIcao =
    (userProfile?.geoPos as keyof typeof AirportCoord) || 'ULLI';

  const [zone, setZone] = useState(AirportCoord[airportIcao].zone);

  const [aircraftMap, setAircraftMap] = useState<Map<string, IMarkerData>>(
    new Map()
  );

  const [flightStatusObjArray, setFlightStatusObjArray] = useState<
    IFflightStatus[]
  >([]);

  const [viewInPanel, setViewInPanel] = useState<string>('');

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
        const lastDataAircraft = aircraftMap.get(key);
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
      setFlightStatusObjArray(resultSelectedFlightsArr);
      setAircraftMap(resultArrFlightInfoData);
    }, 5000);
    return () => {
      clearInterval(intervalID);
    };
  }, [setAircraftMap, zone]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [openSheduleModal, setOpenSheduleModal] = useState<boolean>(false);

  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);

  const handlerZone = (coordZone: number[]) => {
    setZone(coordZone);
  };

  const displaedInPanelInfo = flightStatusObjArray.find(
    (obj) => obj.id === viewInPanel
  );

  return (
    <>
      <MapLayer
        center={AirportCoord[airportIcao].center}
        zone={zone}
        aircraftMap={aircraftMap}
        aircraftMapHandler={(newMap: Map<string, IMarkerData>) =>
          setAircraftMap(newMap)
        }
        getZoneCoord={handlerZone}
        getSelectedFlights={(flightStatusInfoArr: IFflightStatus[]) =>
          setFlightStatusObjArray(flightStatusInfoArr)
        }
        panelViewHandler={(id: string) => setViewInPanel(id)}
        drawerState={isDrawerOpen}
        drawerCloseHandler={() => setIsDrawerOpen(false)}
        viewInPanelDrawerHandler={(id: string) => setViewInPanel(id)}
        flightStatusObjArray={flightStatusObjArray}
      />
      {displaedInPanelInfo ? (
        <FlightInfoPanel flightStatusObj={displaedInPanelInfo} />
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
            openCB={() => setOpenSheduleModal(true)}
            isOpen={openSheduleModal}
          />
          <SettingsModal
            closeCB={() => setOpenSettingsModal(false)}
            openCB={() => setOpenSettingsModal(true)}
            isOpen={openSettingsModal}
          />
        </>
      ) : null}
    </>
  );
}
