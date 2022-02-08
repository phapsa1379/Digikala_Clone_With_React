import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  isLoggedIn = JSON.parse(isLoggedIn);
  return isLoggedIn === true ? <Navigate to="/manage-products" /> : <Outlet />;
};

export { ProtectedRoute };
