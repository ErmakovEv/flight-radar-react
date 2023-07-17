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
  FormLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../hooks/redux';
import { AirportCoord, mapStyleList } from '../../utils/constants';
import { setProfile } from '../../api/auth/requests';

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
  const [radioMapStyle, setMapStyle] = useState(userProfile?.mapType);

  const requestsHandler = async () => {};

  const handleChangeAirport = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioAirport((event.target as HTMLInputElement).value);
  };

  const handleChangeMapStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMapStyle(+(event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    requestsHandler();
  }, []);

  const airportList = Object.keys(AirportCoord);

  const requestNewSettings = (newGeoPos: string, newMapType: number) => {
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
        <Box
          sx={{ ...style, width: 350, backgroundColor: 'var(--main-bg-color)' }}
        >
          <Typography sx={{ mb: 3, color: 'var(--main-color)' }}>
            User Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    sx={{ color: 'var(--icao-bg-color)' }}
                  >
                    Home Airport
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
                              color: 'var(--icao-bg-color)',
                              '&.Mui-checked': {
                                color: 'var(--icao-bg-color)',
                              },
                            }}
                          />
                        }
                        label={item}
                        sx={{
                          color: 'var(--icao-bg-color)',
                          '&.Mui-checked': {
                            color: 'var(--icao-bg-color)',
                          },
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    sx={{ color: 'var(--icao-bg-color)' }}
                  >
                    Card Style
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
                              color: 'var(--icao-bg-color)',
                              '&.Mui-checked': {
                                color: 'var(--icao-bg-color)',
                              },
                            }}
                          />
                        }
                        label={item[0]}
                        sx={{
                          color: 'var(--icao-bg-color)',
                          '&.Mui-checked': {
                            color: 'var(--icao-bg-color)',
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
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => {
              requestNewSettings(radioAirport || '', radioMapStyle || 0);
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
