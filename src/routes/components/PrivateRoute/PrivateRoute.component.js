import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  isLoggedIn = JSON.parse(isLoggedIn);
  return isLoggedIn === true ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoute };
