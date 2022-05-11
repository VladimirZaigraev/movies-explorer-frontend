//Main — компонент страницы «О проекте». Он будет содержать только презентационные компоненты и в будущем, за исключением шапки навигации. 
import React from 'react'
import './Main.sass'
import { Header } from '../Header/Header';
import { Promo } from '../Promo/Promo'
import { AboutProject } from '../AboutProject/AboutProject'
import { Techs } from '../Techs/Techs'
import { AboutMe } from '../AboutMe/AboutMe'
import { Portfolio } from '../Portfolio/Portfolio'
import { Footer } from '../Footer/Footer';

export const Main = () => {
  console.log('main')
  return (
    <>
      <Header isLogin={false} />
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>


  )
}
