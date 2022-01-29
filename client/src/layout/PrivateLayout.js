import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router";

const PrivateRoute = () => {
  const isLogged = useSelector((state) => state.app.isLogged);

  return isLogged ? (
    <div className="PrivateLayout">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
