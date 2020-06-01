import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import AppRoutes from './app.routes';
import storage from './common/storage';
import { AUTH_ROUTES } from './common/constants';
import AppLoad from './components/appLoad/AppLoad';
import { getUser } from './views/auth/auth.api';

const Root = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.getIn(['auth', 'isAuthenticated']));
  const isLocalUserFetched = useSelector((state) => state.getIn(['auth', 'isLocalUserFetched']));
  const user = useSelector((state) => state.getIn(['auth', 'user']));

  const getUserFromApi = () => dispatch(getUser());


  useEffect(() => {
    if (isAuthenticated && AUTH_ROUTES.includes(location.pathname)) {
      history.push('/dashboard');
    } else if (!isAuthenticated && !isLocalUserFetched && get(storage.get('user'), 'token')) {
      getUserFromApi();
    }
  }, [isAuthenticated]);

  return [
    <div key="app" id="app-wrapper">
      {!user && isLocalUserFetched ? <AppLoad /> : <AppRoutes />}
    </div>,
  ];
};

Root.defaultProps = {
  isAuthenticated: false,
};

export default Root;
