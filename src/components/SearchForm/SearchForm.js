//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React, { useEffect } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import './SearchForm.sass'
import { useInput } from '../../hooks/useInput'
import { useValidation } from '../../hooks/useValidation'

export const SearchForm = ({ handleFilm, short, setShort, setClearInput }) => {
  const search = useInput('')
  const searchValidation = useValidation(search.value, { minLength: 2 })

  console.log('SearchForm isDirty', search.isDirty)
  // if (search.isDirty && search.length === 0) {
  //   setFocusInput(focusInput)
  // } else {
  //   setFocusInput(!focusInput)
  // }
  useEffect(() => {
    if (search.value.length === 0) {
      setClearInput(false)
      console.log('setClearInput', false)
    } else {
      setClearInput(true)
    }
  }, [search.value.length]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilm(search.value, short)
  };

  return (
    <form className="search-form" type="submit" onSubmit={handleSubmit}>
      <fieldset className="search-form__search search">
        <input
          className="search__input input"
          type="search"
          placeholder="Фильм"
          value={search.value}
          onBlur={event => search.onBlur(event)}
          onChange={event => search.onChange(event)}
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
