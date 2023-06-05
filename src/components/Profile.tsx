import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { logoutUser, getProfile } from '../store/reducers/actionCreators';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div>
      Вы успешно авторизовались!
      <button onClick={logoutHandler} type="button">
        Log out
      </button>
      <button onClick={() => dispatch(getProfile())} type="button">
        Upd profile
      </button>
    </div>
  );
}

export default Profile;
