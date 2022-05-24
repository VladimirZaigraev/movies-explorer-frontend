// const BASE_URL = "https://api.zaigraev.nomoredomains.work";
import { BASE_URL } from '../config/config.js'



const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const checkResult = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

//регистрация пользователя /signup
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      email,
      password
    }),
  }).then(checkResult);
};

// авторизация /signin
export const authorize = (email, password) => {
  // console.log(email, password)
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers
      : {
      ...headers,
    }
    ,
    body: JSON.stringify({ email, password }),
  }).then(checkResult);
};

// проверка токена /users/me
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResult);
};

export const editProfile = (name, email, token) => {
  // console.log(name, email, token)
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(checkResult);
}

// получение сохарненных фильмов /movies/
export const getSaveMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResult);
}

// добавление фильма
export const addSaveMovie = (newMovie, token) => {
  console.log('newMovie', newMovie)
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: `${newMovie.country + ''}`,
      director: newMovie.director,
      duration: newMovie.duration,
      year: newMovie.year,
      description: newMovie.description,
      image: `${'https://api.nomoreparties.co' + newMovie.image.url}`,
      trailerLink: newMovie.trailerLink,
      thumbnail: newMovie.trailerLink,
      movieId: newMovie.id,
      nameRU: newMovie.nameRU,
      nameEN: newMovie.nameEN,
    }),
  })
    .then(checkResult);
}

// удаление фильма из базы
export const deleteSaveMovie = (delMovie, token) => {
  return fetch(`${BASE_URL}/movies/${delMovie._id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(checkResult);
}

export const showError = (err, text) => {
  console.groupCollapsed('%c API error', 'color: red')
  console.log(err, text)
  console.groupEnd()
}

export default BASE_URL;