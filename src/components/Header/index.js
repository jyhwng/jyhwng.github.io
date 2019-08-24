import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { Menu } from "../Menu";
import { Emoji } from "../Emoji";

export class Header extends React.Component {
  state = { isCollapsed: false };

  collapseHeader = () => {
    const navHeight = 22;
    const navPaddingTop = 72;

    if (window.scrollY > navHeight + navPaddingTop) {
      this.setState({ isCollapsed: true });
    } else {
      this.setState({ isCollapsed: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.collapseHeader);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.collapseHeader);
  }

  render() {
    const { isCollapsed } = this.state;
    return (
      <>
        <div style={{ height: "56px" }} />
        <Nav isCollapsed={isCollapsed}>
          <Wrapper>
            <Inner>
              <Title />
              <Menu />
            </Inner>
          </Wrapper>
        </Nav>
      </>
    );
  }
}

const Title = () => (
  <Link to="/">
    <span>
      <Emoji>🐫</Emoji> and <Emoji>🐍</Emoji>
    </span>
  </Link>
);

const Wrapper = styled.div`
  width: 100%;
`;

const Nav = styled.nav`
  top: 0;
  z-index: 1;
  width: 100%;
  position: sticky;
  background-color: #fff;
  ${props => props.isCollapsed && `border-bottom: 1px solid #ddd`};
`;

const Inner = styled.div`
  display: flex;
  padding: 16px;
  margin: 0 auto;
  max-width: 720px;
  align-items: center;
  justify-content: space-between;
  a {
    font-weight: bold;
    text-decoration: none;
    color: #303030;
    font-size: 1.2em;
  }
`;
