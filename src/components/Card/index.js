import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Tag } from "../Tag";

export const Card = ({ path, title, date, excerpt, tags }) => (
  <CardBase>
    <Link to={path}>{title}</Link>
    <Excerpt>{excerpt}</Excerpt>
    <div>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </div>
    <Date>{date}</Date>
  </CardBase>
);

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
`;

const Date = styled.p`
  font-size: 13px;
  margin-bottom: 0;
`;

const Excerpt = styled.p`
  font-size: 13px;
`;
