import { Drawer, Box, Paper, Toolbar } from '@mui/material';
import { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';
import { IFflightStatus } from '../Map/Map.type';

type CustomDrawerProps = {
  state: boolean;
  closeHandler: (state: boolean) => void;
  viewInPanelHandler: (id: string) => void;
  flightStatusObjArray: IFflightStatus[];
};

function CustomDrawer({
  state,
  closeHandler,
  viewInPanelHandler,
  flightStatusObjArray,
}: CustomDrawerProps) {
  const map = useMap();

  return (
    <Drawer anchor="right" open={state} onClose={() => closeHandler(false)}>
      <Box
        width="250px"
        height="100vh"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'primary.light',
        }}
      >
        <Toolbar />
        {flightStatusObjArray.map((obj) => {
          console.log(obj);
          return (
            <Paper
              key={obj.dataFlight[0]}
              sx={{
                backgroundColor: 'primary.light',
                fontFamily: 'Roboto',
                width: '90%',
                margin: '10px',
                padding: '5px',
              }}
              onClick={() => {
                map.setView([
                  obj.dataFlight[1],
                  obj.dataFlight[2],
                ] as LatLngExpression);
                viewInPanelHandler(obj.id);
              }}
            >
              <div className="panel-header">
                <div className="panel-header__first-level">
                  <span className="call-sign">
                    {obj.identification ? obj.identification.callsign : ''}
                  </span>
                  <span className="flight-number">
                    {obj.identification
                      ? obj.identification.number.default
                      : ''}
                  </span>
                  <span className="aircraft-icao">
                    {obj.aicraft ? obj.aicraft.model?.code : ''}
                  </span>
                </div>
                <div className="panel-header__second-level">
                  <span className="aviacompany">
                    {obj.airlane ? obj.airlane.name : ''}
                  </span>
                </div>
              </div>
            </Paper>
          );
        })}
      </Box>
    </Drawer>
  );
}

export default CustomDrawer;
