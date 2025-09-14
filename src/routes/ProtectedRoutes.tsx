import type React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserRoles } from "../types/types";

const getAuthData = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user_data");
  const user = userData ? JSON.parse(userData) : null;
  return { token, user };
};

export const AuthenticatedRoute: React.FC = () => {
  const { token } = getAuthData();
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export const AdminRoute: React.FC = () => {
  const { user } = getAuthData();
  const isAdmin = user && user.role !== UserRoles.USER;

  return isAdmin ? <Outlet /> : <Navigate to="/feed" replace />;
};
