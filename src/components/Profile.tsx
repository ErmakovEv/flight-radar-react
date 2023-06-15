import { useAppDispatch } from '../hooks/redux';
import { getProfile } from '../store/reducers/actionCreators';

function Profile() {
  const dispatch = useAppDispatch();

  return (
    <div>
      Вы успешно авторизовались!
      <button onClick={() => dispatch(getProfile())} type="button">
        Upd profile
      </button>
    </div>
  );
}

export default Profile;
