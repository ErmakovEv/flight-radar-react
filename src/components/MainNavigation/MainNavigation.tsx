import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AppBar, Button, Toolbar, Switch, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IRootState } from '../../store/store';
import { logoutUser } from '../../store/reducers/actionCreators';
import { toggleTheme } from '../../store/reducers/themeSlice';
import './MainNavigation.css';

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#4cceac',
    '&:hover': {
      backgroundColor: alpha('#141414', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#e0e0e0',
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#4cceac',
  },
}));

function LogoButtom() {
  return (
    <Button
      color="secondary"
      sx={{ ':hover': { backgroundColor: 'secondary.light' } }}
    >
      <NavLink to="/">
        <div style={{ display: 'flex' }}>
          <GpsFixedIcon sx={{ color: 'secondary.dark' }} />
          <Typography
            color="secondary.dark"
            sx={{
              fontFamily: 'helvetica',
              ':hover': { color: 'secondary.dark' },
            }}
            className="logo"
          >
            FligthScanner
          </Typography>
        </div>
      </NavLink>
    </Button>
  );
}

function CustomButtom({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Button
      color="inherit"
      sx={{ ':hover': { backgroundColor: 'secondary.light' } }}
    >
      {isLoggedIn ? (
        <NavLink to="/dashboard">
          <Typography
            sx={{ ':hover': { color: 'secondary.dark' } }}
            color="info.dark"
          >
            Dashboard
          </Typography>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <Typography
            color="info.dark"
            sx={{ ':hover': { backgroundColor: 'secondary.light' } }}
          >
            Login
          </Typography>
        </NavLink>
      )}
    </Button>
  );
}

function MainNavigation() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <AppBar
      sx={{
        position: 'fixed',
        zIndex: 10000,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'primary.light',
        }}
      >
        <div>
          <LogoButtom />
          <CustomButtom isLoggedIn={isLoggedIn} />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 20 }}>
            <ThemeSwitch
              checked={theme.darkTheme}
              onChange={() => dispatch(toggleTheme())}
            />
            {theme.darkTheme ? (
              <DarkModeIcon sx={{ color: 'secondary.main' }} />
            ) : (
              <LightModeIcon />
            )}
          </div>
          {isLoggedIn ? (
            <Button
              // variant="outlined"
              color="inherit"
              onClick={logoutHandler}
              sx={{
                // mt: 3,
                // mb: 2,
                color: 'secondary.dark',
              }}
            >
              <ExitToAppIcon sx={{ ':hover': { color: 'secondary.light' } }} />
            </Button>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
