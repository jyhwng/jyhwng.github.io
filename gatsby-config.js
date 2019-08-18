module.exports = {
  // pathPrefix: "/blog",
  siteMetadata: {
    title: "Gatsby Default Starter"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            }
          },
          `gatsby-plugin-styled-components`,
          `gatsby-remark-emoji`
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/favicon.png",
        injectHTML: true,
        icons: {
          appleIcon: true,
          appleStartup: true,
          favicons: true,
          firefox: true,
          twitter: false
        }
      }
    }
  ]
};
