import React from 'react'
import {Alert} from 'react-bootstrap'

const index = ({text, variant}) => {
  return <Alert variant={variant}>{text}</Alert>
}

export default index
