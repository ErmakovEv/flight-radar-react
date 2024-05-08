// import { useAppSelector } from '../hooks/redux';
import LoginForm from '../components/LoginForm';
import './LoginPage.css';

function LoginPage() {
  // const isLoggedIn = useAppSelector(
  //   (state) => !!state.auth.authData.accessToken
  // );

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
