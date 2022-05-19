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
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import './App.sass';
import * as MoviesApi from '../../utils/MoviesApi.js'
import * as MainApi from '../../utils/MainApi.js'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [isEmail, setEmail] = useState('')
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoToolTipData, setInfoToolTipData] = useState({});
  console.log(currentUser)

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
          navigate("/signin");
        }
      })
      .catch((err) => {
        // console.log(err.json)
        MainApi.showError(err);
      })
    //.finally(())
  }

  // авторизация пользователя
  const onLogin = (email, password) => {
    return MainApi
      .authorize(email, password, localStorage.getItem('token'))
      .then((res) => {
        console.log(res)
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          MainApi.checkToken(res.token)
            .then((res) => {
              setEmail(res.user.email);
              setCurrentUser(res.user);
              navigate("/movies");
            })
          MainApi.getSaveMovies(res.token)
            .then((res) => {
              setSaveMovies(res.movies);
            })
          navigate("/movies");
        }
      })
      .catch((err) => {
        // if (err === "Ошибка: 400") {
        //   auth.showError(err, "не передано одно из полей");
        // } else if (err === "Ошибка: 401") {
        //   auth.showError(err, "Пользователь с данным email не найден");
        // }
      });
  }

  const onSignOut = () => {
    localStorage.removeItem('token');
    setCurrentUser({})
    setLoggedIn(false);
    setEmail("");
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <Routes>
          <Route exact path="/" element={<Main isLoggedIn={isLoggedIn} />} />

          <Route path="/movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Movies
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
              />
            </ProtectedRoute>
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedMovies
                isLoggedIn={isLoggedIn}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
              />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                isLoggedIn={isLoggedIn}
                onSignOut={onSignOut} />
            </ProtectedRoute>

          } />

          <Route path="/signin" element={
            <Login
              onLogin={onLogin} />} />

          <Route path="/signup" element={
            <Register
              onRegister={onRegister} />}
          />

          <Route path="*" element={<Error />} />

        </Routes>

      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
