//Portfolio — компонент со ссылками на другие проекты.
import React from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../images/arrow.svg'
import './Portfolio.sass'

export const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list list">
          <li className="portfolio__item item">
            <Link className="portfolio__link portfolio-link" to='#'>
              <p className="portfolio-link__text">Статичный сайт</p> <img className="portfolio-link__arrow" src={arrow} alt="arrow" /></Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
