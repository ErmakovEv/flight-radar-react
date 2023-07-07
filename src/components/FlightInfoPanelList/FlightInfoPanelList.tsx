import {
  AccordionSummary,
  Accordion,
  Typography,
  Box,
  AccordionDetails,
  Divider,
  Paper,
  colors,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import './FlightInfoPanelList.css';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MuiGrid from '@mui/material/Grid';
import testImg from '../../img/test-img.jpeg';

// eslint-disable-next-line import/no-named-as-default

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

interface IAircraftModel {
  code: string;
  text: string;
}

interface IAircraftImages {
  large: { src: string; link: string; copyright: string; source: string };
  medium: { src: string; link: string; copyright: string; source: string };
  thumbnails: { src: string; link: string; copyright: string; source: string };
}

interface IArcraftFlightInfo {
  age: number | null;
  countryId: number;
  hex: string;
  images: IAircraftImages;
  model: IAircraftModel;
  msn: null;
  registration: string;
}

export interface IFflightStatus {
  aicraft: IArcraftFlightInfo;
}

type FlightsStatusMapProps = {
  flightsStatusMap: Map<string, IFflightStatus>;
};

function FlightInfoPanelList({ flightsStatusMap }: FlightsStatusMapProps) {
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
              <span className="call-sign">SDM611</span>
              <span className="flight-number">SU6111</span>
              <span className="aircraft-icao">SU95</span>
            </div>
            <div className="panel-header__second-level">
              <span className="aviacompany">Rossiya</span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: 'var(--sec-bg-color)', padding: 1 }}
          className="accordion-details"
        >
          <div className="panel-img">
            <img src={testImg} alt="aircraftImg" className="img" />
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
                  <div className="airport-icao">DXB</div>
                  <div className="airport-city">Dubai</div>
                  <div className="airport-time">+04 (UTC +04:00)</div>
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
                  <div className="airport-icao">DXB</div>
                  <div className="airport-city">Dubai</div>
                  <div className="airport-time">+04(UTC +04:00)</div>
                </Grid>
              </Grid>
              <Divider className="devider-hor" />
              <Grid container>
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">6:00</span>
                  <span className="time-period">pm</span>
                </Grid>
                <Divider orientation="vertical" flexItem className="devider" />
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">6:00</span>
                  <span className="time-period">pm</span>
                </Grid>
              </Grid>
              <Divider className="devider-hor" />
              <Grid container>
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">6:00</span>
                  <span className="time-period">pm</span>
                </Grid>
                <Divider orientation="vertical" flexItem className="devider" />
                <Grid item xs>
                  <span className="time-tipe">SHEDULED</span>
                  <span className="time-value">6:00</span>
                  <span className="time-period">pm</span>
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
                <div className="progress">
                  <AirplanemodeActiveIcon className="progress-icon" />
                </div>
              </div>
              <div className="panel-timeline-info">
                <div className="panel-timeline-info__elapsed">
                  606 km, 00:49 ago
                </div>
                <div className="panel-timeline-info__remaining">
                  1,728 km, in 02:10
                </div>
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
                More <span className="value">SDM611</span> information
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
                    <div className="value">(B744) Boeing 747-4FT(F)</div>
                    <div className="param">REGISTRATION</div>
                    <div className="value">B-2476</div>
                    <div className="param">COUNTRY OF REG.</div>
                    <div className="value">Russia</div>
                  </Grid>
                  <Divider className="devider-hor" />
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <div className="param">CALIBRATED ALT.</div>
                    <div className="value">35,000 ft</div>
                    <div className="param">TRACK</div>
                    <div className="value">78°</div>
                    <div className="param">GROUND SPEED </div>
                    <div className="value">532 kts</div>
                  </Grid>
                  <Divider className="devider-hor" />
                  <Grid className="gridItem" sx={{ padding: '4px' }} item xs>
                    <div className="param">ICAO 24-BIT ADDRESS</div>
                    <div className="value">78007F</div>
                    <div className="param">LATITUDE</div>
                    <div className="value">60.59528</div>
                    <div className="param">LONGITUDE</div>
                    <div className="value">38.88935</div>
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

export default FlightInfoPanelList;
