import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AvoidAuth: React.FC = () => {
  const isAuth = localStorage.getItem("user");

  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AvoidAuth;