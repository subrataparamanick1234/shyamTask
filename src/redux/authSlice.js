import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/index";
import { endpoint } from "../api/endpoint";

export const loginRequest = createAsyncThunk("/login", async (user) => {
  try {
    const res = await axiosInstance.post(endpoint.login, user);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    //login
    [loginRequest.pending]: (state) => {
      state.isLogin = false;
    },
    [loginRequest.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
    },
    [loginRequest.rejected]: (state, { payload }) => {
      state.isLogin = false;
      toast(state.message, { type: "error" });
    },
  },
});
