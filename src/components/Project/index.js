import React from "react";
import styled from "styled-components";
import { media } from "../../utils/style";

export const Project = ({ project }) => (
  <ProjectWrapper>
    <LeftWrapper>
      <Title>
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        ) : (
          <span>{project.title}</span>
        )}
      </Title>
      <Subtext>{project.techStack}</Subtext>
    </LeftWrapper>
    <RightWrapper>
      <Image src={project.imageUrl} height={project.imageHeight} />
      <p>{project.description}</p>
    </RightWrapper>
  </ProjectWrapper>
);

const ProjectWrapper = styled.div`
  display: flex;
  ${media.tablet`
    flex-direction: column;
  `}
`;

const Title = styled.h1`
  margin-top: 0;
  a {
    color: #303030;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Subtext = styled.p`
  font-size: 14px;
  margin-bottom: 24px;
  font-family: "PT Mono";
`;

const LeftWrapper = styled.div`
  flex: 1;
`;

const RightWrapper = styled.div`
  flex: 4;
  margin-left: 36px;
  p {
    margin-top: 24px;
    margin-bottom: 0;
  }
  ${media.tablet`
    margin-left: 0;
  `}
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
