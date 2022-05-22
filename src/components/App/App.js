import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
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

import { sortMovies } from '../../utils/sortMovies.js'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  // const [isEmail, setEmail] = useState('')
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [chekStatusErrorServer, setChekStatusErrorServer] = useState(false);

  const [serverMessage, setServerMessage] = useState('');
  const [shortMovie, setShortMovie] = useState(true);
  const [shortSaveMovie, setShortSaveMovie] = useState(true);

  // console.log('api movies - movies', movies)
  console.log('api movies - saveMovies', saveMovies)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLoggedIn(true)
      MainApi.checkToken(token)
        .then((res) => {
          // console.log(res)
          setCurrentUser({
            name: res.user.name,
            email: res.user.email
          });
          MoviesApi.getMovies()
            .then((movie) => {
              setMovies(movie)
            })
          MainApi.getSaveMovies(token)
            .then((movie) => {
              setSaveMovies(movie)
            })
        })
        .catch((err) => {
          MainApi.showError(err, "При загрузке страницы произошла ошибка");
        })
    } else {
      setLoggedIn(false)
    }
  }, [])

  const onRegister = (name, email, password) => {
    // console.log(name, email, password)
    return MainApi
      .register(name, email, password)
      .then((email) => {
        if (email) {
          setLoggedIn(true);
          navigate("/signin");
          setServerMessage("Поздравляем, вы зарегестрированы!");
          setChekStatusErrorServer(false)
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          MainApi.showError(err, "Email зарегестрирован за другим пользователем");
          setServerMessage("Email зарегестрирован за другим пользователем");
          setChekStatusErrorServer(true)
        }
      })
    //.finally(())
  }

  // авторизация пользователя
  const onLogin = (email, password) => {
    return MainApi
      .authorize(email, password)
      .then((res) => {
        // console.log(res.token)
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          MainApi.checkToken(res.token)
            .then((res) => {
              // console.log(res)
              // setEmail(res.user.email);
              setCurrentUser({
                name: res.user.name,
                email: res.user.email
              });
              navigate("/movies");
              setServerMessage("Добро пожаловать!");
            })
          MainApi.getSaveMovies(res.token)
            .then((res) => {
              setSaveMovies(res.movies);
            })
          navigate("/movies");
          setChekStatusErrorServer(false)
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 400") {
          MainApi.showError(err, "не передано одно из полей");
        } else if (err === "Ошибка: 401") {
          MainApi.showError(err, "Пользователь с данным email не найден");
          setServerMessage("Ошибка авторизации нверный email или пароль")
        }
        setChekStatusErrorServer(true)
      });
  }
  // выход
  const onSignOut = () => {
    localStorage.removeItem('token');
    setCurrentUser({ name: "", email: "" })
    setLoggedIn(false);
    // setEmail("");
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
        setServerMessage("Профиль отредактирован")
      })
      .catch((err) => {
        setChekStatusErrorServer(true)
        if (err === "Ошибка: 409") {
          MainApi.showError(err, "Email зарегестрирован за другим пользователем");
          setServerMessage("Email зарегестрирован за другим пользователем")
        }
      })
  }

  const handleSearchMovies = (searchMovie, shortMovies) => {
    let result = sortMovies(movies, searchMovie, shortMovies)
    // console.log('result', result)
    setMovies(result)
  }

  const addMovie = (newMovie) => {
    const token = localStorage.getItem('token');
    if (token) {
      MainApi
        .addSaveMovie(newMovie, token)
        .then((dataMovie) => {
          // setSaveMovies([dataMovie.data, ...savedMovies]);
          console.log(dataMovie);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <Routes>
          <Route exact path="/" element={<Main isLoggedIn={isLoggedIn} />} />

          <Route path="/movies" element={<ProtectedRoute />} >
            <Route path="/movies" element={
              <Movies
                isLoggedIn={isLoggedIn}
                movies={movies}
                setMovies={setMovies}
                handleFilm={handleSearchMovies}
                short={shortMovie}
                setShort={setShortMovie}
                addMovie={addMovie}
              />
            } />
          </Route>

          <Route path="/saved-movies" element={<ProtectedRoute />} >
            <Route path="/saved-movies" element={
              <SavedMovies
                isLoggedIn={isLoggedIn}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                short={shortSaveMovie}
                setShort={setShortSaveMovie}
              />
            } />
          </Route>

          <Route path="/profile" element={<ProtectedRoute />} >
            <Route path="/profile" element={
              <Profile
                isLoggedIn={isLoggedIn}
                onEditProfile={onEditProfile}
                onSignOut={onSignOut}
                serverMessage={serverMessage}
                chekStatusErrorServer={chekStatusErrorServer}
              />
            } />
          </Route>
          <Route path="/signin" element={<AutoriseProtectedRoute />} >
            <Route path="/signin" element={
              <Login
                onLogin={onLogin}
                serverMessage={serverMessage}
                chekStatusErrorServer={chekStatusErrorServer} />
            } />
          </Route>
          <Route path="/signup" element={<AutoriseProtectedRoute />} >
            <Route path="/signup" element={
              <Register
                onRegister={onRegister}
                serverMessage={serverMessage}
                chekStatusErrorServer={chekStatusErrorServer} />
            }
            />
          </Route>

          <Route path="*" element={<Error />} />

        </Routes>

      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
