const path = require("path");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const result = await graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            date
            path
            title
            excerpt
            tags
          }
        }
      }
    }
  }`);

  if (result.errors) {
    console.log(result.errors);
    throw new Error("error getting posts");
  }

  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate
    });
  });
};
