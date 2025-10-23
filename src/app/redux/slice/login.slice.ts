import { loginSchema } from '@/app/(auth)/login/page';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';
import { loginUser } from '../thunk/auth/login.thunk';
type loginFormData = z.infer<typeof loginSchema>;

export interface authinfo {
  msg: string,
  token: string,
  role:string
}
export interface login {
  loading: boolean;
  error: string | null;
  auth: authinfo | null
}
const initialState: login = {
  loading: false,
  error: null,
  auth: null
}

const loginSlice = createSlice({
  name: 'authlogin',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.auth = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<authinfo>) => {
        state.loading = false;
        console.log("action ", action.payload)
        state.auth = action.payload

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearUser } = loginSlice.actions;

export default loginSlice.reducer;