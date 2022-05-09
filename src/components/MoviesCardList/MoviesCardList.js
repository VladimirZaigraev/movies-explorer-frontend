//MoviesCardList — компонент управляет отрисовкой карточек фильмов на страницу и их количеством.
import React, { useState, useEffect } from 'react'
import './MoviesCardList.sass'
import { MoviesCard } from '../MoviesCard/MoviesCard'
import * as beatfilmMovies from '../../utils/beatfilmMovies.js'

export const MoviesCardList = () => {
  const countMovies = 7;
  const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(countMovies);
  useEffect(() => {
    beatfilmMovies.getMovies()
      .then((movie) => {
        setMovies(movie)
      })
  }, [])

  const plusCounter = () => {
    const newCounter = counter + counter;
    setCounter(newCounter);
  };

  return (
    <section className="cards">
      <ul className="cards__list list">
        {
          movies.slice(0, counter).map((movie) => {
            console.log(movie.duration)
            return (
              < MoviesCard
                key={movie.id}
                nameMovie={movie.nameRU}
                linkImage={`https://api.nomoreparties.co/${movie.image.url}`}
                movieDuration={movie.duration} />
            )
          })
        }
      </ul>
      <button className="cards__button" onClick={plusCounter}>Ещё</button>
    </section>
  )
}
