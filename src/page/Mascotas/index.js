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

  const [propietarios, setPropietarios] = useState([])
  const [comportamientos, setComportamientos] = useState([])
  const [razas, setRazas] = useState([])
  const [resp, setResp] = useState(null);



  const request = async (referentes)=>{
      const response = await authAxios.get(
      `http://localhost:3001/${referentes}/`,
      {
        crossdomain: true,
      },
    );
    return response.data;
  }

  const {
    handleSubmit,
    formState: {errors},
    register,
    setValue
  } = useForm()

  useEffect(() => {
    request("propietarios").then((data) => {
      // console.log(data)
      setPropietarios(data);
    });
    request("comportamientos").then((data) => {
      // console.log(data)
      setComportamientos(data);
    });
    request("razas").then((data) => {
      // console.log(data)
      setRazas(data);
    });

    if (id)
      authAxios
        .get(`http://localhost:3001/mascotas/${id}`, {
          crossdomain: true,
        })
        .then(res => {
          console.log(res.data)
          
          setValue("nombre", res.data.nombre)
          setValue("raza", res.data.raza._id)
          setValue("propietario", res.data.propietario.id)
          setValue("comportamiento", res.data.comportamiento._id)
          setValue("fecha_nacimineto", res.data.fnacimiento.split("T")[0])
          setValue("caracteristicas_fisicas", res.data.caracFisicas)
          setValue("fecha_despa", res.data.fechaDespa.split("T")[0])

          

          // alerta({success: true, text: 'Ok'})
        })
  }, [])

  const onSubmit =  async (data, e) => {
    e.preventDefault()
    const dato={
    "nombre": data.nombre,
    "raza": data.raza,
    "fnacimiento": `${data.fecha_nacimineto}T00:00:0.000Z`,
    "comportamiento": data.comportamiento,
    "caracFisicas": data.caracteristicas_fisicas,
    "fechaDespa": `${data.fecha_despa}T00:00:0.000Z`,
    "propietario":data.propietario
    }
    if (id){
      const respuesta = await authAxios({
      method: "put",
      url: `http://localhost:3001/mascotas/${id}`,
      data: dato,
    });
    
    setResp(respuesta);
    }
    else {
      const respuesta = await authAxios({
      method: "post",
      url: `http://localhost:3001/mascotas/`,
      data: dato,

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
                {id? "Actualizar":"Crear" } Mascota
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
                              <label style={{color: 'black'}}>Nombre *</label>
                              <Form.Control
                                id="nombre"
                                name="nombre"
                                {...register('nombre', {
                                  required: true,
                                })}
                                placeholder="Nombre completo"
                                type="text"></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.nombre && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pr-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>Raza</label>
                              <Form.Select
                                id="raza"
                                name="raza"
                                {...register('raza', {})}
                                className="me-sm-2">
                                <option value="0">Seleccionar...</option>
                                {
                                  razas&& razas.map((raza, key)=>
                                  <option key={key} value={raza._id}>{raza.nombre}</option>
                                  )

                                }
                                
                              </Form.Select>
                              <Form.Text className="text-muted">
                                {errors.raza && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Fecha Nacimiento *
                              </label>
                              <Form.Control
                                {...register('fecha_nacimineto', {required: true,})}
                                id="fecha_nacimineto"
                                name="fecha_nacimineto"
                                placeholder="Direccion"
                                type="date"></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.fecha_nacimineto && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pr-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Comportamiento
                              </label>
                              <Form.Select
                                {...register('comportamiento', {})}
                                id="comportamiento"
                                name="comportamiento"
                                className="me-sm-2">
                                <option value="0">Seleccionar...</option>
                                {comportamientos && 
                                   comportamientos.map((comportamiento, key)=>
                                  <option key={key} value={comportamiento._id}>{comportamiento.comportamiento}</option>
                                  )

                                }
                              </Form.Select>
                              <Form.Text className="text-muted">
                                {errors.comportamiento && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Características físicas
                              </label>
                              <Form.Control
                                {...register('caracteristicas_fisicas', {})}
                                id="caracteristicas_fisicas"
                                name="caracteristicas_fisicas"
                                placeholder="caracteristicas_fisicas"
                                type="text"></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.caracteristicas_fisicas && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pl-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Fecha de ultima desparasitación *
                              </label>
                              <Form.Control
                                placeholder="FECHADESPA"
                                type="date"
                                {...register('fecha_despa', {required: true,})}
                                ></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.fecha_despa && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col className="pr-1 mt-3" md="6">
                            <Form.Group>
                              <label style={{color: 'black'}}>
                                Propietario *
                              </label>
                              
                              <Form.Select
                                {...register('propietario', {})}
                                className="me-sm-2"
                                id="inlineFormCustomSelect"
                                >
                                <option value="0">Seleccionar...</option>
                                {propietarios && 
                                   propietarios.map((propietario, key)=>
                                  <option key={key} value={propietario._id} >{propietario.nombre}</option>
                                  )

                                }
                              </Form.Select>
                              <Form.Text className="text-muted">
                                {errors.propietario && (
                                  <p style={{color: 'red'}}>Campo Requerido </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                          </Col>
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
