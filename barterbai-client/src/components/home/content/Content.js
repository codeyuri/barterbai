import React from "react";
import { Route, Switch } from "react-router-dom";

import "./content.css";

import HomeContent from "./pages/HomeContent";
import MyItems from "./pages/MyItems";
import Item from "./pages/items/Item";
import Transactions from "./pages/transactions/Transactions";
import AddItemToTempList from "./pages/additem/AddItemToTempList";
import GetItem from "./pages/getitem/GetItem";
import NoMatch from "./pages/NoMatch";

const Content = () => {
  return (
    <main>
      <div className="main_con">
        <Switch>
          <Route path="/" exact component={HomeContent} />
          <Route path="/items" exact component={MyItems} />
          <Route path="/view/:setter_id" component={Item} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/additem" component={AddItemToTempList} />
          <Route path="/getitem" component={GetItem} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </main>
  );
};

export default Content;
