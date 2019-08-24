import React from "react";
import styled from "styled-components";
import { Layout } from "../components/layouts";
import { Project } from "../components/Project";

const projectData = [
  {
    title: "repick.co",
    url: "https://repick.co/",
    techStack: "Vue.js, Meteor, MongoDB, AWS Lambda, Algolia",
    imageUrl: "https://i.imgur.com/4ZM6E0l.gif",
    description:
      "Curated home decor products across the web. Built with Vue.js/Meteor. Managed database with MongoDB. Implemented category search with Algolia. Scraped product information including price, discount rate with Python script on AWS Lambda. Chosen as #5 product of the day in ProductHunt"
  },
  {
    title: "Panking",
    techStack: "Python, Django, MySQL",
    imageUrl:
      "https://user-images.githubusercontent.com/18133030/63225730-80569780-c20e-11e9-9dee-8442dee74b97.png",
    imageHeight: "300px",
    description:
      "Social media with data visualization on political issues. Wrote Python script to scrape information from National Assembly API. Stored and updated data using MySQL Workbench. Set-up admin interface with Django and MySQL."
  }
];

const Projects = () => (
  <Layout>
    <Wrapper>
      {projectData.map((project, index) => (
        <>
          <Project project={project} key={index} />
          <Hr />
        </>
      ))}
    </Wrapper>
  </Layout>
);

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding-left: 16px;
  padding-right: 16px;
  font-family: Roboto, sans-serif;
`;

const Hr = styled.hr`
  margin: 48px 0;
  border: 0.5px solid #ddd;
`;

export default Projects;
