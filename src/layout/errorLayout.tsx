import React from "react";
import { Outlet } from "react-router-dom";

const errorLayout: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Outlet />
  </div>
);

export default errorLayout;
