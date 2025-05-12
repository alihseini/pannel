import { useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const DARGAH = import.meta.env.VITE_DARGAH;

const useAxios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const res = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
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
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(res);
    };
  }, [navigate]);
};

export default useAxios;
