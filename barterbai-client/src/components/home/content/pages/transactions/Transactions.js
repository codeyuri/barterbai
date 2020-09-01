import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";

import "./transactions.css";

import Pending from "./Pending";
import Approved from "./Approved";

import { fetchTransactions } from "../../../../../redux/store/items/itemsActions";

const Transactions = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const item = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(fetchTransactions(user.user_id));
  }, []);

  return (
    <>
      <h2>Transactions</h2>
      <div className="main_top transactions ">
        <NavLink to="/transactions/pending">Pending</NavLink>
        <NavLink to="/transactions/approved">Approved</NavLink>
      </div>
      <div className="main_btm transactions">
        <Switch>
          <Route path="/transactions/pending" component={Pending} />
          <Route path="/transactions/approved" component={Approved} />
        </Switch>
      </div>
      <div className="main_btm transactions">
        <div>
          <h2>Sample only for testing</h2>
          {item.own_transactions.map((items) => {
            return (
              <ul key={items.id}>
                {/* <span>Getter List: {items.getter.map((get) => get)}</span> */}
                <li>
                  getter_id: <b>{items.getter_id}</b>
                </li>
                {/* <li>Setter List: <b>{items.setter.map((set) => set)}</li</b>> */}
                <li>
                  setter_id: <b>{items.setter_id}</b>
                </li>
                <li>
                  Transaction ID: <b>{items.id}</b>
                </li>
                <li>
                  is_approved: <b>{items.is_approved ? "true" : "false"}</b>
                </li>
                <li>
                  is_pending: <b>{items.is_pending ? "true" : "false"}</b>
                </li>
                <li>
                  user_id: <b>{items.user_id}</b>
                </li>
              </ul>
            );
          })}
          {/* <ul>
            <span>
              Getter List: {item.own_transactions[0].getter.map((get) => get)}
            </span>
            <span>getter_id: {item.own_transactions[0].getter_id}</span>

            <span>
              Setter List: {item.own_transactions[0].setter.map((set) => set)}
            </span>
            <span>setter_id: {item.own_transactions[0].setter_id}</span>

            <span>Transaction ID: {item.own_transactions[0].id}</span>
            <span>is_approved: {item.own_transactions[0].is_approved}</span>
            <span>is_pending: {item.own_transactions[0].is_pending}</span>
            <span>user_id: {item.own_transactions[0].user_id}</span>
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default Transactions;
