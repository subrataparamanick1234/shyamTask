import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/index";
import { endpoint } from "../api/endpoint";

export const getDoctorList = createAsyncThunk(
  "/getdoctorlist",
  async (data) => {
    try {
      const res = await axiosInstance.post(endpoint.getDoctorList, data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  isDashboardFetch: false,
  dashboardData: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: {
    [getDoctorList.pending]: (state) => {
      state.isDashboardFetch = false;
    },
    [getDoctorList.fulfilled]: (state, { payload }) => {
      state.isDashboardFetch = true;
      state.dashboardData = payload?.data;
    },
    [getDoctorList.rejected]: (state, { payload }) => {
      state.isDashboardFetch = false;
      toast(state.message, { type: "error" });
    },
  },
});
