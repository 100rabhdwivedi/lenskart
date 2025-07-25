import React from 'react'
import Nav from './Nav'
import { NavLink } from 'react-router-dom'

const ProductsNav = () => {
  return (
    <>
      <Nav />
      <div className="flex justify-center font-final gap-3 md:gap-14  uppercase mt-22 md:mt-8 text-xs md:text-md">
        <NavLink to='/products'>All Glasses</NavLink>
        <NavLink to="/products/eye">Eye glasses</NavLink>
        <NavLink to="/products/sun">sun glasses</NavLink>
        <NavLink to="/products/kids"> kids glasses</NavLink>
      </div>

    </>
  )
}

export default ProductsNav