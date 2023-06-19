/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import { Dispatch } from '@reduxjs/toolkit';
import { AxiosPromise } from 'axios';
import {
  login,
  logout,
  fetchProfile,
  refreshToken,
} from '../../api/auth/requests';
import { ILoginReq, ILoginRes } from '../../api/auth/types';
import store from '../store';
import { authSlice } from './AuthSlice';
import { isTokenExpired } from '../../utils/jwt';

export const getProfile =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(authSlice.actions.loadProfileStart);
      const res = await fetchProfile();
      console.log('getProfile action FETCH PROFILE', res);
      dispatch(authSlice.actions.loadProfileSucess(res.data));
    } catch (e: any) {
      console.log(e);
      dispatch(authSlice.actions.loadProfileFailure(e.message));
    }
  };

export const loginUser =
  (data: ILoginReq) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(authSlice.actions.loginStart());
      const res = await login(data);
      dispatch(authSlice.actions.loginSucess(res.data.accessToken));
      dispatch(getProfile());
    } catch (e: any) {
      console.error(e);
      dispatch(authSlice.actions.loginFailure(e.message));
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await logout();

      dispatch(authSlice.actions.logoutSuccess());
    } catch (e) {
      console.error(e);
    }
  };

// переменная для хранения запроса токена (для избежания race condition)
let refreshTokenRequest: AxiosPromise<ILoginRes> | null = null;

export const getAccessToken =
  () =>
  async (dispatch: Dispatch<any>): Promise<string | null> => {
    try {
      const { accessToken } = store.getState().auth.authData;
      if (!accessToken || isTokenExpired(accessToken)) {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = refreshToken();
        }
        console.log('getAccessToken');
        // const res = await refreshTokenRequest;
        const res = await refreshToken();
        refreshTokenRequest = null;
        dispatch(authSlice.actions.loginSucess(res.data.accessToken));
        return res.data.accessToken;
      }
      return accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
