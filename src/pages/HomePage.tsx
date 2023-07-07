import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import Profile from '../components/Profile';
import './HomePage.css';

function HomePage() {
  const isLoggedIn = useAppSelector(
    (state) => !!state.auth.authData.accessToken
  );

  return (
    <div className="home-page">
      <h1>HomePage</h1>
      {isLoggedIn ? <Profile /> : null}
    </div>
  );
}

export default HomePage;
