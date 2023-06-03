import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  role: 'ADMIN' | 'USER' | '';
}

const initialState: IUser = {
  name: '',
  role: '',
};

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export default authUserSlice.reducer;
