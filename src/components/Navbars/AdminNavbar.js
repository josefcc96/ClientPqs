import React from 'react'
import {Navbar, Nav, } from 'react-bootstrap'
import {FaOsi} from 'react-icons/fa'
import '../../styles/Dashboard.css'

function Header({toggleShow}) {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="color-nav">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link
            eventKey={2}
            href="#"
            className="mx-4"
            onClick={toggleShow}>
            <FaOsi size={'2em'} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
