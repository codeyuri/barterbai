import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import "./auth.css";

const Register = (props) => {
  const initialState = {
    username: "",
    password: "",
    con_pass: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const handleRegister = async (ev) => {
    try {
      await axios.post("http://localhost:3000/users/register", {
        ...state,
        [ev.target.name]: ev.target.value,
      });

      setState(initialState);

      props.history.push("/login");
    } catch (e) {
      console.log(`@@@ handleRegister`, e);
    }
  };

  return (
    <div className="home_div">
      <div className="home_left">
        <h1>Barter Bai?</h1>
      </div>
      <div className="home_right">
        <div className="home_input">
          <h2>Register</h2>
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
          <input
            type="text"
            name="con_pass"
            value={state.con_pass}
            placeholder="confirm password"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
          <div className="home_input_btm">
            <p>Already have an account?</p>
            <Link to="/">Login here!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
