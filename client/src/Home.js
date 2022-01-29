import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <header>
        <img src="/images/logo.png" alt="logo login" />
        <h1>Casa Budget</h1>
      </header>
      <Link to="/expenses">Expenses</Link>
    </div>
  );
};

export default Home;
