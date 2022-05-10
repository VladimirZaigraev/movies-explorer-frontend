// MoviesCard — компонент одной карточки фильма.
import React from 'react'
import './MoviesCard.sass'

export const MoviesCard = ({ nameMovie, linkImage, trailerLink, movieDuration }) => {
  const duration = String((movieDuration / 60).toFixed(0)) + ' ч ' + String(movieDuration % 60) + ' мин';

  const isLiked = false //временнно

  const cardLikeButtonClassName = (
    `card__like button ${isLiked && 'card__like_active'}`
  );

  return (
    <li className="card item" >
      <div className="card__wrapper">
        <div className="card__info">
          <h5 className="card__title">{nameMovie}</h5>
          <p className="card__duration">{duration}</p>
        </div>
        <button className={cardLikeButtonClassName}></button>
      </div>
      <a href={trailerLink}
        className="card__poster poster"
        target='_blank'
        rel='noreferrer'>
        <img className="poster__image" src={linkImage} alt={'Постер фильма:' + nameMovie} />
      </a>
    </li>
  )
}