//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import './SearchForm.sass'

export const SearchForm = () => {
  return (
    <div className="container">
      <form className="search-form">
        <fieldset className="search-form__search search">
          <input
            className="search__input"
            type="search"
            placeholder="Фильм" />
          <button
            className="search__button search-button">
          </button>
        </fieldset>
        <div className="search-form__short-film short-film">
          <p className="short-film__text">
            Короткометражки
          </p>
          <Checkbox />
        </div>
      </form>
    </div>

  )
}
