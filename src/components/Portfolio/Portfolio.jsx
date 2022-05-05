//Portfolio — компонент со ссылками на другие проекты.
import React from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../images/arrow.svg'
import './Portfolio.sass'

const portfolioSite = [
  {
    id: 1,
    title: "Статичный сайт",
    link: "https://vladimirzaigraev.github.io/how-to-learn/",
  },
  {
    id: 2,
    title: "Адаптивный сайт",
    link: "https://vladimirzaigraev.github.io/russian-travel/",
  },
  {
    id: 3,
    title: "Одностраничное приложение",
    link: "https://zaigraev.nomoredomains"
  }
]

export const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list list">
          {
            portfolioSite.map((elem) => {
              return (
                <li className="portfolio__item item" key={elem.id}>
                  <Link className="portfolio__link portfolio-link" to={elem.link}>
                    <p className="portfolio-link__text">{elem.title}</p>
                    <img className="portfolio-link__arrow" src={arrow} alt="arrow" />
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}
