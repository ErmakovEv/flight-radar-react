import { useState } from 'react';
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
  FormLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../hooks/redux';
import { AirportCoord, mapStyleList } from '../../utils/constants';
import { setProfile } from '../../api/auth/requests';
import CustomSnuckbar from '../CustomSnackbar/CustomSnackbar';

type SettingsModalProps = {
  openCB: () => void;
  closeCB: () => void;
  isOpen: boolean;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'var(--sec-bg-color)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'info.dark',
  bgcolor: 'primary.light',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1000,
};

function SettingsModal({ openCB, closeCB, isOpen }: SettingsModalProps) {
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const [radioAirport, setRadioAirport] = useState(userProfile?.geoPos);
  const [radioMapStyle, setMapStyle] = useState(userProfile?.mapType);

  const [responseMessage, setResponseMessage] = useState<{
    type: 'info' | 'success' | 'error';
    message: string;
  }>({
    type: 'success',
    message: '',
  });
  const [openSnuckbar, setOpenSnuckbar] = useState(false);

  const handleChangeAirport = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioAirport((event.target as HTMLInputElement).value);
  };

  const handleChangeMapStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMapStyle(+(event.target as HTMLInputElement).value);
  };

  const airportList = Object.keys(AirportCoord);

  const requestNewSettings = async (newGeoPos: string, newMapType: number) => {
    const param = {
      mapType: newMapType,
      pos: newGeoPos,
    };
    try {
      await setProfile(param, userProfile?.email || '');
      setResponseMessage({ type: 'success', message: 'Все ок! Перелогинься' });
      setOpenSnuckbar(true);
    } catch (error) {
      setResponseMessage({ type: 'error', message: 'Все плохо' });
      setOpenSnuckbar(true);
    }
  };

  return (
    <div>
      {openSnuckbar ? (
        <CustomSnuckbar
          type={responseMessage.type}
          message={responseMessage.message}
          handleClose={() => setOpenSnuckbar(false)}
          isOpen={openSnuckbar}
        />
      ) : null}
      <Modal
        open={isOpen}
        onClose={closeCB}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 350 }}>
          <Item sx={{ bgcolor: 'primary.main', mb: 3, p: 1 }}>
            <Typography sx={{ color: 'secondary.main' }}>
              User Settings
            </Typography>
          </Item>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item sx={{ bgcolor: 'primary.main' }}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    <Typography sx={{ mb: 3, color: 'secondary.main' }}>
                      Home airport
                    </Typography>
                  </FormLabel>
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
                        control={
                          <Radio
                            sx={{
                              color: 'secondary.main',
                              '&.Mui-checked': {
                                color: 'secondary.main',
                              },
                            }}
                          />
                        }
                        label={item}
                        sx={{
                          color: 'secondary.main',
                          '&.Mui-checked': {
                            color: 'secondary.main',
                          },
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ bgcolor: 'primary.main' }}>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    sx={{ color: 'secondary.main' }}
                  >
                    <Typography sx={{ mb: 3, color: 'secondary.main' }}>
                      Card Style
                    </Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={radioMapStyle}
                    onChange={handleChangeMapStyle}
                  >
                    {mapStyleList.map((item, index) => (
                      <FormControlLabel
                        key={item[1]}
                        value={index}
                        control={
                          <Radio
                            sx={{
                              color: 'secondary.main',
                              '&.Mui-checked': {
                                color: 'secondary.main',
                              },
                            }}
                          />
                        }
                        label={item[0]}
                        sx={{
                          color: 'secondary.main',
                          '&.Mui-checked': {
                            color: 'secondary.main',
                          },
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Button
            sx={{
              mt: 3,
              mb: 2,
              color: 'black',
              backgroundColor: 'secondary.main',
            }}
            variant="contained"
            onClick={async () => {
              await requestNewSettings(radioAirport || '', radioMapStyle || 0);
              closeCB();
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
