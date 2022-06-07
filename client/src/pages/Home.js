import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import "./Home.css";

const Home = () => {
  const dashboardData = useSelector((state) => state.app.dashboardData);
  const shops = useSelector((state) => state.app.shops);
  const [jobsExpand, setJobsExpand] = useState(false);

  useEffect(() => {
    // TODO: improve this by slowing down the number switching
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
        <p
          className="total-amount"
          id="value"
          onClick={() => window.navigator.vibrate(500)}
        >
          £{dashboardData.total?.toLocaleString()}
        </p>
        <p className="no-furniture">
          no furniture: £
          {(
            dashboardData.total -
            dashboardData.types?.find((type) => type.name === "Furniture").total
          ).toLocaleString()}
        </p>
        <div className="dashboard-types top-cat">
          {dashboardData.types?.map((type) => (
            <div key={type.name} className="dashboard-type">
              <p className="workers-name">{type.name}s</p>
              <p>{type.total.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="separator"></div>
        <div className="section-heading">
          <h3 className="subtitle">Jobs</h3>
          <img
            onClick={() => setJobsExpand(!jobsExpand)}
            className={`${jobsExpand && "arrow-open"}`}
            src="/images/chevron.png"
            alt="arrow down"
          />
        </div>
        <div className="dashboard-types">
          {dashboardData.jobs
            ?.slice(0, jobsExpand ? dashboardData.jobs.length : 3)
            .map((job) => (
              <div key={job.name} className="dashboard-job">
                <p className="workers-name jobs-name" title={job.name}>
                  {job.name.length > 16
                    ? `${job.name.substring(0, 15)}...`
                    : job.name}
                </p>
                <p>{job.total.toLocaleString()}</p>
              </div>
            ))}
        </div>

        <div className="separator"></div>
        <h3 className="subtitle">Shops</h3>
        <div className="dashboard-shops">
          {dashboardData.shops?.map((shop) => {
            const shopImage = shops.filter(
              (element) => element.name === shop.name
            )[0]?.image;
            return (
              shop.name !== "" && (
                <div key={shop.name} className="dashboard-shop">
                  {shopImage ? (
                    <img src={shopImage} alt={shop.name} />
                  ) : (
                    <span>{shop.name}</span>
                  )}
                  <p>{shop.total.toLocaleString()}</p>
                </div>
              )
            );
          })}
        </div>

        <div className="separator"></div>
        <h3 className="subtitle">Workers</h3>
        <div className="dashboard-types">
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

        <div className="separator"></div>
        <h3 className="subtitle">Rooms</h3>
        <div className="dashboard-types">
          {dashboardData.rooms?.slice(0, 4).map((room) => {
            return (
              room.name !== "" && (
                <div key={room.name} className="dashboard-room">
                  <p className="rooms-name">{room.name}</p>
                  <p>{room.total.toLocaleString()}</p>
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
