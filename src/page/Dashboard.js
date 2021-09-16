import React, {useState} from 'react'
import AdminNavbar from '../components/Navbars/AdminNavbar'
// import Accordio from '../components/Sidebar/Accordio'
import OffCanvas from '../components/Navbars/Offcanva'
import {Navbar,NavDropdown, Nav, Container, Row, Col} from 'react-bootstrap'
// import {useHistory} from 'react-router-dom'

function Dashboard({children}) {
  // const history = useHistory()
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)
  const handleClose = () => setShow(false)

  return (
    <Container fluid>
      <Row style={{height: '100vh'}}>
        {/* sidebar */}
        <Col
          xs={12}
          sm={3}
          md={2}
          id="sidebar-wrapper"
          className="m-0 pr-1 color-sidebar text-center">
          <Navbar
            collapseOnSelect
            variant="dark"
            className="flex-column"
            style={{justifyContent: 'center'}}>
            <Navbar.Brand
              className="mx-4 "
              href="/">
              Mascotas
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Menu" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    href="/propietarios">
                    Crear propietario
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/mascotas">
                    Crear mascota
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">
                    Inicio
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <AdminNavbar toggleShow={toggleShow} style={{height: '100vh'}} />
          </Navbar>
          <OffCanvas show={show} handleClose={handleClose} />
        </Col>
        {/* contenedor */}
        <Col
          xs={12}
          sm={9}
          md={10}
          onClick={handleClose}
          id="page-content-wrapper"
          className="mt-3 rounded-pill"
          style={{radius: 20}}>
          <Container className="container-fluid">{children}</Container>
        </Col>
      </Row>
    </Container >
  )
}

export default Dashboard
