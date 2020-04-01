import {Operation as DataOperation} from '../data/data';
import history from '../../history.js';

const AuthStatus = {
  AUTH: true,
  NO_AUTH: false,
};

const initialState = {
  isAuthorized: AuthStatus.NO_AUTH,
  user: {},
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_USER: `SET_USER`,
};

const ActionCreator = {
  setAuthStatus: (val) => ({
    type: ActionType.SET_AUTH_STATUS,
    payload: val,
  }),
  setUser: (val) => ({
    type: ActionType.SET_USER,
    payload: val,
  }),
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.setUser(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },
  tryAuth: (email, password) => (dispatch, getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        dispatch(ActionCreator.setAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.setUser(response.data));
        dispatch(DataOperation.getFavorites());
        history.goBack();
      })
      .catch((err) => {
        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return (Object.assign({}, state, {
        isAuthorized: action.payload,
      }));
    case ActionType.SET_USER:
      return (Object.assign({}, state, {
        user: action.payload,
      }));
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Operation, AuthStatus};
