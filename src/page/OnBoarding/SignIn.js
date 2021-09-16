import React,{useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory} from 'react-router-dom'
import { Form,  Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import ContainerOnBoarding from './ContainerOnBoarding'
import Axios from 'axios'
import '../../styles/Dashboard.css'

const SignIn = () => {

  const {
    handleSubmit,
    formState: {errors},
    register,
  } = useForm() 

  const history = useHistory()
  // const handleIniciar = () => {
  //   history.push('/home')
  // }

  const { setAuthState } = useContext(AuthContext);
  

  const onSubmit = async (values,e) => {
    console.log(values)
    try{
      const respuesta = await Axios({
        method: 'post',
        url: `http://localhost:3001/login`,
        data: values,
      });

      const { data } = respuesta;
      setAuthState(data);
      console.log(respuesta);
      history.push('/');
    }
    catch(error){
      // setMessLogin(error.response)
      console.log(error.response)
      }

    
  }

  return (
    <ContainerOnBoarding title="Iniciar sesion">
     <Form onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group className="mb-3">
                              <label style={{color: 'black'}}>Email</label>
                              <Form.Control
                                id="email"
                                name="email"
                                type="email"
                                {...register('email', {
                                  required: true,
                                })}
                                placeholder="Correo Electronico"
                                ></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.email && (
                                  <p style={{color: 'red'}}>errors.email </p>
                                )}
                              </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                              <label style={{color: 'black'}}>Contraseña</label>
                              <Form.Control
                                id="contrasena"
                                name="contrasena"
                                type="password"
                                {...register('contrasena', {
                                  required: true,
                                })}
                                placeholder="Ingresar contraseña"
                                ></Form.Control>
                              <Form.Text className="text-muted">
                                {errors.contrasena && (
                                  <p style={{color: 'red'}}>errors.contrasena </p>
                                )}
                              </Form.Text>
                            </Form.Group>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="color-button-invemar"
            style={{backgroundColor: '#4badf1', color: 'white',borderColor:'#4badf1'}}
            >
            Iniciar sesion
          </Button>
        </div>
      
      </Form>
    </ContainerOnBoarding>
  )
}

export default SignIn
