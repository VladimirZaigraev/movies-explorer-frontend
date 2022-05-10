//AboutMe — компонент с информацией о студенте.
import React from 'react';
import './AboutMe.sass';
import avatar from '../../images/avatar.jpeg'

const contacts = [
  {
    id: 1,
    name: 'VKonakte',
    link: 'https://vk.com/zaigraev'
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
export const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="container">
        <h3 className="about-me__title">Студент</h3>
        <div className="about-me__author author">
          <div className="author__bio author-bio">
            <div className="author__wrapper">
              <span className="author__name">Владимир</span>
              <p className="author__prossesion">Фронтенд-разработчик, 34 года</p>
              <p className="author__info">В начале 2021 года увлекся frontend разработкой. Очень быстро интерес разобраться в том, как создаются сайты, перерос в цель стать разработчиком. Начал с прохождения курсов на youtube и udemy. Все свободное время от работы направляю на изучение новых технологий и оттачивание имеющихся навыков.</p>
            </div>
            <ul className="author__contacts contacts list">
              {
                contacts.map((contact) => {
                  return (
                    <li className="contacts__item item" key={contact.id}>
                      <a
                        className="contacts__link link"
                        href={contact.link}
                        target="_blank"
                        rel='noreferrer'>
                        {contact.name}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="author__avatar avatar">
            <img src={avatar} alt="аватар" className="avatar__img" />
          </div>
        </div>
      </div>
    </section>
  )
}
