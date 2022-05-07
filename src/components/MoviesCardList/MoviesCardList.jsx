//MoviesCardList — компонент управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from 'react'
import './MoviesCardList.sass'
import { MoviesCard } from '../MoviesCard/MoviesCard'

export const MoviesCardList = () => {
  return (
    <section className="cards">
      <div className="container">
        <ul className="cards__list list">
          <MoviesCard />
        </ul>
        <button className="cards__button">Ещё</button>
      </div>
    </section>
  )
}
