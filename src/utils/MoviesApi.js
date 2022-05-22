// const BEUTIFULFILM_URL = "https://api.nomoreparties.co/beatfilm-movies";

import { BEUTIFULFILM_URL } from '../config/config.js'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const checkResult = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getMovies = () => {
  return fetch(BEUTIFULFILM_URL, {
    method: "GET",
    headers,
  }).then(checkResult);
};
