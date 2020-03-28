import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, ActionCreator, AuthStatus, Operation} from './user.js';
import {createAPI} from '../../api.js';

const api = createAPI(() => {});

const initialState = {
  isAuthorized: false,
};

it(`Reducer without params should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should set movies`, () => {
  expect(reducer(initialState, ActionCreator.setAuthStatus(AuthStatus.AUTH))).toMatchObject({
    isAuthorized: true,
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
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTH_STATUS,
          payload: true,
        });
      });
  });

  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authenticator = Operation.tryAuth();

    apiMock
      .onPost(`/login`, {})
      .reply(200, {});

    return authenticator(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTH_STATUS,
          payload: true,
        });
      });
  });
});
