// MoviesCard — компонент одной карточки фильма.
import React from 'react'
import './MoviesCard.sass'
import img from '../../images/img.jpg'

export const MoviesCard = () => {
  return (
    <li className="card item">
      <div className="card__wrapper">
        <div className="card__info">
          <h5 className="card__title">Киноальманах «100 лет дизайна»</h5>
          <p className="card__duration">1ч 42м</p>
        </div>
        <button className="card__like"></button>
      </div>
      <div className="card__poster poster">
        <img className="poster__image" src={img} alt="постер фильма" />
      </div>
    </li>
  )
}
