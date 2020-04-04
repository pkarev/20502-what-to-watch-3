const RatingNameUpperBoundary = {
  BAD: 3,
  NORMAL: 5,
  GOOD: 8,
  VERY_GOOD: 10,
};

const RatingName = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const getRatingName = (value) => {
  if (value < RatingNameUpperBoundary.BAD) {
    return RatingName.BAD;
  }

  if (value < RatingNameUpperBoundary.NORMAL) {
    return RatingName.NORMAL;
  }

  if (value < RatingNameUpperBoundary.GOOD) {
    return RatingName.GOOD;
  }

  if (value < RatingNameUpperBoundary.VERY_GOOD) {
    return RatingName.VERY_GOOD;
  }

  return RatingName.AWESOME;
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};

const updateFavoriteMovies = (movies, candidate) => {
  let updatedMovies = movies;
  const indexOfCandidate = movies.indexOf(updatedMovies.find((movie) => movie.id === candidate.id));

  if (indexOfCandidate > -1) {
    updatedMovies = [...movies.slice(0, indexOfCandidate), ...movies.slice(indexOfCandidate + 1)];
  } else {
    updatedMovies.push(candidate);
  }

  return updatedMovies;
};

const updateMoviesFavoriteStatus = (movies, movie) => {
  let updatedMovies = movies;
  const indexToUpdate = movies.indexOf(movies.find((movieItem) => movieItem.id === movie.id));

  if (indexToUpdate > -1) {
    updatedMovies = [...movies.slice(0, indexToUpdate), toggleFavoriteStatus(movie), ...movies.slice(indexToUpdate + 1)];
  }

  return updatedMovies;
};

const toggleFavoriteStatus = (promoMovie) => {
  return Object.assign({}, promoMovie, {
    isFavorite: !promoMovie.isFavorite,
  });
};

export {getRatingName, formatDuration, updateMoviesFavoriteStatus, updateFavoriteMovies, toggleFavoriteStatus};
