import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionCreator, AuthStatus, Operation} from './user.js';
import {createAPI} from '../../api.js';

const api = createAPI(() => {});

const initialState = {
  isAuthorized: false,
  user: {},
};

const mockUser = {
  id: 4,
  name: `Kate Muir`,
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should set auth status`, () => {
  expect(reducer(initialState, ActionCreator.setAuthStatus(AuthStatus.AUTH))).toMatchObject({
    isAuthorized: true,
    user: {},
  });
});

it(`Reducer should set user`, () => {
  expect(reducer(initialState, ActionCreator.setUser(mockUser))).toMatchObject({
    isAuthorized: false,
    user: mockUser,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authCkecker = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {});

    return authCkecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
  });
});
