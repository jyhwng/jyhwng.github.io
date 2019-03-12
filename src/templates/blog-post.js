import React from "react";
// import Link from 'gatsby-link'
import Helmet from "react-helmet";
import { Post } from "../components/Post";

const Template = ({ data, location, pathContext }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <div>
      <Helmet title={`${frontmatter.title} - Camels and Snakes`} />
      <Post frontmatter={frontmatter} html={html} />
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
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

export default Template;
