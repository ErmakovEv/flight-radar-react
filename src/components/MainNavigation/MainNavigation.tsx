import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IRootState } from '../../store/store';
import BigNavbar from '../BigNavbar/BigNavbar';
import SmallNavbar from '../SmallNavbar/SmallNavbar';
import './MainNavigation.css';

function LogoButtom() {
  const darkThema = useSelector((state: IRootState) => state.theme.darkTheme);

  return (
    <Button>
      <GpsFixedIcon sx={{ color: 'primary.main', marginRight: '5px' }} />
      <NavLink
        to="/"
        style={({ isActive }) => {
          return {
            // eslint-disable-next-line no-nested-ternary
            color: isActive ? '#239fd8' : darkThema ? '#d9d9d9' : '#1a1c1e',
          };
        }}
      >
        <Typography variant="subtitle2" color="inherit" className="logo">
          FligthScanner
        </Typography>
      </NavLink>
    </Button>
  );
}

function CustomButtom({ isLoggedIn }: { isLoggedIn: boolean }) {
  const darkThema = useSelector((state: IRootState) => state.theme.darkTheme);
  return (
    <Button>
      {isLoggedIn ? (
        <NavLink
          to="/dashboard"
          style={({ isActive }) => {
            return {
              // eslint-disable-next-line no-nested-ternary
              color: isActive ? '#239fd8' : darkThema ? '#d9d9d9' : '#1a1c1e',
            };
          }}
        >
          <Typography variant="subtitle2" color="inherit" className="logo">
            Dashboard
          </Typography>
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          style={({ isActive }) => {
            return {
              // eslint-disable-next-line no-nested-ternary
              color: isActive ? '#239fd8' : darkThema ? '#d9d9d9' : '#1a1c1e',
            };
          }}
        >
          <Typography variant="subtitle2" color="inherit" className="logo">
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

  const matches = useMediaQuery('(min-width:600px)');

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
          backgroundColor: 'background.default',
        }}
      >
        <div>
          <LogoButtom />
          <CustomButtom isLoggedIn={isLoggedIn} />
        </div>
        {matches ? <BigNavbar /> : <SmallNavbar />}
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
