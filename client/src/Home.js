import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./store/appSlice";
import "./Home.css";

const Home = () => {
  const dashboardData = useSelector((state) => state.app.dashboardData);
  const shops = useSelector((state) => state.app.shops);
  const workers = useSelector((state) => state.app.workers);
  const dispatch = useDispatch();

  return (
    <div className="Home">
      <header>
        <img src="/images/logo.png" alt="logo login" />
        <h1>Casa Budget</h1>
        <span className="nav-link">
          <Link to="/expenses">Expenses</Link>
          <span onClick={() => dispatch(logout())}>Logout</span>
        </span>
      </header>
      <main>
        <h2>Total</h2>
        <p className="total-amount">£{dashboardData.total?.toLocaleString()}</p>
        <div className="dashboard-shops">
          {dashboardData.shops?.map((shop) => (
            <div key={shop.name} className="dashboard-shop">
              <img
                src={
                  shops.filter((element) => element.name === shop.name)[0].image
                }
                alt={shop.name}
                key={shop.name}
              />
              <p>{shop.total.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-workers">
          {dashboardData.workers?.map((worker) => (
            <div key={worker.name} className="dashboard-worker">
              <p className="workers-name">{worker.name}</p>
              <p>{worker.total.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
