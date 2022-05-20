// const BASE_URL = "https://api.zaigraev.nomoredomains.work";
const BASE_URL = 'http://localhost:3000';

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
export const authorize = (email, password, token) => {
  console.log(email, password, token)
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers
      : {
      ...headers,
      Authorization: `Bearer ${token}`,
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
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newMovie // ??
    }),
  })
    .then(checkResult);
}

// удаление фильма из базы
export const deleteSaveMovie = (cardId, token) => {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(checkResult);
}

export const showError = (err, text) => {
  console.groupCollapsed('%c Auth error', 'color: red')
  console.log(err, text)
  console.groupEnd()
}

export default BASE_URL;