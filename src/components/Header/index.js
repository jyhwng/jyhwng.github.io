import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { media } from "../../utils/style.js";
import { Menu } from "../Menu";

export class Header extends React.Component {
  state = { isCollapsed: false }

  collapseHeader = () => {
    const navHeight = 22
    const navPaddingTop = 72

    if (window.scrollY > navHeight + navPaddingTop) {
      this.setState({ isCollapsed: true })
    } else {
      this.setState({ isCollapsed: false })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.collapseHeader)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.collapseHeader)
  }

  renderNavOverlay = () => {
    const { isCollapsed } = this.state
    return (
      <TitleOverlay isCollapsed={isCollapsed}>
        <Nav>
          <Title/>
          <Menu/>
        </Nav>
      </TitleOverlay>
    )
  }

  render() {
    const { isCollapsed } = this.state
    return (
      <Nav>
        {this.renderNavOverlay()}
        <Wrapper>
          <Title/>
          <Menu/>
        </Wrapper>
      </Nav>
    )
  }
}

const Title = () => (
  <Link to="/">
    <span>🐫 and 🐍</span>
  </Link>
)

const NavStyle = `
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-weight: bold;
    text-decoration: none;
    color: #303030;
    font-size: 1.2em;
  }
`

const Wrapper = styled.div`
  width: 100%;
  padding: 72px 0 56px 0;
  ${media.tablet`padding: 48px 16px;`}
  ${NavStyle}
`

const TitleOverlay = styled.div`
  z-index: 1;
  left: 0;
  right: 0;
  top: -150px;
  padding: 16px;
  position: fixed;
  background-color: #fff;
  transition: top 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
  border-bottom: 1px solid #ddd;
  ${props => props.isCollapsed && `
    top: 0;
  `}
`

const Nav = styled.nav`
  width: 100%;
  margin: 0 auto;
  max-width: 960px;
  ${NavStyle}  
`
