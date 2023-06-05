import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const userAPI = createApi({
  reducerPath: 'userData',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
  }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (loginData) => ({
        url: '/user/reg',
        method: 'POST',
        body: loginData,
      }),
    }),
    login: build.mutation({
      query: (loginData) => ({
        url: '/user/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    check: build.query({
      query: () => ({
        url: '/user/auth',
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
    }),
  }),
});

export default userAPI;
