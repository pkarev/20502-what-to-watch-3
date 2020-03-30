const AppRoute = {
  MAIN: `/`,
  MOVIE_PAGE: `/movie-page`,
  SIGN_IN: `/login`,
  ERROR: `/error`,
};

const AppDynamicRoute = {
  addReview(id) {
    return `/films/${id}/review`;
  },
  film(id) {
    return `/films/${id}`;
  },
  player(id) {
    return `/player/${id}`;
  }
};

export {AppRoute, AppDynamicRoute};
