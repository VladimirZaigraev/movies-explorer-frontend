//Promo — компонент с вёрсткой баннера страницы «О проекте».
import React from 'react'
import './index.sass'
import web from '../../images/web_img.svg'

export const Promo = () => {
  return (
    <section className='section section__promo'>
      <div className="container">
        <div className="promo">
          <div className="promo__info">
            <h1 className="promo__title">Учебный проект студента факультета <nobr>Веб-разработки.</nobr></h1>
            <span className="promo__text">
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </span>
            <button className="promo__btn">Узнать больше</button>
          </div>
          <img className="promo__img" src={web} alt="promo" />
        </div>
      </div>
    </section>

  )
}
