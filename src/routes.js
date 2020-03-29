const AppRoute = {
  MAIN: `/`,
  MOVIE_PAGE: `/movie-page`,
  SIGN_IN: `/login`,
  ERROR: `/error`,
};

const AppDynamicRoute = {
  addReview(id) {
    return `/review/${id}`;
  }
};

export {AppRoute, AppDynamicRoute};
