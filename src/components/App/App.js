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
import { AutoriseProtectedRoute } from '../AutoriseProtectedRoute/AutoriseProtectedRoute'
import './App.sass';
import * as MoviesApi from '../../utils/MoviesApi.js'
import * as MainApi from '../../utils/MainApi.js'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ user: '', email: '' });
  const [isEmail, setEmail] = useState('')
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [chekStatusErrorServer, setChekStatusErrorServer] = useState(false);

  const [errorServerMessage, setErrorServerMessage] = useState('')
  console.log('currentUser', currentUser)

  useEffect(() => {
    MoviesApi.getMovies()
      .then((movie) => {
        setMovies(movie)
      })
  }, [isLoggedIn])

  const onRegister = (name, email, password) => {
    // console.log(name, email, password)
    return MainApi
      .register(name, email, password)
      .then((email) => {
        if (email) {
          setLoggedIn(true);
          navigate("/signin");
          setErrorServerMessage("");
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          MainApi.showError(err, "Email зарегестрирован за другим пользователем");
          setErrorServerMessage("Email зарегестрирован за другим пользователем");
        }
      })
    //.finally(())
  }

  // авторизация пользователя
  const onLogin = (email, password) => {
    return MainApi
      .authorize(email, password, localStorage.getItem('token'))
      .then((res) => {
        // console.log(res)
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          MainApi.checkToken(res.token)
            .then((res) => {
              // console.log(res)
              setEmail(res.user.email);
              setCurrentUser({
                name: res.user.name,
                email: res.user.email
              });
              navigate("/movies");
            })
          MainApi.getSaveMovies(res.token)
            .then((res) => {
              setSaveMovies(res.movies);
            })
          navigate("/movies");
          setErrorServerMessage("");
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 400") {
          MainApi.showError(err, "не передано одно из полей");
        } else if (err === "Ошибка: 401") {
          MainApi.showError(err, "Пользователь с данным email не найден");
          setErrorServerMessage("Ошибка авторизации нверный email или пароль")
        }
      });
  }
  // выход
  const onSignOut = () => {
    localStorage.removeItem('token');
    setCurrentUser({ name: "", email: "" })
    setLoggedIn(false);
    setEmail("");
    navigate("/");
  }

  const onEditProfile = (name, email) => {
    // console.log(name, email)
    return MainApi
      .editProfile(name, email, localStorage.getItem('token'))
      .then((res) => {
        // console.log('onEditProfile', res.name)
        setChekStatusErrorServer(false)
        setCurrentUser({
          name: res.name, email: res.email
        });
        setErrorServerMessage('')
      })
      .catch((err) => {
        setChekStatusErrorServer(true)
        if (err === "Ошибка: 409") {
          MainApi.showError(err, "Email зарегестрирован за другим пользователем");
          setErrorServerMessage("Email зарегестрирован за другим пользователем")
        }
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <Routes>
          <Route exact path="/" element={<Main isLoggedIn={isLoggedIn} />} />

          <Route path="/movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} navigate="/signup">
              <Movies
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
              />
            </ProtectedRoute>
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} navigate="/signup">
              <SavedMovies
                isLoggedIn={isLoggedIn}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
              />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} navigate="/signup">
              <Profile
                isLoggedIn={isLoggedIn}
                onEditProfile={onEditProfile}
                onSignOut={onSignOut}
                errorServerMessage={errorServerMessage}
                chekStatusErrorServer={chekStatusErrorServer} />
            </ProtectedRoute>

          } />

          <Route path="/signin" element={
            <AutoriseProtectedRoute isLoggedIn={isLoggedIn} >
              <Login
                onLogin={onLogin}
                errorServerMessage={errorServerMessage} />
            </AutoriseProtectedRoute>
          } />

          <Route path="/signup" element={
            <AutoriseProtectedRoute isLoggedIn={isLoggedIn} >
              <Register
                onRegister={onRegister}
                errorServerMessage={errorServerMessage} />
            </AutoriseProtectedRoute>
          }
          />

          <Route path="*" element={<Error />} />

        </Routes>

      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
