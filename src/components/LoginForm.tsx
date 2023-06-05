import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { loginUser } from '../store/reducers/actionCreators';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const dispath = useAppDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispath(loginUser({ email, password }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Login
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassord(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
