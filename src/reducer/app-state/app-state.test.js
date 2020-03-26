import {reducer, ALL_GENRES_FILTER, ActionType, ActionCreator, Screen} from './app-state.js';

const movies = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `/img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `/img/bohemian-rhapsody.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    name: `Moonrise kindom`,
    previewImage: `/img/moonrise-kingdom.jpg`,
    trailer: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  }
];

const initialState = {
  activeMovie: null,
  activeGenreFilter: ALL_GENRES_FILTER,
  genresList: [],
  activeScreen: Screen.MAIN,
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should set genreFilter with correct value`, () => {
  expect(reducer(initialState, {
    type: ActionType.SET_GENRES_FILTER,
    payload: `Drama`
  })).toMatchObject({
    activeMovie: null,
    activeGenreFilter: `Drama`,
    genresList: [],
    activeScreen: Screen.MAIN,
  });
});

it(`Reducer should set activeMovie with correct value`, () => {
  expect(reducer(initialState, ActionCreator.setActiveMovie(movies[1]))).toMatchObject({
    activeMovie: movies[1],
    activeGenreFilter: ALL_GENRES_FILTER,
    genresList: [],
    activeScreen: Screen.MAIN,
  });
});

it(`Reducer should set activeScreen`, () => {
  expect(reducer(initialState, ActionCreator.setActiveScreen(Screen.MOVIE_PAGE))).toMatchObject({
    activeMovie: null,
    activeGenreFilter: ALL_GENRES_FILTER,
    genresList: [],
    activeScreen: Screen.MOVIE_PAGE,
  });
});
