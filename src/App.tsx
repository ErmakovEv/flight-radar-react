import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './components/RootLayout';
import { IRootState, useAppDispatch } from './store/store';
import { getProfile } from './store/reducers/actionCreators';

function App() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

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
          element={isLoggedIn ? <MainPage /> : <Navigate to="/" />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
