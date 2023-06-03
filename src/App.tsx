import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './components/RootLayout';

export const isAuth = true;
export const isAdmin = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
