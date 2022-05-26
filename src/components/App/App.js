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
import { useLocalStorage } from '../../hooks/useLocalStorage'

function App() {
  let navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [edit, setEdit] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  // const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);

  const [chekStatusErrorServer, setChekStatusErrorServer] = useState(false);

  // const [inputSearchValue, setInputSearchValue] = useState('')
  // const [inputSearchValueSaveMovie, setInputSearchValueSaveMovie] = useState('')
  const [serverMessage, setServerMessage] = useState('');
  const [editMessage, setEditMessage] = useState('');

  // const [lengthInputSearchMovie, setLengthInputSearchMovie] = useState(1);
  const [preloader, setPreloader] = useState(false);

  const {
    value: movies,
    setValue: setMovies
  } = useLocalStorage("movies", []);

  const {
    value: shortMovie,
    setValue: setShortMovie
  } = useLocalStorage("shortMovie", localStorage.getItem("shortMovie") || true);

  const {
    value: shortSaveMovie,
    setValue: setShortSaveMovie
  } = useLocalStorage("shortSaveMovie", localStorage.getItem("shortSaveMovie") || true);

  const {
    value: resultMovies,
    setValue: setResultMovies
  } = useLocalStorage("resultMovies", localStorage.getItem("resultMovies") || []);

  const {
    value: resultSaveMovies,
    setValue: setResultSaveMovies
  } = useLocalStorage("resultSaveMovies", localStorage.getItem("resultSaveMovies") || []);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLoggedIn(true)
      setPreloader(true);
      MainApi.checkToken(token)
        .then((res) => {
          setCurrentUser({
            name: res.user.name,
            email: res.user.email
          });
        })
        .catch((err) => {
          MainApi.showError(err, "При загрузке данных пользователя произошла ошибка");
        })
        .finally(() => {
          setPreloader(false);
        });
      // setMovies(JSON.parse(localStorage.getItem("resultMovies")) || movies)
      console.log('resultMovies', resultMovies)
    } else {
      setLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (isLoggedIn) {
      MoviesApi.getMovies()
        .then((movie) => {
          setMovies(movie)
          // localStorage.setItem("movies", JSON.stringify(movie));
        })
        .catch((err) => {
          MainApi.showError(err, "При загрузке фильмов произошла ошибка");
        })

      MainApi.getSaveMovies(token)
        .then((movie) => {
          setSaveMovies(movie)
          localStorage.setItem("saveMovies", JSON.stringify(movie));
        })
        .catch((err) => {
          MainApi.showError(err, "При загрузке сохраненных фильмов произошла ошибка");
        })
    }
  }, [isLoggedIn])
  console.log(isLoggedIn)

  const onRegister = (name, email, password) => {
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
        if (res.token) {
          const token = res.token
          localStorage.setItem('token', token);
          setLoggedIn(true);
          MainApi.checkToken(token)
            .then((res) => {
              setCurrentUser({
                name: res.user.name,
                email: res.user.email
              });
              navigate("/movies");
              setServerMessage("Добро пожаловать!");
              setChekStatusErrorServer(false)
            })
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
    localStorage.removeItem("movies");
    localStorage.removeItem("saveMovies");
    localStorage.removeItem("resultMovies");
    localStorage.removeItem("resultSaveMovies");
    localStorage.removeItem("shortMovie");
    localStorage.removeItem("shortSaveMovie");
    localStorage.removeItem("moviesValue");
    localStorage.removeItem("savedMoviesValue");
    setCurrentUser({ name: "", email: "" })
    setLoggedIn(false);
    navigate("/");
  }

  const onEditProfile = (name, email) => {
    return MainApi
      .editProfile(name, email, localStorage.getItem('token'))
      .then((res) => {
        setChekStatusErrorServer(false)
        setCurrentUser({
          name: res.name, email: res.email
        });
        setEditMessage("Профиль отредактирован")
        setEdit(false)
        setServerMessage('')
      })
      .catch((err) => {
        setChekStatusErrorServer(true)
        setEdit(true)
        if (err === "Ошибка: 409") {
          MainApi.showError(err, "Email зарегестрирован за другим пользователем");
          setServerMessage("Email зарегестрирован за другим пользователем")
          setEditMessage('')
        }
      })
  }

  const handleSearchMovies = (searchMovie, shortMovies) => {
    setPreloader(true);
    let cloneMovies = Object.assign(movies)
    let result = sortMovies(cloneMovies, searchMovie, shortMovies)
    setMovies(result)
    setPreloader(false);
    // localStorage.setItem("resultMovies", JSON.stringify(result));
    setResultMovies(result)
  }

  const handleSearchSaveMovies = (searchMovie, shortMovies) => {
    setPreloader(true);
    let cloneMovies = Object.assign(saveMovies)
    let result = sortMovies(cloneMovies, searchMovie, shortMovies)
    setSaveMovies(result)
    setPreloader(false);
    // localStorage.setItem("resultSaveMovies", JSON.stringify(result));
    setResultSaveMovies(result)
  }

  const addMovie = (newMovie) => {
    const token = localStorage.getItem('token');
    setPreloader(true);
    // console.log(newMovie)
    if (token) {
      MainApi
        .addSaveMovie(newMovie, token)
        .then((movie) => {
          setSaveMovies([...saveMovies, movie])
          // console.log(saveMovies)
          // localStorage.setItem("saveMovies", JSON.stringify(newArrMovie));
        })
        .catch((err) => {
          MainApi.showError(err, "Не удалось добавить фильм");
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }

  const deleteMovie = (delMovie) => {
    setPreloader(true);
    const token = localStorage.getItem('token');
    if (token) {
      MainApi
        .deleteSaveMovie(delMovie, token)
        .then(() => {
          setSaveMovies(saveMovies.filter((saveMovie) => saveMovie._id !== delMovie._id));
        })
        .catch((err) => {
          MainApi.showError(err, "Не удалось удалить фильм");
        })
        .finally(() => {
          setPreloader(false);
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
                deleteMovie={deleteMovie}
                saveMovies={saveMovies}
                preloader={preloader}
              />
            } />
          </Route>

          <Route path="/saved-movies" element={<ProtectedRoute />} >
            <Route path="/saved-movies" element={
              <SavedMovies
                isLoggedIn={isLoggedIn}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                handleFilm={handleSearchSaveMovies}
                shortSaveMovie={shortSaveMovie}
                setShortSaveMovie={setShortSaveMovie}
                deleteMovie={deleteMovie}
                preloader={preloader}
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
                edit={edit}
                setEdit={setEdit}
                editMessage={editMessage}
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