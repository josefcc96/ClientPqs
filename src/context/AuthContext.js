/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  // Cookies Names
  const CookiesNames = {
    userAccess: 'access',
    // userRefresh: "_user_refresh_access",
    // expiresAt: '_expires_at',
    userInfo: '_user_info',
  };

  const access = Cookies.get(CookiesNames.userAccess);
  // const refresh = Cookies.get(CookiesNames.userRefresh);
  // const expiresAt = Cookies.get(CookiesNames.expiresAt);
  const userInfo = Cookies.get(CookiesNames.userInfo);

  const [authState, setAuthState] = useState({
    access,
    // refresh,
    // expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  

  function setAuthInfo({ access,userInfo}) {
    Cookies.set(CookiesNames.userAccess, access);
    // Cookies.set(CookiesNames.userRefresh, refresh);
    // Cookies.set(CookiesNames.expiresAt, expiresAt);
    Cookies.set(CookiesNames.userInfo, JSON.stringify(userInfo));
    // console.log(userInfo)
    setAuthState({
      access,
      // refresh,
      // expiresAt,
      userInfo,
    });
  }

  const logout = () => {
    Cookies.remove(CookiesNames.userAccess);
    // Cookies.remove(CookiesNames.userRefresh);
    // Cookies.remove(CookiesNames.expiresAt);
    Cookies.remove(CookiesNames.userInfo);
    setAuthState({});
    history.push('/login');
  };

  const isAuthenticated = () => {
    if (!authState.access) {
      return false;
    }
    return true;
  };


  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
AuthProvider.defaultProps = {
  children: null,
};

export { AuthContext, AuthProvider };
