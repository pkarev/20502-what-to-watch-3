const AuthStatus = {
  AUTH: true,
  NO_AUTH: false,
};

const initialState = {
  isAuthorized: AuthStatus.NO_AUTH,
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
};

const ActionCreator = {
  setAuthStatus: (val) => ({
    type: ActionType.SET_AUTH_STATUS,
    payload: val,
  }),
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.setAuthStatus(AuthStatus.AUTH));
      });
  },
  tryAuth: (email, password) => (dispatch, getState, api) => {
    return api.post(`/login`, {email, password})
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
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Operation, AuthStatus};
