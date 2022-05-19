// Header — компонент отрисовывает шапку сайта на страницу.
import React from 'react'
import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { SignNavbar } from '../SignNavbar/SignNavbar'
import './Header.sass'

export const Header = ({ isLoggedIn }) => {

  return (
    <header className='header' >
      < div className="header__wrapper" >
        <Logo />
        {
          isLoggedIn ? <Navigation /> : <SignNavbar />
        }
      </div >
    </header >
  )
}

