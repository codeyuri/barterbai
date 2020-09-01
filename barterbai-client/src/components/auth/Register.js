import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "./auth.css";

import { registerAction } from "../../redux/store/users/usersActions";

const Register = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [state, setState] = useState({
    username: "",
    password: "",
    con_pass: "",
  });

  // run once
  useEffect(() => {
    console.log("nirender register");
    user.message = "";
  }, [user.message]);

  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const handleRegister = async (ev) => {
    try {
      await dispatch(registerAction(state));

      setState({
        username: "",
        password: "",
        con_pass: "",
      });

      props.history.push("/login");
    } catch (e) {
      console.log(`@@@ handleRegister`, e);
    }
  };

  return (
    <div className="home_div login">
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
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="con_pass"
            value={state.con_pass}
            placeholder="confirm password"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
          <span className="spanerror">{user.message}</span>
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
