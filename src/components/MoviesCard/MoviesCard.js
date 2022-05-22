// MoviesCard — компонент одной карточки фильма.
import React, { useState } from 'react'
import './MoviesCard.sass'

export const MoviesCard = ({ movie, key, nameMovie, linkImage, trailerLink, movieDuration, addMovie }) => {
  const duration = String((movieDuration / 60).toFixed(0)) + ' ч ' + String(movieDuration % 60) + ' мин';

  const [isLike, setIsLike] = useState(false)
  const pathName = window.location.pathname;
  const imgUrl = pathName === "/movies" ? "https://api.nomoreparties.co" + movie.image.url : movie.image;

  const cardLikeButtonClassName = (
    `card__like button ${isLike && 'card__like_active'}`
  );
  const handelClick = (event) => {
    console.log(movie)
    addMovie(movie)
  }
  return (
    <li className="card item" id={key}>
      <div className="card__wrapper">
        <div className="card__info">
          <h5 className="card__title">{nameMovie}</h5>
          <p className="card__duration">{duration}</p>
        </div>
        {pathName === "/saved-movies" ? (
          <button
            className="card__delete button"
            onClick={() => {
              // handleDeleteFilm(movie);
            }}
          >
          </button>
        ) : (
          <button className={cardLikeButtonClassName} onClick={() => {
            if (isLike) {
              // handleDeleteFilm(saveCards.find((saveCard) => saveCard.movieId === card.id));
            } else {
              // handleSaveFilm(card);
            }
            setIsLike(!isLike);
          }}></button>
        )}

      </div>
      <a href={trailerLink}
        className="card__poster poster"
        target='_blank'
        rel='noreferrer'>
        <img className="poster__image" src={imgUrl} alt={'Постер фильма:' + nameMovie} />
      </a>
    </li >
  )
}
