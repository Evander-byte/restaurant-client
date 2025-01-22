import React from 'react'
import { Link } from 'react-router'

const Menu = () => {
  return (
    <>
      <h1 className="text-3xl fontlight mb-4">Menu</h1>
      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-3 text-white uppercase font-bold rounded-2xl"
      >Add dishe</Link>
    </>
  )
}

export default Menu