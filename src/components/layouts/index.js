import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./index.css";

require("./syntax.css");

const Layout = ({ children }) => (
  <div>
    <Helmet title="Camels and Snakes" meta={[{ name: "jyhwng", content: "blog" }]} />
    <Header />
    <div>{children}</div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;
