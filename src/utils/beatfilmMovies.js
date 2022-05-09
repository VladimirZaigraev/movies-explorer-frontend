const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";


const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const checkResult = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getMovies = () => {
  return fetch(BASE_URL, {
    method: "GET",
    headers,
  }).then(checkResult);
};
