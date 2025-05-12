import React from "react";
import { Outlet } from "react-router-dom";
import useAxios from "../utils/useAxios";

const LoginLayout: React.FC = () => {
  useAxios();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
