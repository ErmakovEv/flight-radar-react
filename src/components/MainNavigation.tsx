import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Button, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useAppDispatch } from '../hooks/redux';
import { IRootState } from '../store/store';
import { logoutUser } from '../store/reducers/actionCreators';

function MainNavigation() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FligthScanner
        </Typography>
        <Button color="inherit">
          <NavLink to="/">Home</NavLink>
        </Button>

        <Button color="inherit">
          {isLoggedIn ? (
            <NavLink to="/dashboard">Dashboard</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </Button>
        {isLoggedIn ? (
          <Button variant="outlined" color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        ) : null}
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
    //           <NavLink to="/dashboard">Dashboard</NavLink>
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
