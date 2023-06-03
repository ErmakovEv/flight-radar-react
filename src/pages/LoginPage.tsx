import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  return (
    <div>
      <p>{fromPage}</p>
      <h1>Login page</h1>
    </div>
  );
}
