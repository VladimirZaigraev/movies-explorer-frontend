//MoviesCardList — компонент управляет отрисовкой карточек фильмов на страницу и их количеством.
import React, { useState, useEffect } from 'react'
import './MoviesCardList.sass'
import { MoviesCard } from '../MoviesCard/MoviesCard'

export const MoviesCardList = ({ movies, setMovies }) => {
  const countMovies = 7;
  const [counter, setCounter] = useState(countMovies);

  const plusCounter = () => {
    const newCounter = counter + counter;
    setCounter(newCounter);
  };

  return (
    <section className="cards">
      <ul className="cards__list list">
        {
          movies.slice(0, counter).map((movie) => {
            return (
              < MoviesCard
                key={movie.id}
                nameMovie={movie.nameRU}
                linkImage={`https://api.nomoreparties.co/${movie.image.url}`}
                trailerLink={movie.trailerLink}
                movieDuration={movie.duration} />
            )
          })
        }
      </ul>
      <button className="cards__button" onClick={plusCounter}>Ещё</button>
    </section>
  )
}
