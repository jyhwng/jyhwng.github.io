import React from 'react'
import styled from 'styled-components'

export const Container = ({children}) => (
  <ContainerBase>{children}</ContainerBase>
)

const ContainerBase = styled.div`
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
`