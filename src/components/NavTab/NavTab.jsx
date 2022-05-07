//NavTab — компонент с навигацией по странице «О проекте».
import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavTab.sass'
import { Logo } from '../Logo/Logo'

export const NavTab = () => {
  return (
    <div className="section section__nav-tab">
      <div className="nav-tab">
        <Logo />
        <ul className="nav-tab__list list">
          <li className='nav-tab__item nav-tab__signup item'>
            <NavLink className='nav-tab__link link' to="/signup">Регистрация</NavLink>
          </li>
          <li className='nav-tab__item nav-tab__signin item'>
            <NavLink className='nav-tab__link link' to="/signin">Войти</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
