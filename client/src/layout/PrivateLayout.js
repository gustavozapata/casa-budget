import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router";
import { loadInitialData } from "../store/appSlice";
import "./PrivateLayout.css";

const PrivateRoute = () => {
  const isLogged = useSelector((state) => state.app.isLogged);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    document.title = "Home";
    dispatch(loadInitialData());
  }, [dispatch]);

  return isLogged ? (
    <div className="PrivateLayout">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
