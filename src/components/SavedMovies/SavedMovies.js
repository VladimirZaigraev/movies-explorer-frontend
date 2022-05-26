//SavedMovies — компонент страницы с сохранёнными карточками фильмов
import React from 'react'
import './index.sass'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { filterMovies } from '../../utils/helpers'

export const SavedMovies = ({ isLoggedIn, saveMovies, setSaveMovies, handleFilm, shortSaveMovie, setShortSaveMovie, deleteMovie, preloader }) => {

  let moviesSort = filterMovies(saveMovies, shortSaveMovie)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="movies">
        <div className="container movies__container">
          <SearchForm
            handleFilm={handleFilm}
            short={shortSaveMovie}
            setShort={setShortSaveMovie}
          />
          <MoviesCardList
            movies={moviesSort}
            setMovies={setSaveMovies}
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
