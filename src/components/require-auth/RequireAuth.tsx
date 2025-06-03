import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const RequireAuth: React.FC = () => {

  const isAuth = localStorage.getItem("user")
  return isAuth ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default RequireAuth;
