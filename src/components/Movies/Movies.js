//Movies — компонент страницы с поиском по фильмам.
import React from 'react'
import './Movies.sass'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { filterMovies } from '../../utils/helpers'

export const Movies = ({ isLoggedIn, movies, setMovies, handleFilm, short, setShort, addMovie, deleteMovie, saveMovies, preloader, search, setSearch, setSearchLength, saveMovieData }) => {

  let moviesSort = filterMovies(movies, short)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="movies">
        <div className="container movies__container">
          <SearchForm
            handleFilm={handleFilm}
            short={short}
            setShort={setShort}
            setSearchLength={setSearchLength}
            search={search}
            setSearch={setSearch}
          />
          <MoviesCardList
            movies={moviesSort}
            setMovies={setMovies}
            saveMovieData={saveMovieData}
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
