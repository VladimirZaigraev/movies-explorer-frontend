// Header — компонент отрисовывает шапку сайта на страницу.
import React from 'react'
import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import './Header.sass'

export const Header = () => {
  return (
    <div className='header'>
      <div className="header__wrapper">
        <Logo />
        <Navigation />
      </div>
    </div>
  )
}

