import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const total = useSelector((state) => state.app.total);

  return (
    <div className="home-page">
      <header>
        <img src="/images/logo.png" alt="logo login" />
        <h1>Casa Budget</h1>
      </header>
      <h2>Total</h2>
      <p>{total.toLocaleString()}</p>
      <Link to="/expenses">Expenses</Link>
    </div>
  );
};

export default Home;
