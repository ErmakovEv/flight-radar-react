import { useState } from 'react';
import { Drawer, Box, Paper } from '@mui/material';
import MapLayer from '../components/Map/Map';
import BottomMenu from '../components/BottomMenu/BottomMenu';
import { useAppSelector } from '../hooks/redux';
import AirportCoord from '../utils/constants';
import FlightInfoPanel from '../components/FlightInfoPanel/FlightInfoPanel';
import { IFflightStatus } from '../components/Map/Map.type';
import SheduleModal from '../components/SheduleModal/SheduleModal';

export default function MainPage() {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const airportIcao =
    (userProfile?.geoPos as keyof typeof AirportCoord) || 'ULLI';

  const [zone, setZone] = useState(AirportCoord[airportIcao].zone);

  const [viewInPanel, setViewInPanel] = useState<string>('');

  const [flightStatusObjArray, setFlightStatusObjArray] = useState<
    IFflightStatus[]
  >([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

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
        getZoneCoord={handlerZone}
        getSelectedFlights={(flightStatusInfoArr: IFflightStatus[]) =>
          setFlightStatusObjArray(flightStatusInfoArr)
        }
        panelViewHandler={(id: string) => setViewInPanel(id)}
      />
      {displaedInPanelInfo ? (
        <FlightInfoPanel flightStatusObj={displaedInPanelInfo} />
      ) : null}
      <BottomMenu
        openerDarwer={(isOpen) => setIsDrawerOpen(isOpen)}
        openerModal={() => setOpenModal(true)}
      />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          width="250px"
          height="100vh"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'var(--sec-bg-color)',
          }}
        >
          {flightStatusObjArray.map((obj) => (
            <Paper
              key={obj.dataFlight[0]}
              sx={{
                backgroundColor: 'var(--main-bg-color)',
                color: 'var(--main-text-color)',
                fontFamily: 'Roboto',
                width: '90%',
                margin: '10px',
                padding: '5px',
              }}
              onClick={() => setViewInPanel(obj.id)}
            >
              <div className="panel-header">
                <div className="panel-header__first-level">
                  <span className="call-sign">
                    {obj.identification.callsign}
                  </span>
                  <span className="flight-number">
                    {obj.identification.number.default}
                  </span>
                  <span className="aircraft-icao">
                    {obj.aicraft.model.code}
                  </span>
                </div>
                <div className="panel-header__second-level">
                  <span className="aviacompany">{obj.airlane.name}</span>
                </div>
              </div>
            </Paper>
          ))}
        </Box>
      </Drawer>
      {userProfile?.geoPos ? (
        <SheduleModal
          closeCB={() => setOpenModal(false)}
          openCB={() => setOpenModal(true)}
          isOpen={openModal}
        />
      ) : null}
    </>
  );
}
