import { useLocation } from 'react-router-dom';

export default function LoginPage() {
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  return (
    <div>
      <p>{fromPage}</p>
      <h1>Login page</h1>
    </div>
  );
}
