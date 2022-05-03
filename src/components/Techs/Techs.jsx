//Techs — компонент с использованными технологиями.
import React from 'react'
import './Techs.sass'

const techs = [
  {
    id: 1,
    tech: 'HTML'
  },
  {
    id: 2,
    tech: 'CSS'
  },
  {
    id: 3,
    tech: 'JS'
  },
  {
    id: 4,
    tech: 'React'
  },
  {
    id: 5,
    tech: 'Git'
  },
  {
    id: 6,
    tech: 'Express.js'
  },
  {
    id: 7,
    tech: 'mongoDB'
  },]

export const Techs = () => {
  return (
    <section className='section section__techs techs' >
      <div className="container">
        <h3 className="techs__title">Технологии</h3>
        <div className="techs__info techs-info">
          <span className="techs-info__title">7 технологий</span>
          <p className="techs-info__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__list list">
            {
              techs.map((elem) => {
                return (<li className="techs__item item" key={elem.id}>{elem.tech}</li>)
              })
            }
          </ul>
        </div>
      </div>
    </section >
  )
}
