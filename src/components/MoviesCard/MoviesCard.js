// MoviesCard — компонент одной карточки фильма.
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.sass'

export const MoviesCard = ({ movie, keyId, key_id, nameMovie, linkImage, trailerLink, movieDuration, addMovie, deleteMovie, saveMovies }) => {
  const location = useLocation();

  const [isLike, setIsLike] = useState(false);

  const pathName = location.pathname;
  const imgUrl = pathName === "/movies" ? "https://api.nomoreparties.co" + movie.image.url : movie.image;
  // console.log(saveMovies)

  const duration = String((movieDuration / 60).toFixed(0)) + ' ч ' + String(movieDuration % 60) + ' мин';

  useEffect(() => {
    saveMovies.map((saveMovie) => {
      if (saveMovie.movieId === movie.id) {
        return setIsLike(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMovies]);

  return (
    <li className="card item" key={keyId === undefined ? key_id : keyId}>
      <div className="card__wrapper">
        <div className="card__info">
          <h5 className="card__title">{nameMovie}</h5>
          <p className="card__duration">{duration}</p>
        </div>
        {pathName === "/saved-movies" ? (
          <button
            className="card__delete button"
            onClick={() => {
              deleteMovie(movie);
            }}
          >
          </button>
        ) : (
          <button className={`card__like button ${isLike && 'card__like_active'}`} onClick={() => {
            if (isLike) {
              deleteMovie(saveMovies.find((saveMovie) => saveMovie.movieId === movie.id));
            } else {
              addMovie(movie)
            }
            setIsLike(!isLike);
          }}></button>
        )}
      </div>
      <a href={trailerLink}
        className="card__poster poster"
        target='_blank'
        rel='noreferrer'>
        <img className="poster__image"
          src={imgUrl}
          alt={'Постер фильма:' + nameMovie} />
      </a>
    </li >
  )
}
