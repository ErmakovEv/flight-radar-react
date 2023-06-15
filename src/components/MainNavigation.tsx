import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <NavLink to="/dashboard">Dashboard</NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
        </ul>
        {isLoggedIn ? (
          <button onClick={logoutHandler} type="button">
            Log out
          </button>
        ) : null}
      </nav>
    </header>
  );
}

export default MainNavigation;
