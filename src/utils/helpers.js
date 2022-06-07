import { SHORT_MOVIE_DURATION } from '../config/config.js'

const filterMovies = (movies, short) => {
  const newMovies = movies.filter((movie) => {
    return short ? movie.duration < SHORT_MOVIE_DURATION : movie.duration > SHORT_MOVIE_DURATION;
  })
  return newMovies;
}

const durationMovie = (movieDuration) => {
  return String((movieDuration / 60).toFixed(0)) + ' ч ' + String(movieDuration % 60) + ' мин';
}


export { filterMovies, durationMovie };
