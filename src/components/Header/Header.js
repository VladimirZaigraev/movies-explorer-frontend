// Header — компонент отрисовывает шапку сайта на страницу.
import React from 'react'
import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { SignNavbar } from '../SignNavbar/SignNavbar'
import './Header.sass'

export const Header = ({ isLogin }) => {

  const bagColor = isLogin ? '#202020' : '#073042'

  return (
    <header className='header' style={{ backgroundColor: bagColor }} >
      < div className="header__wrapper" >
        <Logo />
        {
          isLogin ? <Navigation /> : <SignNavbar />
        }
      </div >
    </header >
  )
}

