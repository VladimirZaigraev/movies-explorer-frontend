//Portfolio — компонент со ссылками на другие проекты.
import React from 'react'
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
    link: "https://zaigraev.nomoredomains.work"
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
                  <a
                    className="portfolio__link portfolio-link link"
                    target='_blank'
                    rel='noreferrer'
                    href={elem.link}>
                    <p className="portfolio-link__text">{elem.title}</p>
                    <img className="portfolio-link__arrow" src={arrow} alt="arrow" />
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}
