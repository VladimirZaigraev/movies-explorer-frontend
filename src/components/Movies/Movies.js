//Movies — компонент страницы с поиском по фильмам.
import React from 'react'
import './Movies.sass'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const Movies = ({ movies, setMovies }) => {
  return (
    <>
      <Header isLogin={true} />
      <section className="movies">
        <div className="container movies__container">
          <SearchForm />
          <MoviesCardList
            movies={movies}
            setMovies={setMovies}
          />
        </div>
      </section>
      <Footer />
    </>

  )
}
