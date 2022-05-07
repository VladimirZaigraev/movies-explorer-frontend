import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Logo.sass'

export const Logo = (link) => {
  return (
    <NavLink to="/" className="logo__link link">
      <img
        className="logo__img"
        src={logo}
        alt="logo" />
    </NavLink>
  )
}
