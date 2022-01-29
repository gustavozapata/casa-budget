import React from "react";
import { Outlet } from "react-router-dom";
import "./PublicLayout.css";

const PublicLayout = () => {
  return (
    <div className="PublicLayout">
      <header>
        <img src="/images/logo.png" alt="logo login" />
        <h1>Casa Budget</h1>
      </header>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
