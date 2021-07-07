import React from 'react'
import styled from 'styled-components'

export const Tag = ({ children }) => (
  <Base>{children}</Base>
)

const Base = styled.span`
  display: inline-block;
  font-size: 13px;
  background-color: #fbe134;
  padding: 2px 4px;
  margin-right: 8px;
  margin-bottom: 4px;
  text-transform: lowercase;
  font-family: PT Mono;
`;
