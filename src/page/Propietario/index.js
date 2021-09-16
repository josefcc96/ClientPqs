import React, {useEffect, useState,useContext} from 'react'
import Dashboard from '../Dashboard'
import {Button, Card, Row, Col, Form} from 'react-bootstrap'
import {useLocation} from 'react-router-dom';

import {Message} from '../../components'
import {useForm} from 'react-hook-form'
import { FetchContext } from '../../context/FetchContext';


const index = () => {
  const { authAxios } = useContext(FetchContext);

  const id = useLocation().search.split('=')[1];
  const [resp, setResp] = useState(null);

  const {
    handleSubmit,
    formState: {errors},
    register,
    setValue
  } = useForm()


    useEffect(() => {
    if (id)
      authAxios
        .get(`http://localhost:3001/propietarios/${id}`, {
          crossdomain: true,
        })
        .then(res => {
          console.log(res.data)
          
          setValue("nombre", res.data.nombre)
          setValue("cedula", res.data.cedula)
          setValue("direccion", res.data.direccion)
          setValue("email", res.data.email)
          setValue("telefono", res.data.telefono)          

          // alerta({success: true, text: 'Ok'})
        })
  }, [])  

const onSubmit =  async (data, e) => {
    e.preventDefault()
    if (id){
      const respuesta = await authAxios({
      method: "put",
      url: `http://localhost:3001/propietarios/${id}`,
      data: data,
    });
    
    setResp(respuesta);
    }
    else {
      const respuesta = await authAxios({
      method: "post",
      url: `http://localhost:3001/propietarios/`,
      data: data,

    });
    setResp(respuesta);
    }

  }

  return (
    <Dashboard>
      <Row className="mb-0">
        {/* menu */}
        <Col md="12" className="mt-5">
          {resp ? <Message response={resp} /> : ""}
          <Card>
            <Card.Header style={{backgroundColor: '#11273c'}}>
              <Card.Title as="h5" style={{color: '#fff'}}>
                {id? "Actualizar":"Crear" } Propietario
              </Card.Title>
            </Card.Header>
            <Card.Body className="flex-row">
              <Row>
                <Col sm={6} md={12}>
                  <Card
                    text={'white'}
                    style={{
                      backgroundColor: '#EEEEEE',
                    }}>
                    <Card.Body>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                          <Col className="pr-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Nombre completo *
                              </label>
                              <Form.Control
                                placeholder="Nombre completo"
                                type="text"
                                {...register('nombre', {
                                  required: true,
                                })}
                                ></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.nombre && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>Email *</label>
                              <Form.Control
                                placeholder="Correo electronico"
                                type="email"
                                {...register('email', {
                                  required: true,
                                })}></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.nombre && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Dirección *
                              </label>
                              <Form.Control
                                placeholder="Direccion"
                                type="text"
                                {...register('direccion', {
                                  required: true,
                                })}></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.nombre && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Teléfono de contacto *
                              </label>
                              <Form.Control
                                placeholder="Telefono"
                                type="number"
                                {...register('telefono', {
                                  required: true,
                                })}></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.nombre && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>Cedula</label>
                              <Form.Control
                                placeholder="Cedula"
                                type="text"
                                {...register('cedula', {
                                  required: true,
                                })}></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.nombre && (
                                  <p style={{color: 'red'}}>Error en el campo </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          {/* <Col className="pr-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>Correo</label>
                              <Form.Select
                                className="me-sm-2"
                                id="inlineFormCustomSelect">
                                <option value="0">Seleccionar...</option>
                                <option value="1">Mascota</option>
                                <option value="2">Propietario</option>
                              </Form.Select>
                              <Form.Text className="text-muted">
                                {errors.nombre && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col> */}

                          <Col xs="auto" className="my-1" md="12">
                            <Button type="submit">{id? "Actualizar":"Crear" }</Button>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  )
}

export default index
