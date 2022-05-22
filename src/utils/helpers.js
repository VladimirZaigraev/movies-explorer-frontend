import { SHORT_MOVIE_DURATION } from '../config/config.js'

const filterMovies = (movies, short) => {
  movies = movies.filter((movie) => {
    return short ? movie.duration < SHORT_MOVIE_DURATION : movie.duration > SHORT_MOVIE_DURATION;
  })
  console.log(movies)
  return movies;
}

export { filterMovies };
