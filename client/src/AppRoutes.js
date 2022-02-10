import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import Home from "./pages/Home";
import App from "./pages/App";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/add-expense" element={<App />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
