import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const menus = [ 
  {name: 'Posts', route: '/'},
  {name: 'About', route: '/about'}
]

export const Menu = () => (
  <Menus>
    {menus.map((menu, index) => 
      <Li key={index}>
        <Link to={menu.route}>
        {menu.name}
        </Link>
      </Li>
    )}
  </Menus>
)

const Menus = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const Li = styled.li`
  & + & {
    margin-left: 24px;
  }
`
