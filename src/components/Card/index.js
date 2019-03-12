import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { Tag } from '../Tag'

export const Card = ({postType, path, title, date, excerpt, tags}) => (
  <CardBase postType={postType}>
    <Link to={path}>
      {title}
    </Link>
    <Excerpt>{excerpt}</Excerpt>
    <div>{tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</div>
    {!['project', 'about'].includes(postType) && <Date>{date}</Date>}
  </CardBase>
)

const CardBase = styled.article`
  border-top: 1px solid #303030;
  padding: 16px 0;
  position: relative;
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    transform: translateY(-10px);
  }
  a {
    font-weight: bold;
    word-break: break-all;
    text-decoration: none;
    color: #303030;
    display: block;
  }
  a:hover {
    text-decoration: underline;
  }
  ${props => props.postType === 'project' && `
    background-color: #fbe134;
    border: none;
    padding: 16px;
  `}
  ${props => props.postType === 'tips' && `
    // background-color: #303030;
    // border: none;
    // padding: 16px;
    // a {
    //   color: white;
    // }
  `}
`

const Date = styled.p`
  font-size: 13px;
  margin-bottom: 0;
`

const Excerpt = styled.p`
  font-size: 13px;
`