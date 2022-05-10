//Main — компонент страницы «О проекте». Он будет содержать только презентационные компоненты и в будущем, за исключением шапки навигации. 
import React from 'react'
import './Main.sass'

import { Promo } from '../Promo/Promo'
import { NavTab } from '../NavTab/NavTab'
import { AboutProject } from '../AboutProject/AboutProject'
import { Techs } from '../Techs/Techs'
import { AboutMe } from '../AboutMe/AboutMe'
import { Portfolio } from '../Portfolio/Portfolio'
import { Footer } from '../Footer/Footer'

export const Main = () => {
  return (
    <main className='main'>
      <NavTab />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>

  )
}