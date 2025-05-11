import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API;
const DARGAH = import.meta.env.VITE_DARGAH;

const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const navigate = useNavigate();
    if (error.response)
      switch (error.response) {
        case 401:
          window.location.href = DARGAH;
          break;
        case 403:
          navigate("/403");
          break;
        case 500:
          navigate("/500");
          break;
        default:
          console.log(error.response);
          break;
      }
  }
);

export default api;
