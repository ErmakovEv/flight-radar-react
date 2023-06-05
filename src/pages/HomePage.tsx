import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { IRootState } from '../store/store';
import Profile from '../components/Profile';

function HomePage() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <div>
      <h1>HomePage</h1>
      {isLoggedIn ? <Profile /> : <LoginForm />}
    </div>
  );
}

export default HomePage;
