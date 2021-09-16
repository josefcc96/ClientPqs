import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const { authState,logout } = useContext(AuthContext);
  const authAxios = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
  });
  authAxios.interceptors.request.use(
    (config) => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [
        'http://localhost:8888',
        'http://localhost:8080',
        'http://localhost',
      ];
      console.log(origin)
      if (allowedOrigins.includes(origin)) {
        // console.log('Entro al allowed');
        // console.log(authState.access);
      }
      config.headers = {
        Authorization: `Bearer ${authState.access}`,
      };
      // config.url = join(config.baseURL + config.url);
      // console.log(config.url);
      return config;
    },
    (error) => Promise.reject(error),
  );

  // TODO: Manipular errores de autenticación
  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 409) {
        console.log('error code', code);
        logout();
      }
      if (code === 500 ) {
        console.log('error code', code);
      }
      return Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};
FetchProvider.propTypes = {
  children: PropTypes.node,
};
FetchProvider.defaultProps = {
  children: null,
};

export { FetchContext, FetchProvider };
