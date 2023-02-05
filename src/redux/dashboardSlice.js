import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/index";
import { endpoint } from "../api/endpoint";


// FOR DOCTOR LIST

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
// FOR SLOT LIST

export const getSlotList = createAsyncThunk("/getSlotlist", async (data) => {
  try {
    const res = await axiosInstance.post(endpoint.chcekSlot, data);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});

// FOR CREATE BOOKING

export const createBooking = createAsyncThunk(
  "/createBooking",
  async (data) => {
    try {
      const res = await axiosInstance.post(endpoint.createBooking, data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  isDashboardFetch: false,
  dashboardData: null,
  isSlotList: false,
  getAllSlotList: [],
  isSlotMsg: "",
  isBooking: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: {
    // FOR GET DOCTOR LIST
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
    // FOR GET DOCTOR LIST

    // FOR SLOT LIST

    [getSlotList.pending]: (state) => {
      state.isSlotList = false;
    },
    [getSlotList.fulfilled]: (state, { payload }) => {
      state.isSlotList = true;
      if (payload?.status) {
        state.getAllSlotList = payload?.slots;
      } else {
        state.getAllSlotList = [];
        state.isSlotMsg = payload?.message;
      }
    },
    [getSlotList.rejected]: (state, { payload }) => {
      state.isSlotList = false;
      toast(state.message, { type: "error" });
    },
    // FOR SLOT LIST

    // FOR CREATE BOOKING

    [createBooking.pending]: (state) => {
      state.isBooking = false;
    },
    [createBooking.fulfilled]: (state, { payload }) => {
      state.isBooking = true;
      state.getAllSlotList = [];
    },
    [createBooking.rejected]: (state, { payload }) => {
      state.isBooking = false;
      toast(state.message, { type: "error" });
    },
    // FOR CREATE BOOKING
  },
});
