import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/store';

function MainNavigation() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Main</NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
