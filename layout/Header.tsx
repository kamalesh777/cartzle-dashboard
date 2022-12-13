/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

const Header = () => {
  const [name, setName] = useState()

  const xyz = () => {
    console.log('Hello world')
  }

  const x = {
    name: 'kamalesh',
  }
  return <div>Header</div>
}

export default Header
