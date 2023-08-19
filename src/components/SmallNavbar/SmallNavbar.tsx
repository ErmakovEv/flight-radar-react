import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Drawer, Button, Box } from '@mui/material';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logoutUser } from '../../store/reducers/actionCreators';

export default function SmallNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(
    (store) => !!store.auth.authData.accessToken
  );
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setIsOpen(!isOpen)}
        edge="start"
        size="large"
        sx={{ m: 1, ...(isOpen && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{}}
      >
        <Box
          sx={{
            pt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'background.default',
          }}
        >
          <ThemeSwitcher />
          {isLoggedIn ? (
            <Button
              color="inherit"
              onClick={() => {
                dispatch(logoutUser());
                navigate('/');
              }}
              sx={{
                color: 'secondary.dark',
                ':hover': { color: 'primary.main' },
              }}
            >
              Log out
            </Button>
          ) : null}
        </Box>
      </Drawer>
    </>
  );
}
