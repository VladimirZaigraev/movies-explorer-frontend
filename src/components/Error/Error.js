import React from 'react'
import { Link } from 'react-router-dom'
import './Error.sass'

export const Error = () => {
  return (
    <section className="error">
      <div className="container error__container">
        <div className="error__wrapper">
          <h1 className="error__title">404</h1>
          <span className="error__subtitle">Страница не найдена</span>
        </div>
        <Link className="error__link link" to="/">Назад</Link>
      </div>
    </section>
  )
}
