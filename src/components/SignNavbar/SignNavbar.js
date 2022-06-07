import React from 'react'
import { NavLink } from 'react-router-dom'
import './SignNavbar.sass'

export const SignNavbar = () => {
  return (
    <ul className="sign-navbar__list list">
      <li className='sign-navbar__item sign-navbar__signup signup__item item'>
        <NavLink className='sign-navbar__link link' to="/signup">Регистрация</NavLink>
      </li>
      <li className='sign-navbar__item sign-navbar__signin signin__item item'>
        <NavLink className='sign-navbar__link signin-item__link link' to="/signin">Войти</NavLink>
      </li>
    </ul>
  )
}
