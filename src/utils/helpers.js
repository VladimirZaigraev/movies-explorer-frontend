import { SHORT_MOVIE_DURATION } from '../config/config.js'

const filterMovies = (movies, short) => {
  const newMovies = movies.filter((movie) => {
    return short ? movie.duration < SHORT_MOVIE_DURATION : movie.duration > SHORT_MOVIE_DURATION;
  })
  return newMovies;
}


export { filterMovies };
