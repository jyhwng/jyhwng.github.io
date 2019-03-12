import React from 'react'
import { Card } from '../components/Card'
import { Cards } from '../components/Cards'

const IndexPage = ({data}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Cards>
      {posts.map(({node: post}, index) => {
        const { frontmatter } = post
        return (
          <Card 
            key={index}
            postType={frontmatter.type}
            path={frontmatter.path}
            title={frontmatter.title}
            date={frontmatter.date}
            excerpt={frontmatter.excerpt}
            tags={frontmatter.tags}
          />
        )
      })}
    </Cards>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            path
            tags
            excerpt
            type
          }
        }
      }
    }
  }
`

export default IndexPage
