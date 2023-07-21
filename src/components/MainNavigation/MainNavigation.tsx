import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Button, Toolbar, Switch } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IRootState } from '../../store/store';
import { logoutUser } from '../../store/reducers/actionCreators';
import { toggleTheme } from '../../store/reducers/themeSlice';
import './MainNavigation.css';

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
        backgroundColor: 'var( --main-bg-color)',
        position: 'fixed',
        zIndex: 10000,
      }}
    >
      <Toolbar
        color="primary"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <Button color="inherit">
            <NavLink to="/">
              <div style={{ display: 'flex' }}>
                <GpsFixedIcon sx={{ color: 'var(--main-color)' }} />
                <span style={{ fontFamily: 'helvetica' }}>FligthScanner</span>
              </div>
            </NavLink>
          </Button>

          <Button color="inherit">
            {isLoggedIn ? (
              <NavLink className="navlink" to="/dashboard">
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </Button>
        </div>
        <div>
          <Switch
            checked={theme.darkTheme}
            onChange={() => dispatch(toggleTheme())}
          />
        </div>
        <div>
          {isLoggedIn ? (
            <Button variant="outlined" color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>

    // <header>
    //   <nav>
    //     <ul>
    //       <li>
    //         <NavLink to="/">Home</NavLink>
    //       </li>
    //       <li>
    //         {isLoggedIn ? (
    //           <NavLink className="navlink" to="/dashboard">
    //             Dashboard
    //           </NavLink>
    //         ) : (
    //           <NavLink to="/login">Login</NavLink>
    //         )}
    //       </li>
    //     </ul>
    //     {isLoggedIn ? (
    //       <button onClick={logoutHandler} type="button">
    //         Log out
    //       </button>
    //     ) : null}
    //   </nav>
    // </header>
  );
}

export default MainNavigation;
