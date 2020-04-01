import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.APP_STATE;

export const getActiveGenreFilter = (state) => state[NAME_SPACE].activeGenreFilter;
