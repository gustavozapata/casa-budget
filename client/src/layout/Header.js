import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/appSlice";
import "./Header.css";

const Header = () => {
  const serverError = useSelector((state) => state.app.serverError);
  const dispatch = useDispatch();

  return (
    <div className="Header">
      <header>
        {/* <h1>Casa Budget</h1> */}
        <p>{serverError}</p>
        <span className="nav-link">
          <Link to="/">
            <img id="logo" src="/images/logo.png" alt="logo login" />
          </Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/add-expense">New</Link>
          <span className="logout" onClick={() => dispatch(logout())}>
            Logout
          </span>
        </span>
      </header>
    </div>
  );
};

export default Header;
