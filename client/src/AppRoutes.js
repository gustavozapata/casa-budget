import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import Home from "./Home";
import Login from "./Login";
import App from "./App";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<App />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
