import React from "react";
import Helmet from "react-helmet";
import { Post } from "../components/Post";
import { Layout } from "../components/layouts";
import { graphql } from "gatsby";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Helmet title={`${frontmatter.title} - Camels and Snakes`} />
      <Post frontmatter={frontmatter} html={html} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
        path
        tags
        excerpt
      }
    }
  }
`;
