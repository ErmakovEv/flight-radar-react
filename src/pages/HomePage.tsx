import { useAppSelector } from '../hooks/redux';
import LoginForm from '../components/LoginForm';
import Profile from '../components/Profile';

function HomePage() {
  const isLoggedIn = useAppSelector(
    (state) => !!state.auth.authData.accessToken
  );

  return (
    <div>
      <h1>HomePage</h1>
      {isLoggedIn ? <Profile /> : <LoginForm />}
    </div>
  );
}

export default HomePage;
