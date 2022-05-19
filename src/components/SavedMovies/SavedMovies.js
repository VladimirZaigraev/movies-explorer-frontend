//SavedMovies — компонент страницы с сохранёнными карточками фильмов
import React from 'react'
import './index.sass'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const SavedMovies = ({ isLoggedIn, saveMovies, setSaveMovies }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="movies">
        <div className="container movies__container">
          <SearchForm />
          <MoviesCardList
            movies={saveMovies}
            setMovies={setSaveMovies}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}
