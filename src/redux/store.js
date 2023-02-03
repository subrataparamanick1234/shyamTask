import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { dashboardSlice } from "./dashboardSlice";
const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
});

export default Store;
