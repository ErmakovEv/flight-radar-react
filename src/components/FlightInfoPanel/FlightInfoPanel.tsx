import {
  AccordionSummary,
  Accordion,
  Typography,
  Box,
  AccordionDetails,
  Divider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import './FlightInfoPanel.css';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MuiGrid from '@mui/material/Grid';
import { IFflightStatus } from '../Map/Map.type';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

type FlightInfoPanelProps = {
  flightStatusObj: IFflightStatus;
};

function FlightInfoPanel({ flightStatusObj }: FlightInfoPanelProps) {
  const timeConvert = (offset: number, timestamp = 0) => {
    const off = (offset * 1000) / 3600000;
    const date = new Date(timestamp * 1000);
    const hours =
      date.getHours() - 3 + off < 0
        ? 24 + date.getHours() - 3 + off
        : date.getHours() - 3 + off;
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const getPositionProgressIcon = (
    estTime: number,
    actTime?: number,
    realTime = Date.now() / 1000
  ) => {
    if (actTime) {
      const allTime = estTime - actTime;
      const xxx = estTime - realTime;
      return ((allTime - xxx) * 100) / allTime;
    }
    return 0;
  };

  return (
    <Box
      className="panel"
      sx={{
        bgcolor: 'grey',
        width: 300,
        maxHeight: '70vh',
        flexDirection: 'column',
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          className="accordion-summary"
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'var(--main-bg-color)',
            color: 'var(--main-text-color)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="panel-header">
            <div className="panel-header__first-level">
              <span className="call-sign">
                {flightStatusObj.identification.callsign}
              </span>
              <span className="flight-number">
                {flightStatusObj.identification.number.default}
              </span>
              <span className="aircraft-icao">
                {flightStatusObj.aicraft.model.code || 0}
              </span>
            </div>
            <div className="panel-header__second-level">
              <span className="aviacompany">
                {flightStatusObj.airlane.name}
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: 'var(--sec-bg-color)', padding: 1 }}
          className="accordion-details"
        >
          <div className="panel-img">
            <img
              src={flightStatusObj.aicraft.images.large[0]?.src}
              alt="aircraftImg"
              className="img"
            />
          </div>
          <div className="panel-shedule">
            <Paper
              sx={{
                backgroundColor: 'var(--main-bg-color)',
                color: 'var(--main-text-color)',
              }}
            >
              <Grid container>
                <Grid item xs>
                  <div className="airport-icao">
                    {flightStatusObj.airport.origin.code.iata || 0}
                  </div>
                  <div className="airport-city">
                    {flightStatusObj.airport.origin.position.region.city}
                  </div>
                  <div className="airport-time">
                    {flightStatusObj.airport.origin.timezone.offsetHours}
                  </div>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ position: 'relative' }}
                  className="devider-top"
                >
                  <ConnectingAirportsIcon
                    fontSize="large"
                    className="icon-devider"
                    sx={{ position: 'absolute' }}
                  />
                </Divider>
                <Grid item xs>
                  <div className="airport-icao">
                    {flightStatusObj.airport.destination.code.iata || 0}
                  </div>
                  <div className="airport-city">
                    {flightStatusObj.airport.destination.position.region.city}
                  </div>
                  <div className="airport-time">
                    {flightStatusObj.airport.destination.timezone.offsetHours}
                  </div>
                </Grid>
              </Grid>
              <Divider className="devider-hor" />
              <Grid container>
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">
                    {timeConvert(
                      flightStatusObj.airport.origin.timezone.offset,
                      flightStatusObj.time.scheduled.departure
                    )}
                  </span>
                </Grid>
                <Divider orientation="vertical" flexItem className="devider" />
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">
                    {timeConvert(
                      flightStatusObj.airport.destination.timezone.offset,
                      flightStatusObj.time.scheduled.arrival
                    )}
                  </span>
                </Grid>
              </Grid>
              <Divider className="devider-hor" />
              <Grid container>
                <Grid item xs>
                  <span className="time-tipe">ACTUAL</span>
                  <span className="time-value">
                    {timeConvert(
                      flightStatusObj.airport.origin.timezone.offset,
                      flightStatusObj.time.real.departure
                    )}
                  </span>
                </Grid>
                <Divider orientation="vertical" flexItem className="devider" />
                <Grid item xs>
                  <span className="time-tipe">ESTIMATED</span>
                  <span className="time-value">
                    {timeConvert(
                      flightStatusObj.airport.destination.timezone.offset,
                      flightStatusObj.time.estimated.arrival
                    )}
                  </span>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <Paper
            sx={{
              backgroundColor: 'var(--main-bg-color)',
              color: 'var(--main-text-color)',
            }}
          >
            <div className="panel-timeline-container">
              <div className="timeline">
                <div
                  className="progress"
                  style={{
                    width: `${getPositionProgressIcon(
                      flightStatusObj.time.estimated.arrival,
                      flightStatusObj.time.real.departure
                    )}%`,
                  }}
                >
                  <AirplanemodeActiveIcon
                    className="progress-icon"
                    sx={{
                      left: `${
                        getPositionProgressIcon(
                          flightStatusObj.time.estimated.arrival,
                          flightStatusObj.time.real.departure
                        ) - 5
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="panel-timeline-info">
                {/* <div className="panel-timeline-info__elapsed">
                  606 km, 00:49 ago
                </div>
                <div className="panel-timeline-info__remaining">
                  1,728 km, in 02:10
                </div> */}
              </div>
            </div>
          </Paper>

          <Accordion sx={{ padding: 0, marginTop: '10px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: 'var(--main-bg-color)',
                color: 'var(--main-text-color)',
              }}
            >
              <AirplaneTicketIcon sx={{ color: 'var(--icao-bg-color)' }} />
              <span className="panel-information__summary_name">
                More{' '}
                <span className="value">
                  {flightStatusObj.identification.callsign}
                </span>{' '}
                information
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Paper
            sx={{
              backgroundColor: 'var(--main-bg-color)',
              color: 'var(--main-text-color)',
            }}
          >
            <Grid container sx={{ marginTop: '10px' }}>
              <Grid
                item
                xs={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AirplanemodeActiveIcon
                  sx={{
                    color: 'var(--main-text-color)',
                    background: 'var(--icao-bg-color)',
                    borderRadius: '50%',
                    padding: '5px',
                  }}
                />
              </Grid>
              <Divider orientation="vertical" flexItem className="devider" />
              <Grid item xs>
                <Grid container direction="column" alignItems="stretch">
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <div className="param">AIRCRAFT TYPE</div>
                    <div className="value">
                      {flightStatusObj.aicraft.model.text}
                    </div>
                    <div className="param">REGISTRATION</div>
                    <div className="value">
                      {flightStatusObj.aicraft.registration}
                    </div>
                    <div className="param">COUNTRY OF REG.</div>
                    <div className="value">
                      {/* <img src={getFlag(flightStatusObj.aicraft.countryId)} /> */}
                    </div>
                  </Grid>
                  <Divider className="devider-hor" />
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <div className="param">CALIBRATED ALT.</div>
                    <div className="value">
                      {flightStatusObj.dataFlight[4]} ft
                    </div>
                    <div className="param">TRACK</div>
                    <div className="value">
                      {flightStatusObj.dataFlight[3]}°
                    </div>
                    <div className="param">GROUND SPEED </div>
                    <div className="value">
                      {flightStatusObj.dataFlight[5]}kts
                    </div>
                  </Grid>
                  <Divider className="devider-hor" />
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <div className="param">ICAO 24-BIT ADDRESS</div>
                    <div className="value">{flightStatusObj.dataFlight[0]}</div>
                    <div className="param">LATITUDE</div>
                    <div className="value">{flightStatusObj.dataFlight[1]}</div>
                    <div className="param">LONGITUDE</div>
                    <div className="value">{flightStatusObj.dataFlight[2]}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <div className="panel-footer">
            <div>
              <RemoveRedEyeIcon sx={{ color: 'var(--icao-bg-color)' }} />
            </div>
            <div>
              <ShareIcon sx={{ color: 'var(--icao-bg-color)' }} />
            </div>
            <div>
              <MoreHorizIcon sx={{ color: 'var(--icao-bg-color)' }} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default FlightInfoPanel;
