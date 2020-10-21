import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import * as service from "../../services/authService";
import { register } from "../../services/userService";

export const loginUser = createAsyncThunk("user/login", service.login);

export const registerUser = createAsyncThunk("user/register", register);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    error: null,
    jwt: service.getJwt(),
    registerStatus: "idle",
    registerError: null,
  },
  reducers: {
    logoutUser: (state, action) => {
      state.status = "idle";
      state.jwt = null;
      service.logout();
    },
    clearUserError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeded";
      state.jwt = action.payload.data;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [registerUser.pending]: (state, action) => {
      state.registerStatus = "pending";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.registerStatus = "succeded";
      const token = action.payload.headers["x-auth-token"];
      state.jwt = token;
      service.loginWithJwt(token);
    },
    [registerUser.rejected]: (state, action) => {
      state.registerStatus = "failed";
      state.registerError = action.error.message;
    },
  },
});

export const { logoutUser, clearUserError } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => {
  try {
    return jwtDecode(state.user.jwt);
  } catch (error) {
    return null;
  }
};
