import { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { airport } from '../../api/proxy/requests';
import AirportInfo from './AirportPopup.types';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

function AirportPopup({ airportCode }: { airportCode: string }) {
  const [airportInfo, setAirportInfo] = useState<AirportInfo>();

  const airportDataHandler = async () => {
    const airportRes = await airport(airportCode);
    if (airportRes)
      setAirportInfo(airportRes.data.result.response.airport.pluginData);
  };

  useEffect(() => {
    airportDataHandler();
  }, []);

  if (airportInfo) {
    console.log(airportInfo);
  }

  // const nameAirport = airportInfo.details.name || 'N/A';

  const handleTimeOffset = (offset: number) => {
    const timestamp = Date.now();
    const currentSeconds = Math.floor(timestamp / 1000) + offset;

    return `${(Math.floor(currentSeconds / 3600) % 24)
      .toString()
      .padStart(2, '0')}:${Math.floor((currentSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0')}`;
  };

  return airportInfo ? (
    <div className="panel-airport">
      <div className="panel-airport-header">
        <div className="panel-airport-header__name">
          {airportInfo.details?.name || 'N/A'}
        </div>
        <div className="panel-airport-header__country">
          {airportInfo.details?.position?.country?.name || 'N/A'}
        </div>
        <div className="panel-airport-header__code">
          <span className="panel-airport-header__code-iata">
            {airportInfo.details?.code?.iata || 'N/A'}
          </span>{' '}
          <span className="panel-airport-header__code-icao">
            {airportInfo.details?.code?.icao || 'N/A'}
          </span>
        </div>
        <div className="panel-airport-header__time">
          {handleTimeOffset(airportInfo.details?.timezone?.offset || 0)}
        </div>
        <div className="panel-airport-header__img">
          {airportInfo.details?.airportImages?.medium?.length ? (
            <img
              src={airportInfo.details.airportImages.medium[0].src}
              alt="airportImg"
              style={{ maxWidth: '240px' }}
            />
          ) : null}
        </div>
      </div>
      <div className="panel-airport-info">
        <div className="panel-airport-info__weather">
          <Grid container>
            <Grid item xs>
              <div className="param">CONDITIONS</div>
              <div className="value">
                {airportInfo.weather?.sky?.condition?.text || 'N/A'}
              </div>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ position: 'relative' }}
              className="devider"
            />
            <Grid item xs>
              <div className="param">TEMPERATURE</div>
              <div className="value">
                {airportInfo.weather?.temp?.celsius
                  ? `${airportInfo.weather?.temp?.celsius} °C`
                  : 'N/A'}
              </div>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ position: 'relative' }}
              className="devider"
            />
            <Grid item xs>
              <div className="param">WIND</div>
              <div className="value">
                {airportInfo.weather?.wind?.direction?.degree
                  ? `${airportInfo.weather?.wind?.direction?.degree}°`
                  : 'N/A'}{' '}
                {airportInfo.weather?.wind?.speed?.kts
                  ? `${airportInfo.weather.wind.speed.kts} kts`
                  : 'N/A'}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  ) : null;
}

export default AirportPopup;
