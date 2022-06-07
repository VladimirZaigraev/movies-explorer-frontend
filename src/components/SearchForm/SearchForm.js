//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React, { useState } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import './SearchForm.sass'

export const SearchForm = () => {

  const [search, setSearch] = useState('');
  const [isValid, setValidity] = useState(false);
  const [error, setError] = useState('');
  const [short, setShort] = useState(true);
  console.log(short)

  const changeHandlerSearch = (event) => {
    const input = event.target
    setSearch(input.value)
    setValidity(input.validity.valid)
    if (!isValid) {
      setError(input.validationMessage)
    } else {
      setError('')
    }
    console.log(search)
  }
  return (
    <form className="search-form" type="submit">
      <fieldset className="search-form__search search">
        <input
          className="search__input input"
          type="search"
          placeholder="Фильм"
          value={search}
          required
          onChange={changeHandlerSearch}
          minLength="2"
          maxLength="30" />
        <button
          className="search__button search-button"
          disabled={!isValid} >
        </button>
        <span className="form__input-erorr search-form__error" id="password-error">{error}</span>
      </fieldset>
      <div className="search-form__short-film short-film">
        <p className="short-film__text">
          Короткометражки
        </p>
        <Checkbox
          short={short}
          setShort={setShort} />
      </div>
    </form>
  )
}
