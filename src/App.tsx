import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './components/RootLayout';
import { getProfile } from './store/reducers/actionCreators';
import useAdmin from './hooks/useAdmin';
import LoginPage from './pages/LoginPage';
import { darkTheme, lightTheme } from './theme';

function App() {
  const isLoggedIn = useAppSelector(
    (state) => !!state.auth.authData.accessToken
  );
  const userProfile = useAppSelector((state) => state.auth.profileData.profile);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const { isAdmin } = useAdmin();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            // eslint-disable-next-line no-nested-ternary
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : isAdmin ? (
              <AdminPage />
            ) : (
              <MainPage />
            )
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/login"
          element={
            // eslint-disable-next-line no-nested-ternary
            !isLoggedIn ? (
              <LoginPage />
            ) : userProfile ? (
              <Navigate to="/dashboard" />
            ) : (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            )
          }
        />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
