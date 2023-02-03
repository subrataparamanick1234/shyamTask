import axios from "axios";

let axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token !== null || token !== undefined) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["api_key"] = process.env.REACT_APP_API_KEY;
      config.headers["source"] = process.env.REACT_APP_SOURCE;
      config.headers["device_type"] = process.env.REACT_APP_DEVICE_TYPE;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export default axiosInstance;
