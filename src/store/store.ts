import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './reducers/AuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
