import { useEffect, useState } from 'react';
import { Modal, Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { shedule } from '../../api/proxy/requests';
import CustomPaginationActionsTable from '../CustomTable/CustomTable';
import ISheduleRow from './SheduleModal.types';

type SheduleModalProps = {
  openCB: () => void;
  closeCB: () => void;
  isOpen: boolean;
};

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'primary.light',
  color: 'info.dark',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1000,
};

function SheduleModal({ openCB, closeCB, isOpen }: SheduleModalProps) {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const [arrivalArr, setArrivalArr] = useState<Partial<ISheduleRow>[]>();
  const [departureArr, setDepartureArr] = useState<Partial<ISheduleRow>[]>();

  const requestsHandler = async () => {
    if (userProfile?.geoPos) {
      const req = await shedule(userProfile?.geoPos);
      setArrivalArr(
        req.data.result.response.airport.pluginData.schedule.arrivals.data
      );
      setDepartureArr(
        req.data.result.response.airport.pluginData.schedule.departures.data
      );
    }
  };

  useEffect(() => {
    requestsHandler();
  }, []);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeCB}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ margin: 1 }}>
            {arrivalArr ? (
              <CustomPaginationActionsTable rows={arrivalArr} type />
            ) : null}
          </Box>
          <Box sx={{ margin: 1 }}>
            {departureArr ? (
              <CustomPaginationActionsTable rows={departureArr} type={false} />
            ) : null}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default SheduleModal;
