import React from 'react'
import {Container, Row, Form, Col} from 'react-bootstrap'
import Carousels from '../../components/Carousels'
const ContainerOnBoarding = ({
  title,
  children,
  sizelogo = {width: '170', height: '170'},
}) => {
  return (
    <Container fluid>
      <Row>
        <Col xs sm md={7} className="p-0">
          <Carousels />
        </Col>
        {/* formulario */}
        <Col xs={12} sm={12} md={5} className="p-5">
          {/* logo */}
          <Row>
            <Col xs={12} sm={12} md={12} className="m-auto">
              <Form
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: 30,
                }}>
                <Form.Label>{title}</Form.Label>
              </Form>
            </Col>
          </Row>
          {/* contenedor */}
          <Row>
            <Col md={12}>{children}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ContainerOnBoarding
