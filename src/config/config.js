/* eslint-disable no-useless-escape */
const SHORT_MOVIE_DURATION = 40;
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^[a-zA-Zа-яА-Я\-\ ]+$/;
const BEUTIFULFILM_URL = "https://api.nomoreparties.co/beatfilm-movies";
const BASE_URL = "https://api.zaigraev.movie.nomoredomains.work";
// const BASE_URL = "http://localhost:3000";
export { SHORT_MOVIE_DURATION, MAIL_REGEX, NAME_REGEX, BEUTIFULFILM_URL, BASE_URL };