import React from 'react'
import {Carousel} from 'react-bootstrap'

const Carousels = () => {
  return (
    <Carousel fade interval={2500}>
      <Carousel.Item style={{height: '100vh'}}>
        <img
          height="100%"
          className="d-block "
          src={process.env.PUBLIC_URL +'/img/slide1.jpg'}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Reto técnico Atome</h3>
          <p>
            Una guardería de mascotas desea realizar la administración de los
            animalitos que tiene a cargo
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height: '100vh', color: 'black !important'}}>
        <img
          height="100%"
          className="d-block "
          src={process.env.PUBLIC_URL +'/img/slide2.jpg'}
          alt="Second slide"
        />
        <Carousel.Caption >
          <h3 style={{color: 'black'}}>PQS</h3>
          <p style={{ color: 'black'}} >
            Esta prueba la diseñamos con el fin de que puedas mostrar tu
            capacidad de entender una necesidad y convertirla en software..
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{height: '100vh'}}>
        <img
          height="100%"
          className="d-block"
          src={process.env.PUBLIC_URL +'/img/slide3.jpg'}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Reto técnico Atome</h3>
          <p>
            La guardería tiene a su cargo un volumen significativo de mascotas
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Carousels
