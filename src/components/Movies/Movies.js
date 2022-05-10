//Movies — компонент страницы с поиском по фильмам.
import React from 'react'
import './Movies.sass'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'

export const Movies = () => {
  return (
    <section className="movies">
      <div className=" container movies__container">
        <SearchForm />
        <MoviesCardList />
      </div>
    </section>
  )
}
