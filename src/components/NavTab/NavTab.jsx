//NavTab — компонент с навигацией по странице «О проекте».
import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.sass'
import { Logo } from '../Logo/Logo'

export const NavTab = () => {
  return (
    <div className="section section__nav-tab">
      <div className="container">
        <div className="nav-tab">
          <Logo />
          <ul className="nav-tab__navigation navigation list">
            <li className='navigation__signup signup item'><NavLink className='signup__link' to="/signup">Регистрация</NavLink></li>
            <li className='navigation__signin signin item'><NavLink className='signin__link' to="/signin">Войти</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
