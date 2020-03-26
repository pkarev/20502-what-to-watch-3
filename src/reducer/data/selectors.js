import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => state[NAME_SPACE].movies;
export const getPromoMovie = (state) => state[NAME_SPACE].promoMovie;
