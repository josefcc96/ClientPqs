import React from 'react'
import {Accordion, Nav} from 'react-bootstrap'
import '../../styles/Dashboard.css'
import {useHistory} from 'react-router-dom'

const Accordio = () => {
  const history = useHistory()

  return (
    <Accordion defaultActiveKey="0" className="mb-3">
      <Accordion.Item eventKey="0" style={{borderRadius: 0, radius: 0}}>
        <Accordion.Header>Menu</Accordion.Header>
        <Accordion.Body>
          <Nav className="flex-column" activeKey="/">
            <Nav.Item>
              <Nav.Link
                href="#"
                eventKey="link-1"
                onClick={() => history.push('/')}>
                Inicio
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#"
                eventKey="link-1"
                onClick={() => history.push('/createPropietario')}>
                Crear propietario
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => history.push('/createMascotas')}>
                Crear mascota
              </Nav.Link>
            </Nav.Item>
            
          </Nav>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Accordio
