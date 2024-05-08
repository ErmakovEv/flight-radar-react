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
  flightStatusObj: Partial<IFflightStatus>;
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
        width: 300,
        maxHeight: '70vh',
        flexDirection: 'column',
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'info.main' }} />}
          className="accordion-summary"
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'background.default',
            color: 'info.light',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="panel-header">
            <div className="panel-header__first-level">
              <Box
                sx={{
                  display: 'inline',
                  mr: 3,
                  p: '1px',
                  borderRadius: '3px',
                  backgroundColor: 'primary.main',
                }}
              >
                {flightStatusObj?.identification?.callsign || 'N/A'}
              </Box>
              <span className="flight-number">
                {flightStatusObj?.identification?.number?.default || 'N/A'}
              </span>
              <span className="aircraft-icao">
                {flightStatusObj?.aircraft?.model?.code || 0}
              </span>
            </div>
            <div className="panel-header__second-level">
              <span className="aviacompany">
                {flightStatusObj?.airline?.name}
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: 'background.default', padding: 1 }}
          className="accordion-details"
        >
          <div className="panel-img">
            <img
              src={
                flightStatusObj?.aircraft?.images?.large
                  ? flightStatusObj?.aircraft?.images.large[0].src
                  : ''
              }
              alt="aircraftImg"
              className="img"
            />
          </div>
          <div className="panel-shedule">
            <Paper
              sx={{
                backgroundColor: 'background.default',
              }}
            >
              <Grid container>
                <Grid item xs>
                  <div className="airport-icao">
                    {flightStatusObj?.airport?.origin?.code?.iata || 0}
                  </div>
                  <div className="airport-city">
                    {flightStatusObj.airport?.origin?.position?.region?.city ||
                      'N/A'}
                  </div>
                  <div className="airport-time">
                    {flightStatusObj.airport?.origin?.timezone?.offsetHours ||
                      'N/A'}
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
                    {flightStatusObj.airport?.destination?.code?.iata || 0}
                  </div>
                  <div className="airport-city">
                    {flightStatusObj.airport?.destination?.position?.region
                      ?.city || 'N/A'}
                  </div>
                  <div className="airport-time">
                    {flightStatusObj.airport?.destination?.timezone
                      ?.offsetHours || 'N/A'}
                  </div>
                </Grid>
              </Grid>
              <Divider className="devider-hor" />
              <Grid container>
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">
                    {timeConvert(
                      flightStatusObj.airport?.origin?.timezone?.offset || 0,
                      flightStatusObj.time?.scheduled?.departure || 0
                    )}
                  </span>
                </Grid>
                <Divider orientation="vertical" flexItem className="devider" />
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">
                    {timeConvert(
                      flightStatusObj.airport?.destination?.timezone?.offset ||
                        0,
                      flightStatusObj.time?.scheduled?.arrival || 0
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
                      flightStatusObj.airport?.origin?.timezone?.offset || 0,
                      flightStatusObj.time?.real?.departure || 0
                    )}
                  </span>
                </Grid>
                <Divider orientation="vertical" flexItem className="devider" />
                <Grid item xs>
                  <span className="time-tipe">ESTIMATED</span>
                  <span className="time-value">
                    {timeConvert(
                      flightStatusObj.airport?.destination?.timezone?.offset ||
                        0,
                      flightStatusObj.time?.estimated?.arrival || 0
                    )}
                  </span>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <Paper
            sx={{
              backgroundColor: 'background.default',
              // color: 'var(--main-text-color)',
            }}
          >
            <div className="panel-timeline-container">
              <Box className="timeline" style={{ background: '#215f7b' }}>
                <Box
                  className="progress"
                  style={{
                    width: `${getPositionProgressIcon(
                      flightStatusObj.time?.estimated?.arrival || 0,
                      flightStatusObj.time?.real?.departure || 0
                    )}%`,
                    backgroundColor: '#239fd8',
                  }}
                >
                  <AirplanemodeActiveIcon
                    className="progress-icon"
                    sx={{
                      left: `${
                        getPositionProgressIcon(
                          flightStatusObj.time?.estimated?.arrival || 0,
                          flightStatusObj.time?.real?.departure || 0
                        ) - 5
                      }%`,
                      color: 'info.light',
                    }}
                  />
                </Box>
              </Box>
            </div>
          </Paper>

          <Accordion
            sx={{
              padding: 0,
              marginTop: '10px',
              backgroundColor: 'background.default',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'info.main' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                color: 'var(--main-text-color)',
              }}
            >
              <AirplaneTicketIcon sx={{ color: 'primary.main' }} />
              <span className="panel-information__summary_name">
                More {flightStatusObj.identification?.callsign || 'N/A'}
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
              backgroundColor: 'background.default',
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
                    color: 'info.light',
                  }}
                />
              </Grid>
              <Divider orientation="vertical" flexItem className="devider" />
              <Grid item xs>
                <Grid container direction="column" alignItems="stretch">
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <Typography className="param">AIRCRAFT TYPE</Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj.aircraft?.model?.text || 'N/A'}
                    </Typography>
                    <Typography className="param">REGISTRATION</Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj.aircraft?.registration || 'N/A'}
                    </Typography>
                    {/* <Typography className="param">COUNTRY OF REG.</Typography> */}
                  </Grid>
                  <Divider className="devider-hor" />
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <Typography className="param">CALIBRATED ALT.</Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj?.dataFlight
                        ? flightStatusObj?.dataFlight[4]
                        : 0}
                      ft
                    </Typography>
                    <Typography className="param">TRACK</Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj.dataFlight
                        ? flightStatusObj.dataFlight[3]
                        : 0}
                      °
                    </Typography>
                    <Typography className="param">GROUND SPEED </Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj.dataFlight
                        ? flightStatusObj.dataFlight[5]
                        : 0}
                      kts
                    </Typography>
                  </Grid>
                  <Divider className="devider-hor" />
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <Typography className="param">
                      ICAO 24-BIT ADDRESS
                    </Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj.dataFlight
                        ? flightStatusObj.dataFlight[0]
                        : 0}
                    </Typography>
                    <Typography className="param">LATITUDE</Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj.dataFlight
                        ? flightStatusObj.dataFlight[1]
                        : 0}
                    </Typography>
                    <Typography className="param">LONGITUDE</Typography>
                    <Typography
                      className="value"
                      sx={{ color: 'secondary.main' }}
                    >
                      {flightStatusObj.dataFlight
                        ? flightStatusObj.dataFlight[2]
                        : 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <div className="panel-footer">
            <div>
              <RemoveRedEyeIcon sx={{ color: 'info.light' }} />
            </div>
            <div>
              <ShareIcon sx={{ color: 'info.light' }} />
            </div>
            <div>
              <MoreHorizIcon sx={{ color: 'info.light' }} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default FlightInfoPanel;
