import React from "react";
import styled from "styled-components";
import { Comment } from "../Comment";

import { media } from "../../utils/style.js";
import { Tag } from "../Tag";
import { Container } from "../Container";
import "./index.css";

export const Post = ({ frontmatter, html }) => {
  const { title, date, excerpt, tags } = frontmatter;
  return (
    <>
      <PostBase>
        <Container>
          <h1>{title}</h1>
          <P>{excerpt}</P>
          <div>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
          <P>{date}</P>
        </Container>
        <Hr />
        <Container>
          <Content dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
      </PostBase>
      <Comment />
    </>
  );
};

const PostBase = styled.div`
  font-family: "Spoqa Han Sans", Roboto, sans-serif;
  position: relative;
  ${media.tablet`
    padding: 0 16px;
  `};
`;

const P = styled.p`
  margin: 16px 0;
`;

const Hr = styled.hr`
  margin: 72px 0;
  border: 0.5px solid #ddd;
`;

const Content = styled.div`
  margin-bottom: 60px;
  h2 {
    margin-top: 0;
    word-break: break-all; /* break h2 in code block */
    ${media.tablet`
      width: auto;
      position: relative;
    `};
  }
  ul,
  ol {
    margin-top: 4px;
    padding-left: 20px;
  }
  p {
    margin-top: 16px;
    margin-bottom: 0;
  }
  ${media.tablet`
    width: 100%;
  `} hr {
    margin: 32px 0;
    border: 0.5px solid #ddd;
  }
  li > p {
    margin-bottom: 0;
  }
  li + li {
    margin-top: 8px;
  }
`;
