//Movies — компонент страницы с поиском по фильмам.
import React from 'react'
import './Movies.sass'
import { Header } from '../Header/Header'
import { SearchForm } from '../SearchForm/SearchForm'
import { Footer } from '../Footer/Footer'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'

export const Movies = () => {
  return (
    <div className='movies'>
      <div className="movies__container">
        <Header />
        <SearchForm />
        <MoviesCardList />
      </div>
      <Footer />
    </div>
  )
}
