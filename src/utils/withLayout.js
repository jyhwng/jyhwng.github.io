import React from "react";
import { Layout } from "../components/layouts";

export const withLayout = Component => props => (
  <Layout>
    <Component {...props} />
  </Layout>
);
