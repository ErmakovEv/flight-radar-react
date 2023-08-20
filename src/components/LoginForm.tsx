import { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser } from '../store/reducers/actionCreators';
import CustomSnuckbar from './CustomSnackbar/CustomSnackbar';

function LoginForm() {
  const [openSnuckbar, setOpenSnuckbar] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{
    type: 'info' | 'success' | 'error';
    message: string;
  }>({
    type: 'success',
    message: '',
  });

  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const dispath = useAppDispatch();

  const authData = useAppSelector((store) => store.auth.authData);

  useEffect(() => {
    if (authData.error) {
      setResponseMessage({
        type: 'error',
        message: 'нет такого пользователя!',
      });
      setOpenSnuckbar(true);
    }
  }, [authData.error, authData.isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.preventDefault();
    dispath(loginUser({ email, password }));
  };

  return (
    <>
      {openSnuckbar ? (
        <CustomSnuckbar
          type={responseMessage.type}
          message={responseMessage.message}
          handleClose={() => setOpenSnuckbar(false)}
          isOpen={openSnuckbar}
        />
      ) : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.default',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
            <LoginIcon />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassord(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: 'black',
                backgroundColor: 'secondary.main',
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default LoginForm;
