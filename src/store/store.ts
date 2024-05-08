import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import theme from './reducers/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
