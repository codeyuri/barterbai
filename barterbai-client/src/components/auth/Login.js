import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "./auth.css";

import { loginAction } from "../../redux/store/users/usersActions";

const Login = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  // run once
  useEffect(() => {
    console.log("nirender login");
    user.message = "";
  }, [user.message]);

  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const handleLogin = async () => {
    try {
      await dispatch(loginAction(state));
    } catch (e) {
      console.log(`@@@ handleLogin`, e);
    }
  };

  return (
    <div className="home_div login">
      <div className="home_left">
        <h1>Barter Bai?</h1>
      </div>
      <div className="home_right">
        <div className="home_input">
          <h2>Login</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <label htmlFor="username">Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <span className="spanerror">{user.message}</span>
          <div className="home_input_btm">
            <p>Don't have an account yet?</p>
            <Link to="/register">Register here!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
