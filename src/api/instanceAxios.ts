import axios, { AxiosError } from 'axios';
import store from '../store/store';
// eslint-disable-next-line import/no-cycle
import { getAccessToken, logoutUser } from '../store/reducers/actionCreators';

import Endpoints from './endpoints';

const axiosInstance = axios.create({
  baseURL: 'localhost:3000',
  withCredentials: true,
});
const urlsSkipAuth = [
  Endpoints.AUTH.LOGIN,
  Endpoints.AUTH.REFRECH,
  Endpoints.AUTH.LOGOUT,
];

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config;
  }
  const accessToken = await store.dispatch(getAccessToken());
  if (accessToken) {
    const autharization = `Bearer ${accessToken}`;
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = autharization;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isLoggedIn = !!store.getState().auth.authData.accessToken;

    if (
      error.response?.status === 401 &&
      isLoggedIn &&
      error.request.url !== Endpoints.AUTH.LOGOUT
    ) {
      store.dispatch(logoutUser());
    }

    throw error;
  }
);

export default axiosInstance;
