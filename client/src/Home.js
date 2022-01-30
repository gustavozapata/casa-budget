import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const dashboardData = useSelector((state) => state.app.dashboardData);

  return (
    <div className="home-page">
      <header>
        <img src="/images/logo.png" alt="logo login" />
        <h1>Casa Budget</h1>
      </header>
      <h2>Total</h2>
      <p>{dashboardData.total?.toLocaleString()}</p>
      <div className="dashboard-shops">
        {dashboardData.shops?.map((shop) => (
          <div key={shop.name} className="dashboard-shop">
            <p>{shop.name}</p>
            <p>{shop.total.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <Link to="/expenses">Expenses</Link>
    </div>
  );
};

export default Home;
