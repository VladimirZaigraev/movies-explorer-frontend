const sortMovies = (movies, searchMovie, short) => {
  const searchValue = searchMovie.toLowerCase().trim();

  const includesString = (string) => {
    return string ? string.toLowerCase().includes(searchValue) : false;
  }

  // const shortMovies = filterMovies(movies, short)

  const searchMovies = movies.filter((movie) => {
    const strNameRU = includesString(movie.nameRU)
    const strNameEN = includesString(movie.nameEN);
    const strDirector = includesString(movie.director);
    const strCountry = includesString(movie.country);
    const strYear = includesString(movie.year);
    return strNameRU || strNameEN || strDirector || strCountry || strYear;
  });
  // console.log(searchMovies)
  return searchMovies;
};

export { sortMovies };