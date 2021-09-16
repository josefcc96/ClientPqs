import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Tab, Tabs} from 'react-bootstrap'
// import {FaRegEdit} from 'react-icons/fa'
import Dashboard from '../Dashboard'
import { FetchContext } from '../../context';
import Table, { SelectColumnFilter } from '../../components/Table';


function Home() {
  // const history = useHistory()
  // import {useHistory} from 'react-router-dom'
  const { authAxios } = useContext(FetchContext);

  const request = async (search) => {
    const proy = await authAxios.get(
      // `${process.env.REACT_APP_API_URL}/user/du/${idUsuario}/`,
      `http://localhost:3001/${search}/`,
      {
        crossdomain: true,
      },
    );
    const resps = await proy.data;
    return resps;
  };
  const [data, setData] = useState([])
  const [search, setSearch] = useState("home")


  useEffect(() => {
    search!=="0" &&
    request(search).then((data) => {
      console.log(data);
      setData(data);
    });
  }, [search])

  const columnsM = [{
      Header: 'Mascotas',
      columns: [
        {
          Header: 'Nombre de la Mascota',
          accessor: 'nombre',
          style: { Width: "10px !important" },
        },
        {
          Header: 'Fecha de Nacimiento',
          accessor: 'fnacimiento',
        },
        {
          Header: 'Raza',
          accessor: 'raza.nombre',
          style: { width: "100px !important" },
          Filter: SelectColumnFilter,
        },
        {
           Header: 'Comportamiento',
           accessor: 'comportamiento.comportamiento',
           style: { width: "100px !important" },
         },
         {
          Header: 'Ultima Desparasitacion',
          accessor: 'fechaDespa',
          style: { width: "100px !important" },
        },
        
        {
          Header: 'Propietario',
          accessor: 'propietario',
          style: { width: "100px !important" },
          Cell: function Propietario({row}){
            return row.values.propietario ? (
              <Link style={{textDecoration: "none"}} to = {`/propietarios?id=${row.original.propietario.id}`}>
                {row.values.propietario.nombre} 
              </Link>)
              :(
              <p>No tiene Dueño</p>)
              }
        },
         {
          Header: 'Vacunas',
          accessor: 'vacunasAplicadas',
          Cell: function Vacunas({row}){
            return row.values.vacunasAplicadas ? (
                <ul>
                  {row.values.vacunasAplicadas.map((vacuna) =>
                  (<li key={vacuna._id}>
                        {vacuna.vacuna.tipo} ({vacuna.fechaAplicacion}) 
                  </li>))}
                </ul>)
              :(
              <p>No tiene Vacunas</p>)
              }
        },
        {
          Header: 'Editar',
          Cell: function Mascotas({row}){
            // console.log(row)
            return (
              <div>
               <Link style={{textDecoration: "none"}} to ={`/mascotas?id=${row.original._id}`}> ✏ </Link>
            </div>
            )}
        },
  ]}];
  
  const columnsP = [
    {
      Header: 'Propietarios',
      columns: [
        {
          Header: 'Nombre completo',
          accessor: 'nombre',          
          width: 10,
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Direccion',
          accessor: 'direccion',
        },
        {
          Header: 'Telefono',
          accessor: 'telefono',
          width: 10,
        },{
          Header: 'Cedula',
          accessor: 'cedula',
          width: 10,
        },
        {
          Header: 'Mascotas',
          accessor: 'mascotas',
          Cell: function Mascotas({row}){
            console.log(row)
            return row.values.mascotas ? (
                <ul>
                  {row.values.mascotas.map((mascota) =>
                  (<li key={mascota._id}>
                    <Link style={{textDecoration: "none"}} to = {`/mascotas?id=${mascota._id}`}>
                        {mascota.nombre} ({mascota.raza.nombre}) 
                    </Link>
                  </li>))}
                </ul>)
              :(
              <p>No tiene Mascotas</p>)
              }
        },
        {
          Header: 'Editar',
          Cell: function Mascotas({row}){
            console.log(row)
            return (
              <div>
               <Link style={{textDecoration: "none"}} to ={`/propietarios?id=${row.original._id}`}> ✏ </Link>
            </div>
            )}
        },
      ],
    },
  ];
  const columnsH ={
    "mascotas":columnsM,
    "propietarios":columnsP
  }

  // const [key, setKey] = useState('home');

  return (
    <Dashboard>
      <Row className="mb-5">
        {/* menu */}
        <Col md="12">
          <Card>
            <Card.Header style={{backgroundColor:'#11273c'}}>
              <Card.Title as="h5" style={{color: '#fff'}}>
                Filtrado
              </Card.Title>
            </Card.Header>
            <Card.Body className="flex-row">
            <Tabs
              id="controlled-tab-example"
              activeKey={search}
              onSelect={(k) => setSearch(k)}
              className="mb-3"
            >
              <Tab eventKey="home" title="Inicio">
                <h3>Sistema de Administracion Guarderia </h3>
                <p> Anim sint ea voluptate ex dolor pariatur aliquip. Occaecat magna commodo id elit proident tempor occaecat do incididunt qui sit ex magna. Occaecat sunt irure deserunt cupidatat fugiat anim sint nulla.

Magna et reprehenderit culpa sint deserunt duis. Fugiat ut amet ipsum consectetur. Ex enim aliquip sunt dolore anim consectetur magna pariatur excepteur nulla aliqua elit.

Consequat anim in ad laborum do adipisicing occaecat ullamco. Laboris eiusmod in proident tempor proident aliquip. Ipsum ut ipsum incididunt consectetur deserunt magna dolore ea. Duis anim do id in. Consectetur nostrud id amet nostrud elit cillum Lorem aute pariatur est deserunt proident deserunt anim. Est nulla dolore enim minim fugiat. Ea et do nulla mollit.

Incididunt magna ad ipsum et incididunt officia officia pariatur irure dolor cillum id ea. Esse anim aliqua occaecat pariatur dolore dolor ipsum Lorem aute enim aliquip ea dolore commodo. Et magna excepteur consequat consectetur fugiat. Aliquip consectetur consequat eiusmod consequat magna do id. Consectetur ipsum elit labore enim duis nulla nisi nisi. Cupidatat magna et qui aute elit ad magna qui quis dolor cupidatat laboris.</p>
              </Tab>
              <Tab eventKey="mascotas" title="Mascotas">
              {data.length>0 && search!=='home'&&
                  <Col md="12" className="mt-3">
                    <Card className="card-user">
                      <div className="card-image"></div>
                      <Card.Header style={{backgroundColor: '#1d4367'}}>
                        <Card.Title style={{color: '#fff'}}>
                          Resultado de la busqueda
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Table columns={columnsH[search]} data={data.length>0 && data}/>
                      </Card.Body>
                    </Card>
                  </Col>
                }
              </Tab>
              <Tab eventKey="propietarios" title="Propietarios" >
              {data.length>0 && search!=='home'&&
                  <Col md="12" className="mt-3">
                    <Card className="card-user">
                      <div className="card-image"></div>
                      <Card.Header style={{backgroundColor: '#1d4367'}}>
                        <Card.Title style={{color: '#fff'}}>
                          Resultado de la busqueda
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Table columns={columnsH[search]} data={data.length>0 && data}/>
                      </Card.Body>
                    </Card>
                  </Col>
                }
              </Tab>
            </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Home
