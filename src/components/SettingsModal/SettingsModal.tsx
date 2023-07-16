import { useEffect, useState } from 'react';
import { Modal, Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { shedule } from '../../api/proxy/requests';
import CustomPaginationActionsTable from '../CustomTable/CustomTable';

type SettingsModalProps = {
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
  // bgcolor: 'var(--main-bg-color)',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1000,
};

function SettingsModal({ openCB, closeCB, isOpen }: SettingsModalProps) {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);

  const requestsHandler = async () => {};

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
        <Box sx={style}>123</Box>
      </Modal>
    </div>
  );
}

export default SettingsModal;
