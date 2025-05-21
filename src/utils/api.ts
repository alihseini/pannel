import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API;
const DARGAH = import.meta.env.VITE_DARGAH;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      console.log("درخواست POST در حال ارسال است:", config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = DARGAH;
          break;
        case 403:
          window.location.href = "/403";
          break;
        case 500:
          window.location.href = "/500";
          break;
        default:
          console.error("خطای ناشناخته:", error.response);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
