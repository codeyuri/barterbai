import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import "./nav.css";

import { logoutAction } from "../../../redux/store/users/usersActions";

const Nav = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    console.log(`handleeeeeeeeeeeeeeeeeeeLogout`, user);
    try {
      await dispatch(logoutAction(user.token));

      props.history.push("/");
    } catch (e) {
      console.log(`@@@ handleLogout`, e);
    }
  };

  const handleNavClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav>
      <div className="nav_con">
        <h2>Barter Bai</h2>
        <ul>
          <li onClick={handleNavClick}>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/items">My Items</NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/transactions">Transactions</NavLink>
          </li>
          <li onClick={handleNavClick}>
            <NavLink to="/additem">Add Item</NavLink>
          </li>
        </ul>
      </div>
      <div className="nav_btm">
        <p>User: {user.username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default withRouter(Nav);
