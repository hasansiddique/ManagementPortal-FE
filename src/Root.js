import { get } from 'lodash';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import AppRoutes from './app.routes';
import storage from './common/storage';
import { AUTH_ROUTES, ACTIVE } from './common/constants';
import AppLoad from './components/appLoad/AppLoad';
import { getUser, refreshToken } from './views/auth/auth.api';

const Root = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoggingIn = useSelector((state) => state.getIn(['auth', 'loginStatus']) === ACTIVE);
  const isAuthenticated = useSelector((state) => state.getIn(['auth', 'isAuthenticated']));

  const refToken = () => dispatch(refreshToken());
  const getUserFromApi = () => dispatch(getUser());

  useEffect(() => {
    if (!isAuthenticated && get(storage.get('user'), 'token')) {
      getUserFromApi();
    }
  }, [getUserFromApi, isAuthenticated]);

  // it will automatically sends refresh token if access token is not valid
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        refToken();
        window.location.reload();
      }
      return Promise.reject(error);
    },
  );

  return [
    <Fragment key="redirect">
      {isAuthenticated && (
        <Redirect
          to={
            AUTH_ROUTES.includes(location.pathname)
              ? '/dashboard'
              : location.pathname
          }
        />
      )}
    </Fragment>,
    <div key="app" id="app-wrapper">
      {isLoggingIn ? <AppLoad /> : <AppRoutes />}
    </div>,
  ];
};

Root.defaultProps = {
  isAuthenticated: false,
};

export default Root;
