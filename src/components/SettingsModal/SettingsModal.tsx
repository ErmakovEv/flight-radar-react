import { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../hooks/redux';
import AirportCoord from '../../utils/constants';
import { setProfile } from '../../api/auth/requests';

type SettingsModalProps = {
  openCB: () => void;
  closeCB: () => void;
  isOpen: boolean;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
  const [radioAirport, setRadioAirport] = useState(userProfile?.geoPos);

  const requestsHandler = async () => {};

  const handleChangeAirport = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioAirport((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    requestsHandler();
  }, []);

  const airportList = Object.keys(AirportCoord);

  const requestNewSettings = (newGeoPos: string, newMapType = 0) => {
    const param = {
      mapType: newMapType,
      pos: newGeoPos,
    };
    setProfile(param, userProfile?.email || '');
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeCB}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 350 }}>
          <Typography sx={{ mb: 3 }}>User Settings</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>home airport</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={radioAirport}
                    onChange={handleChangeAirport}
                  >
                    {airportList.map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>map type</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => {
              requestNewSettings(radioAirport || '', userProfile?.mapType);
            }}
          >
            Apply
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default SettingsModal;
