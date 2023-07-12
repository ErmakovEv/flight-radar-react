import { useEffect, useState } from 'react';
import { airport } from '../../api/proxy/requests';
import { Box, Paper } from '@mui/material';

function AirportPopup({ airportCode }: { airportCode: string }) {
  const [airportInfo, setAirportInfo] = useState<unknown>('');

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

  return airportInfo ? (
    <div className="panel-airport">
      <div className="panel-airport-header">
        <div className="panel-airport-header__name">
          {airportInfo.details.name}
        </div>
        <div className="panel-airport-header__code">
          {airportInfo.details.code.iata} / {airportInfo.details.code.icao}
        </div>
        <div className="panel-airport-header__time">
          {airportInfo.details.timezone.abbrName}
        </div>
        <div className="panel-airport-header__img">
          <img
            src={airportInfo.details.airportImages.thumbnails[0].src}
            alt=""
          />
        </div>
      </div>
      <div className="panel-airport-info">
        <div className="panel-airport-info__weather">
          {airportInfo.weather.temp.celsius}
        </div>
      </div>
    </div>
  ) : null;

  // <div>
  //   {airportInfo ? (
  //     <img
  //       src={
  //         airportInfo.data.result.response.airport.pluginData.details
  //           .airportImages.thumbnails[0].src
  //       }
  //       alt=""
  //     />
  //   ) : (
  //     <div>123</div>
  //   )}
  // </div>
}

export default AirportPopup;
