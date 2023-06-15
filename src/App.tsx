import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
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

function App() {
  const isLoggedIn = useAppSelector(
    (state) => !!state.auth.authData.accessToken
  );

  const { isAdmin } = useAdmin();

  const dispatch = useAppDispatch();

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
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
