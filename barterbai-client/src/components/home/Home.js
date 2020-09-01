import React from "react";

import Nav from "./nav/Nav";
import Content from "./content/Content";

import "./home.css";

const Home = () => {
  return (
    <div className="home_div">
      <Nav />
      <Content />
    </div>
  );
};

export default Home;
