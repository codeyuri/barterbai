import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import "./auth.css";

const Login = (props) => {
  const { setIsAuthenticated } = props;
  const initialState = {
    username: "",
    password: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const handleLogin = async (ev) => {
    try {
      await axios.post("http://localhost:3000/users/login", {
        ...state,
        [ev.target.name]: ev.target.value,
      });

      setState(initialState);

      setIsAuthenticated(true);

      props.history.push("/");
    } catch (e) {
      console.log(`@@@ handleLogin`, e);
    }
  };

  return (
    <div className="home_div">
      <div className="home_left">
        <h1>Barter Bai?</h1>
        <h2>{process.env.REACT_APP_TEST}</h2>
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
            type="text"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
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
