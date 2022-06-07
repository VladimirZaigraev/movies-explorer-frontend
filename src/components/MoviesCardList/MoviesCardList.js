//MoviesCardList — компонент управляет отрисовкой карточек фильмов на страницу и их количеством.
import React, { useState } from 'react'
import './MoviesCardList.sass'
import { MoviesCard } from '../MoviesCard/MoviesCard'
import { Preloader } from "../Preloader/Preloader";

export const MoviesCardList = ({ movies, setMovies, saveMovieData, addMovie, deleteMovie, saveMovies, preloader }) => {
  const countMovies = 7;
  const [counter, setCounter] = useState(countMovies);

  const plusCounter = () => {
    const newCounter = counter + counter;
    setCounter(newCounter);
  };

  return (
    <section className="cards">
      {preloader ?
        <Preloader /> :
        <>
          {movies.length === 0 && <p className="cards__pargraph">НИЧЕГО НЕ НАЙДЕНО</p>}
          <ul className="cards__list list">
            {
              movies.slice(0, counter).map((movie) => {
                return (
                  < MoviesCard
                    key={movie._id === undefined ? movie.id : movie._id}
                    key_id={movie._id}
                    keyId={movie.id}
                    movie={movie}
                    nameMovie={movie.nameRU}
                    linkImage={`https://api.nomoreparties.co/${movie.image.url}`}
                    trailerLink={movie.trailerLink}
                    movieDuration={movie.duration}
                    addMovie={addMovie}
                    deleteMovie={deleteMovie}
                    saveMovies={saveMovies}
                    saveMovieData={saveMovieData} />
                )
              })
            }
          </ul>
          {counter < movies.length ? <button className="cards__button" onClick={plusCounter}>Ещё</button> : ''}
        </>}

    </section>
  )
}
