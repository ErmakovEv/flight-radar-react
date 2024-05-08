import { Alert, AlertTitle } from '@mui/material/';
import Snackbar from '@mui/material/Snackbar';

export type CustomSnuckbarProps = {
  type: 'info' | 'success' | 'error';
  message: string;
  handleClose: () => void;
  isOpen: boolean;
};

function CustomSnuckbar({
  type,
  message,
  handleClose,
  isOpen,
}: CustomSnuckbarProps) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => handleClose()}
    >
      <Alert severity={type}>
        <AlertTitle>{type}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnuckbar;
