import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.APP_STATE;

export const getActiveMovie = (state) => state[NAME_SPACE].activeMovie;
export const getActiveGenreFilter = (state) => state[NAME_SPACE].activeGenreFilter;
export const getActiveScreen = (state) => state[NAME_SPACE].activeScreen;
