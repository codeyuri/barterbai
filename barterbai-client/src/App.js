import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            {!user.isAuthenticated ? <Login /> : <Home />}
          </Route>
          <Route path="/login">
            {!user.isAuthenticated ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route path="/register">
            {!user.isAuthenticated ? <Register /> : <Redirect to="/" />}
          </Route>
          {/* <Route render={() => <Redirect to="/" />} /> */}
          <Route>{!user.isAuthenticated ? <Login /> : <Home />}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
