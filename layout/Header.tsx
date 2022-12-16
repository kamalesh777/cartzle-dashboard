/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import App from './App'

const Header = () => {
  const [name, setName] = useState()

  const xyz = () => {
    console.log('Hello world')
  }

  const x = {
    name: 'kamalesh',
  }
  return <><div>Header</div><App open={true} /></>
}

export default Header
