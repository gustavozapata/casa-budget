import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import "./Home.css";

const Home = () => {
  const dashboardData = useSelector((state) => state.app.dashboardData);
  const shops = useSelector((state) => state.app.shops);

  useEffect(() => {
    // TODO: improve it!
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = "£" + (progress * (end - start) + start).toFixed(2);
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
      <Header />
      <main>
        <h2>Total</h2>
        <p className="total-amount" id="value">
          £{dashboardData.total?.toLocaleString()}
        </p>

        <div className="dashboard-types">
          {dashboardData.types?.map((type) => (
            <div key={type.name} className="dashboard-type">
              <p className="workers-name">{type.name}</p>
              <p>{type.total.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-shops">
          {dashboardData.shops?.map((shop) => {
            return (
              shop.name !== "" && (
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
              )
            );
          })}
        </div>

        <div className="dashboard-workers">
          {dashboardData.workers?.map((worker) => {
            return (
              worker.name !== "" && (
                <div key={worker.name} className="dashboard-worker">
                  <p className="workers-name">{worker.name}</p>
                  <p>{worker.total.toLocaleString()}</p>
                </div>
              )
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
