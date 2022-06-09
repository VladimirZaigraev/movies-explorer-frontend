import { BASE_URL } from '../config/config.js';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const checkResult = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

// регистрация пользователя /signup
export const register = (name, email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  credentials: "include",
  headers,
  body: JSON.stringify({
    name,
    email,
    password,
  }),
}).then(checkResult);

// авторизация /signin
export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    ...headers,
  },
  body: JSON.stringify({ email, password }),
}).then(checkResult);

// проверка токена /users/me
export const getUserData = () => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    ...headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
}).then(checkResult);

export const editProfile = (name, email) => fetch(`${BASE_URL}/users/me`, {
  method: 'PATCH',
  headers: {
    ...headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify({ name, email }),
}).then(checkResult);

// получение сохарненных фильмов /movies/
export const getSaveMovies = () => fetch(`${BASE_URL}/movies`, {
  method: 'GET',
  credentials: "include",
  headers: {
    'content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then(checkResult);

// добавление фильма
export const addSaveMovie = (newMovie) => fetch(`${BASE_URL}/movies`, {
  method: 'POST',
  credentials: "include",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    country: newMovie.country || 'country',
    director: newMovie.director || 'director',
    duration: newMovie.duration || 0,
    year: newMovie.year || 'year',
    description: newMovie.description,
    image: `${`https://api.nomoreparties.co${newMovie.image.url}`}`,
    trailerLink: newMovie.trailerLink || 'trailerLink',
    thumbnail: newMovie.trailerLink || 'thumbnail',
    movieId: newMovie.id,
    nameRU: newMovie.nameRU || 'nameRU',
    nameEN: newMovie.nameEN || 'nameEN',
  }),
})
  .then(checkResult);

// удаление фильма из базы
export const deleteSaveMovie = (deleteMovie) => fetch(`${BASE_URL}/movies/${deleteMovie._id}`, {
  method: 'DELETE',
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then(checkResult);

export const showError = (err, text) => {
  console.groupCollapsed('%c API error', 'color: red');
  console.log(err, text);
  console.groupEnd();
};
