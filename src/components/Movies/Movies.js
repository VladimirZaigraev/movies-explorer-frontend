//Movies — компонент страницы с поиском по фильмам.
import React from 'react'
import './Movies.sass'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { filterMovies } from '../../utils/helpers'

export const Movies = ({ isLoggedIn, movies, setMovies, handleFilm, shortMovie, setShortMovie, addMovie, deleteMovie, saveMovies, setClearInputMovie, preloader }) => {

  let moviesSort = filterMovies(movies, shortMovie)
  console.log('Movies ', shortMovie)
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="movies">
        <div className="container movies__container">
          <SearchForm
            handleFilm={handleFilm}
            short={shortMovie}
            setShort={setShortMovie}
            setClearInput={setClearInputMovie}
          />
          <MoviesCardList
            movies={moviesSort}
            setMovies={setMovies}
            addMovie={addMovie}
            deleteMovie={deleteMovie}
            saveMovies={saveMovies}
            preloader={preloader}
          />
        </div>
      </section>
      <Footer />
    </>

  )
}
