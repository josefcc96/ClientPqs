import React,{useContext} from 'react'
import {Offcanvas, Button, Card, Row, Col} from 'react-bootstrap'
import Line from '../Line'
import { AuthContext } from '../../context/AuthContext';
import {FaUserAlt, FaMailBulk} from 'react-icons/fa'

const OffCanva = ({handleClose, show, dataperfil = {}}) => {
  const { logout,authState} = useContext(AuthContext);
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={false}
        backdrop={false}
        placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Usuario</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            {/* <Card.Header>
              <Card.Title as="h5">Datos generales</Card.Title>
            </Card.Header> */}
            <Card.Body>
              <Row>
                <Col>
                  <div>
                    <FaUserAlt size={'1em'} />
                    <label
                      style={{fontWeight: 'bold'}}
                      className="ms-2 panel-title">
                      Nombre
                    </label>
                    <p className="ms-4"> {authState.userInfo.nombre}</p>
                  </div>
                  <Line />
                  <div>
                    <FaMailBulk size={'1em'} />
                    <label
                      style={{fontWeight: 'bold'}}
                      className="ms-2 panel-title">
                      Correo
                    </label>
                    <p className="ms-4">{authState.userInfo.email}</p>
                  </div>
                  <Line />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="d-grid gap-2 mt-2">
                <Button
                  variant="secondary"
                  type="button"
                  size="md"
                  style={{
                    backgroundColor: '#4badf1',
                    color: 'white',
                    borderColor: '#4badf1',
                  }}
                  onClick={logout}>
                  Cerrar sesion
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffCanva
