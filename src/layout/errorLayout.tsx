import React from "react";
import { Outlet } from "react-router-dom";

const ErrorLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Outlet />
    </div>
  );
};

export default ErrorLayout;
