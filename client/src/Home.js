import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./store/appSlice";
import "./Home.css";

const Home = () => {
  const dashboardData = useSelector((state) => state.app.dashboardData);
  const shops = useSelector((state) => state.app.shops);
  const serverError = useSelector((state) => state.app.serverError);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: improve it!
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML =
          "£" + Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    const obj = document.getElementById("value");
    animateValue(obj, dashboardData.previousTotal, dashboardData.total, 800);
  }, [dashboardData]);

  return (
    <div className="Home">
      <header>
        <img src="/images/logo.png" alt="logo login" />
        <h1>Casa Budget</h1>
        <p>{serverError}</p>
        <span className="nav-link">
          <Link to="/expenses">Expenses</Link>
          <span onClick={() => dispatch(logout())}>Logout</span>
        </span>
      </header>
      <main>
        <h2>Total</h2>
        <p className="total-amount" id="value">
          £{dashboardData.total?.toLocaleString()}
        </p>
        <div className="dashboard-shops">
          {dashboardData.shops?.map((shop) => (
            <div key={shop.name} className="dashboard-shop">
              <img
                src={
                  shops.filter((element) => element.name === shop.name)[0]
                    ?.image
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
