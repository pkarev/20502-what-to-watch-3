const ALL_GENRES_FILTER = `All genres`;

const initialState = {
  activeGenreFilter: ALL_GENRES_FILTER,
};

const ActionType = {
  SET_GENRES_FILTER: `SET_GENRES_FILTER`,
};

const ActionCreator = {
  setGenresFilter: (genreFilter) => ({
    type: ActionType.SET_GENRES_FILTER,
    payload: genreFilter,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRES_FILTER:
      return (Object.assign({}, state, {
        activeGenreFilter: action.payload,
      }));
  }

  return state;
};

export {reducer, ActionCreator, ActionType, ALL_GENRES_FILTER};
