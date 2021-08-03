import React from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

// Copy
import { navCopy } from '../../../data/nav.copy'

import styles from './nav.module.scss'

const NavComp = (props) => {
  return (
    <div>
      <Navbar color='light' light expand='md' className={styles['nav-container']}>
          <Nav className="mr-auto" navbar>
            {
              navCopy.map((navItem, index) => {
                return ( 
                  <NavItem key={  index }>
                    <NavLink href={ navItem.url }>{ navItem.text }</NavLink>
                  </NavItem>
                )
              })
            }
          </Nav>
      </Navbar>
    </div>
  )
}

export default NavComp
