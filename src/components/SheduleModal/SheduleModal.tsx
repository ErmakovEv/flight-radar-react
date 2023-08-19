import { useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useAppSelector } from '../../hooks/redux';
import { shedule } from '../../api/proxy/requests';
import CustomPaginationActionsTable from '../CustomTable/CustomTable';
import ISheduleRow from './SheduleModal.types';
import './SheduleModal.css';

type SheduleModalProps = {
  closeCB: () => void;
  isOpen: boolean;
};

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  maxWidth: '80%',
  height: '70vh',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.default',
  color: 'primary.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1000,
};

function SheduleModal({ closeCB, isOpen }: SheduleModalProps) {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const [arrivalArr, setArrivalArr] = useState<Partial<ISheduleRow>[]>();
  const [departureArr, setDepartureArr] = useState<Partial<ISheduleRow>[]>();
  const [airportName, setAirportName] = useState<string>('');

  const requestsHandler = async (position: string) => {
    const req = await shedule(position);
    if (req) {
      setArrivalArr(
        req.data.result.response.airport.pluginData.schedule.arrivals.data
      );
      setDepartureArr(
        req.data.result.response.airport.pluginData.schedule.departures.data
      );
      setAirportName(req.data.result.response.airport.pluginData.details.name);
    }
  };

  useEffect(() => {
    if (userProfile?.geoPos) {
      requestsHandler(userProfile?.geoPos);
    }
  }, [userProfile?.geoPos]);

  return (
    <Modal
      open={isOpen}
      onClose={closeCB}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="model"
    >
      <Box sx={style} className="modal-details">
        <div style={{ margin: '0 auto' }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {airportName || ''}
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              margin: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1">
              <FlightLandIcon /> Arrival flights
            </Typography>
            {arrivalArr ? (
              <CustomPaginationActionsTable rows={arrivalArr} type />
            ) : null}
          </Box>
          <Box
            sx={{
              margin: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1">
              <FlightTakeoffIcon /> Departure flights
            </Typography>
            {departureArr ? (
              <CustomPaginationActionsTable rows={departureArr} type={false} />
            ) : null}
          </Box>
        </div>
      </Box>
    </Modal>
  );
}

export default SheduleModal;
