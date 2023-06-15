import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const isLoggedIn = useAppSelector(
    (state) => !!state.auth.authData.accessToken
  );

  return <LoginForm />;
}

export default LoginPage;
