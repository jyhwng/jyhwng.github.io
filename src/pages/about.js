import React from "react";
import styled from "styled-components";
import { media } from "../utils/style.js";
import { Container } from "../components/Container";
import { withLayout } from "../utils/withLayout";

const stack = {
  languages: ["JavaScript", "TypeScript", "Python"],
  "frameworks & libraries": [
    "React",
    "Redux",
    "Next.js",
    "Express",
    "Jest",
    "Django",
    "Webpack",
    "Cypress",
  ],
  others: ["Git", "HTML5/CSS3"],
};

const About = () => (
  <Container>
    <Wrapper>
      <Section>
        <p>
          Hi! I'm Jiyoung, frontend developer from Seoul, Korea.{" "}
          <a href="https://twitter.com/@jyhwng" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{" "}
          <a href="https://github.com/jyhwng" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </Section>
      <Section>
        {Object.keys(stack).map((category, index) => (
          <Column key={index}>
            <h3>{category}</h3>
            {stack[category].map((x, index) => <Tag key={index}>{x}</Tag>)}
          </Column>
        ))}
      </Section>
      <Section>
        <h3>Press</h3>
        <ul>
          <li>
            <a
              href="https://wi-tech.org/2017/11/05/jiyoung-hwang-django-girls-organizer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jiyoung Hwang: Django Girls Organizer
            </a>, Witech, 2017.11.05
          </li>
          <li>
            <a
              href="http://thepin.ch/techgear/m9qmfd/adela-branch-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              개발 공부하는 여자들, 장고걸스를 만나보았다
            </a>, Pinch, 2017.04.11
          </li>
        </ul>
      </Section>
    </Wrapper>
  </Container>
);

const Wrapper = styled.div`
  margin-bottom: 160px;
  ${media.tablet`
    padding: 0 16px;
  `};
`;

const Column = styled.div`
  margin-bottom: 2em;
`;

const Section = styled.section`
  margin-bottom: 40px;
  & + & {
    padding-top: 24px;
    border-top: 1px solid #ddd;
  }
  li {
    margin-bottom: 4px;
  }
  h3 {
    text-transform: capitalize;
  }
  a {
    color: #303030;
  }
`;

const Tag = styled.div`
  color: #303030;
  display: inline-block;
  padding: 4px 8px;
  margin-bottom: 8px;
  text-transform: capitalize;
  background-color: #fbe134;
  margin-right: 8px;
`;

export default withLayout(About);
