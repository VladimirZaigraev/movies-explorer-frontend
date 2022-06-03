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

  // Стейт  регистрации
  const {
    value: isLoggedIn,
    setValue: setLoggedIn
  } = useLocalStorage("loggedIn", JSON.parse(localStorage.getItem("loggedIn")) || false);

  // Стейт редактирования
  const [edit, setEdit] = useState(false);

  const [searchMovies, setSearchMovies] = useState(localStorage.getItem("moviesValue") || '');

  const [searchSaveMovies, setSaveSearchMovies] = useState(localStorage.getItem("saveMoviesValue") || '');

  // Данные от main-api
  const {
    value: movieData,
    setValue: setMovieData
  } = useLocalStorage("movieData" || []);

  // Данные от beatfilm-movies
  const {
    value: saveMovieData,
    setValue: setSaveMovieData
  } = useLocalStorage("saveMovieData" || []);

  // Стейт фильмов
  const [movies, setMovies] = useState(movieData || []);

  // Стейт сохраненных фильмов
  const [saveMovies, setSaveMovies] = useState(saveMovieData || []);

  // Переключатель фильмов
  const {
    value: shortMovie,
    setValue: setShortMovie
  } = useLocalStorage("shortMovie", localStorage.getItem("shortMovie") || true);

  // Переключатель сохраненных фильмов
  const {
    value: shortSaveMovie,
    setValue: setShortSaveMovie
  } = useLocalStorage("shortSaveMovie", localStorage.getItem("shortSaveMovie") || true);

  // Результат поиска по фильмам 
  const {
    value: resultMovies,
    setValue: setResultMovies
  } = useLocalStorage("resultMovies" || []);

  // Результат поиска по сохраненным фильмам 
  const {
    value: resultSaveMovies,
    setValue: setResultSaveMovies
  } = useLocalStorage("resultSaveMovies" || []);

  // Стейт контекста данных юзера
  const [currentUser, setCurrentUser] = useState({});

  // Cтейт статуса ошибки
  const [chekStatusErrorServer, setChekStatusErrorServer] = useState(false);

  //Cтейт текста ошибки 
  const [serverMessage, setServerMessage] = useState('');

  // Стейт редактирования профиля
  const [editMessage, setEditMessage] = useState('');

  // Cтейт прелодаера
  const [preloader, setPreloader] = useState(false);

  // Обновление стейтов при первой загрузке
  useEffect(() => {
    console.log(' Обновление стейтов при первой загрузке')
    let moviesValueLS = JSON.parse(localStorage.getItem("moviesValue")) || '';
    if (moviesValueLS.length === 0) {
      if (movieData.length > 0) {
        setMovies(movieData)
        setResultMovies([])
      } else {
        getAllMovies()
      }
    } else {
      setMovies(resultMovies || [])
    }

    let saveMoviesValueLS = JSON.parse(localStorage.getItem("saveMoviesValue")) || '';
    if (saveMoviesValueLS.length === 0) {
      if (saveMovieData.length > 0) {
        setSaveMovies(saveMovieData)
        setResultSaveMovies([])
      } else {
        getSaveMovies()
      }
    } else {
      setSaveMovies(resultSaveMovies || [])
    }
  }, [])

  // Получение данных юзера
  async function handleTokenCheck() {
    setPreloader(true);
    await MainApi.checkToken()
      .then((res) => {
        setLoggedIn(true)
        console.log('запуск')
        localStorage.setItem("loggedIn", JSON.stringify("true"));
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
  }

  // Получение фильмов от внешнего апи
  async function getAllMovies() {
    setPreloader(true);
    await MoviesApi.getMovies()
      .then((movie) => {
        setMovieData(movie)
        setMovies(movie)
        console.log('Запрос фильмов')
      })
      .catch((err) => {
        MainApi.showError(err, "При загрузке фильмов произошла ошибка");
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Получение сохраненных фильмов
  async function getSaveMovies() {
    setPreloader(true);
    await MainApi.getSaveMovies()
      .then((movie) => {
        setSaveMovieData(movie);
        setSaveMovies(movie)
        console.log('Запрос сохраненных фильмов');
      })
      .catch((err) => {
        MainApi.showError(err, "При загрузке сохраненных фильмов произошла ошибка");
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // Получение данных юзера
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLoggedIn(true);
      handleTokenCheck();
    } else {
      setLoggedIn(false);
    }
  }, [])

  // Получения данных фильмов
  useEffect(() => {
    if (isLoggedIn === true) {
      getAllMovies();
      getSaveMovies();
    }
  }, [isLoggedIn])

  // обнуление поиска
  useEffect(() => {
    if (searchMovies.length === 0) {
      setMovies(movieData)
    }
  }, [searchMovies])

  // обнуление поиска сохраненных фильмов
  useEffect(() => {
    if (searchSaveMovies.length === 0) {
      console.log(searchSaveMovies.length)
      setSaveMovies(saveMovieData)
    }
  }, [searchSaveMovies])

  // регистрация пользователей
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
          handleTokenCheck();
          navigate("/movies");
          setServerMessage("Добро пожаловать!");
          setChekStatusErrorServer(false);
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
    localStorage.clear('');
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('moviesValue')
    localStorage.removeItem('movieData')
    localStorage.removeItem('shortMovie')
    localStorage.removeItem('resultMovies')
    localStorage.removeItem('saveMovieData')
    localStorage.removeItem('saveMoviesValue')
    localStorage.removeItem('shortSaveMovie')
    localStorage.removeItem('resultSaveMovies')
    setMovies([]);
    setSaveMovies([]);
    setServerMessage('');
    setCurrentUser({ name: "", email: "" })
    setLoggedIn(false);
    navigate("/");
  }

  // редактирование данных пользователя
  const onEditProfile = (name, email) => {
    return MainApi
      .editProfile(name, email)
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

  // Поиск по фильмам
  const handleSearchMovies = (searchMovie, shortMovies) => {
    setPreloader(true);
    let result = sortMovies(movieData, searchMovie, shortMovies)
    setMovies(result)
    setResultMovies(result)
    setPreloader(false);
  }

  // Поиск по сохраненным фильмам
  const handleSearchSaveMovies = (searchMovie, shortMovies) => {
    setPreloader(true);
    let result = sortMovies(saveMovieData, searchMovie, shortMovies)
    setSaveMovies(result)
    setResultSaveMovies(result)
    setPreloader(false);
  }

  // лайк/добавление фильма
  const addMovie = (newMovie) => {
    const token = localStorage.getItem('token');
    setPreloader(true);
    if (token) {
      MainApi
        .addSaveMovie(newMovie)
        .then((movie) => {
          setSaveMovies([...saveMovieData, movie])
          setSaveMovieData([...saveMovieData, movie])
        })
        .catch((err) => {
          MainApi.showError(err, "Не удалось добавить фильм");
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }

  //удаление фильма из сохраненных
  const deleteMovie = (delMovie) => {
    setPreloader(true);
    const token = localStorage.getItem('token');
    if (token) {
      MainApi
        .deleteSaveMovie(delMovie)
        .then(() => {
          setSaveMovies(saveMovies.filter((saveMovie) => saveMovie._id !== delMovie._id));
          setSaveMovieData(saveMovieData.filter((saveMovie) => saveMovie._id !== delMovie._id))
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
                search={searchMovies}
                setSearch={setSearchMovies}
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
                search={searchSaveMovies}
                setSearch={setSaveSearchMovies}
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