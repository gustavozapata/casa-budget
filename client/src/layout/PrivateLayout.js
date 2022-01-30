import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router";

const PrivateRoute = () => {
  const isLogged = useSelector((state) => state.app.isLogged);
  let location = useLocation();

  return isLogged ? (
    <div className="PrivateLayout">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
