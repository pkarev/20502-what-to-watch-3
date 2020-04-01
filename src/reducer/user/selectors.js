import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.USER;

export const getAuthStatus = (state) => state[NAME_SPACE].isAuthorized;
export const getUserAvatar = (state) => state[NAME_SPACE].user[`avatar_url`];
