//SavedMovies — компонент страницы с сохранёнными карточками фильмов
import React from 'react'
import './index.sass'
import { SearchForm } from '../SearchForm/SearchForm'
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const SavedMovies = () => {
  return (
    <>
      <Header isLogin={true} />
      <section className="movies">
        <div className=" container movies__container">
          <SearchForm />
          <MoviesCardList />
        </div>
      </section>
      <Footer />
    </>
  )
}
