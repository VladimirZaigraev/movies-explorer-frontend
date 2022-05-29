//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Checkbox } from '../Checkbox/Checkbox'
import './SearchForm.sass'
// import { useInput } from '../../hooks/useInput'
import { useValidation } from '../../hooks/useValidation'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export const SearchForm = ({ handleFilm, short, setShort, setSearchLength }) => {

  const [search, setSearch] = useState('')
  const searchValidation = useValidation(search, { minLength: 2 })

  const location = useLocation();
  const pathName = location.pathname;

  const {
    value: moviesValue,
    setValue: setMoviesValue
  } = useLocalStorage("moviesValue", localStorage.getItem("moviesValue") || '');

  const {
    value: savedMoviesValue,
    setValue: setSavedMoviesValue
  } = useLocalStorage("savedMoviesValue", localStorage.getItem("savedMoviesValue") || '');

  const searchRef = useRef(search);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    if (pathName === "/movies") {
      setMoviesValue(searchRef.current)
    } else if (pathName === "/saved-movies") {
      setSavedMoviesValue(searchRef.current)
    }
  }, [search]);

  useEffect(() => {
    if (pathName === "/movies") {
      setSearch(moviesValue)
    } else if (pathName === "/saved-movies") {
      setSearch(savedMoviesValue)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilm(search, short)
  };

  const handelChange = (event) => {
    setSearch(event.target.value)
    setSearchLength(event.target.value.length)
  }

  return (
    <form className="search-form" type="submit" onSubmit={handleSubmit}>
      <fieldset className="search-form__search search">
        <input
          className="search__input input"
          type="search"
          placeholder="Фильм"
          value={search}
          onChange={event => handelChange(event)}
          required
          minLength="2"
          maxLength="30" />
        <button
          className="search__button search-button"
          disabled={!searchValidation.minLengthError} >
        </button>
        <span className="form__input-erorr search-form__error" id="password-error">{searchValidation.minLengthErrorMessage}</span>
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
