import React from 'react'

const Line = ({color = '#0d335f'}) => {
  return (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  )
}

export default Line
