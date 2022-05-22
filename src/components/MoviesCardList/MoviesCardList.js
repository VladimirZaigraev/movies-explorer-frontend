//MoviesCardList — компонент управляет отрисовкой карточек фильмов на страницу и их количеством.
import React, { useState, useEffect } from 'react'
import './MoviesCardList.sass'
import { MoviesCard } from '../MoviesCard/MoviesCard'

export const MoviesCardList = ({ movies, setMovies, addMovie }) => {
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
            // console.log(movie._id)
            return (
              < MoviesCard
                key={movie._id}
                myKey={movie._id}
                movie={movie}
                nameMovie={movie.nameRU}
                linkImage={`https://api.nomoreparties.co/${movie.image.url}`}
                trailerLink={movie.trailerLink}
                movieDuration={movie.duration}
                addMovie={addMovie} />
            )
          })
        }
      </ul>
      {countMovies < movies.length ? <button className="cards__button" onClick={plusCounter}>Ещё</button> : ''}
    </section>
  )
}
