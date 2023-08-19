import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logoutUser } from '../../store/reducers/actionCreators';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

function BigNavbar() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(
    (state) => !!state.auth.authData.accessToken
  );
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex' }}>
      <ThemeSwitcher />
      {isLoggedIn ? (
        <Button
          color="inherit"
          onClick={() => {
            dispatch(logoutUser());
            navigate('/');
          }}
          sx={{
            color: 'info.light',
          }}
        >
          <ExitToAppIcon sx={{ ':hover': { color: 'primary.main' } }} />
        </Button>
      ) : null}
    </div>
  );
}

export default BigNavbar;
