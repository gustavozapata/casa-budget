import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/appSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogged = useSelector((state) => state.app.isLogged);
  const serverError = useSelector((state) => state.app.serverError);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login";
    if (isLogged) {
      navigate(from, { replace: true });
    }
  }, [isLogged, navigate, from]);

  return (
    <div className="Login">
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={() => dispatch(login(email, password))}>Login</button>
      <p className="error-msg">{serverError}</p>
    </div>
  );
};

export default Login;
