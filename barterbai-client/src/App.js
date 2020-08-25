import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Main from "./components/Main";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              !isAuthenticated ? <Redirect to="/login" /> : <Main />
            }
          />
          <Route
            path="/login"
            exact
            render={(props) =>
              !isAuthenticated ? (
                <Login setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/register"
            exact
            render={(props) =>
              !isAuthenticated ? <Register /> : <Redirect to="/" />
            }
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
