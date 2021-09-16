import React from 'react'

const NotFound = () => {
  return (
    <div className="m-auto" style={{backgroundColor: 'black', height: '100vh'}}> 
        <img
          height="100%"
          className=" m-auto d-block "
          src={process.env.PUBLIC_URL +'/img/notFound.jpeg'}
          alt="First slide"
        />
    </div>
  )
}

export default NotFound
