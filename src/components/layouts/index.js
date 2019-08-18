import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Header } from "../Header";
import { Footer } from "../Footer";
import "./index.css";
import "./syntax.css";

export const Layout = ({ children }) => (
  <>
    <Helmet title="Camels and Snakes" meta={[{ name: "jyhwng", content: "blog" }]} />
    <Header />
    <Inner>{children}</Inner>
    <Footer />
  </>
);

const Inner = styled.div`
  padding-top: 40px;
`;
