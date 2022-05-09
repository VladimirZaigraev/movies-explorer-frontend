import React from 'react'
// import { Link } from 'react-router-dom'
import './Footer.sass'

const footerLink = [
  {
    id: 1,
    name: 'Яндекс.Практикум',
    link: 'https://practicum.yandex.ru/',
  },
  {
    id: 2,
    name: 'Github',
    link: 'https://github.com/VladimirZaigraev'
  },
  {
    id: 3,
    name: 'Telegram',
    link: '@Vladimir_Zaigraev'
  },
]

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__info">
          <p className="footer__copiraiting">&#169;{new Date().getFullYear()}</p>
          <ul className="footer__list footer-list list">
            {
              footerLink.map((elem) => {
                return (
                  <li className="footer-list__item item" key={elem.id}>
                    <a
                      className="footer-list__link link"
                      href={elem.link}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {elem.name}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </footer>
  )
}
