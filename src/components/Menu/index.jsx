import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { media } from "../../utils/style";

const menus = [
  { name: "Posts", route: "/" },
  { name: "About", route: "/about" },
  { name: "🤙", route: "/projects" }
];

export const Menu = () => (
  <Menus>
    {menus.map((menu, index) => (
      <Li key={index}>
        <Link to={menu.route}>{menu.name}</Link>
      </Li>
    ))}
  </Menus>
);

const Menus = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  line-height: 1;
  list-style-type: none;
`;

const Li = styled.li`
  & + & {
    margin-left: 20px;
    ${media.tablet`
      margin-left: 16px;
    }
  `}
  }
  &:last-child {
    transition: scale 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  }
  &:last-child:hover {
    transform: scale(1.2);
  }
`;
