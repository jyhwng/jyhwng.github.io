import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../../utils/style.js";

export class Footer extends Component {
  state = { isOpen: false };

  handleOpenFooter = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <>
        <FooterBase isOpen={this.state.isOpen}>
          <Wrapper>
            <p>
              Found an error? Help me correct it by submitting issues{" "}
              <a
                href="https://github.com/jyhwng/jyhwng.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
            <p>© 2017-2019 jyhwng</p>
          </Wrapper>
        </FooterBase>
        <Button onClick={this.handleOpenFooter} />
      </>
    );
  }
}

const Button = ({ onClick }) => (
  <ButtonWrapper>
    <Anchor onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12" y2="17" />
      </svg>
    </Anchor>
  </ButtonWrapper>
);

const FooterBase = styled.footer`
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #fff;
  border-top: 1px solid #ddd;
  transform: translateY(131px);
  ${media.tablet`
    transform: translateY(123px);
    ${props =>
      props.isOpen &&
      `
      transform: translateY(0);
    `}
  `} transition: transform 350ms cubic-bezier(0.23, 1, 0.32, 1);
  ${props =>
    props.isOpen &&
    `
    transform: translateY(0);
  `};
`;

const Wrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 0;
  p {
    margin: 0;
  }
  ${media.tablet`
    padding: 24px 16px;
  `};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

const Anchor = styled.a`
  display: block;
  cursor: pointer;
  svg {
    opacity: 0.5;
    width: 32px;
    height: 32px;
    stroke: #303030;
    fill: #fff;
  }
`;
