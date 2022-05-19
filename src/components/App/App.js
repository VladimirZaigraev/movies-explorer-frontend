import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies'
import { Login } from '../Login/Login';
import { Register } from '../Register/Register'
import { Profile } from '../Profile/Profile';
import { Error } from '../Error/Error';
import './App.sass';
import * as MoviesApi from '../../utils/MoviesApi.js'
import * as MainApi from '../../utils/MainApi.js'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const history = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoToolTipData, setInfoToolTipData] = useState({});

  useEffect(() => {
    MoviesApi.getMovies()
      .then((movie) => {
        setMovies(movie)
      })
  }, [])

  const onRegister = (name, email, password) => {
    console.log(name, email, password)
    return MainApi
      .register(name, email, password)
      .then((email) => {
        if (email) {
          setLoggedIn(true);
          setInfoToolTipData({
            icon: true,
            message: "Вы успешно зарегистрировались!"
          });
          // history.push("/sign-in");
        }
      })
      .catch((err) => {
        setInfoToolTipData({
          icon: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        if (err === "Ошибка: 400")
          MainApi.showError(err, " некорректно заполнено одно из полей ");
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Main />} />

            <Route path="/movies" element={
              <Movies
                movies={movies}
                setMovies={setMovies}
              />} />

            <Route path="/saved-movies" element={<SavedMovies />} />

            <Route path="/signin" element={<Login />} />

            <Route path="/signup" element={
              <Register
                onRegister={onRegister} />}
            />

            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<Error />} />

          </Routes>
        </BrowserRouter>

      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
