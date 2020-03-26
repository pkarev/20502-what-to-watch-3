import axios from 'axios';

const ResponseCode = {
  UNAUTHORIZED: 401,
};

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (responce) => {
    return responce;
  };

  const onFail = (error) => {
    const {response} = error;

    if (response.code === ResponseCode.UNAUTHORIZED) {
      onUnauthorized();

      throw error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);
};

export default createAPI;
