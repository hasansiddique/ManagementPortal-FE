import { get } from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import AppRoutes from '../../AppRoutes';
import { getUser, refreshToken } from '../auth/auth.api';
import storage from '../../common/storage';
import { AUTH_ROUTES, USER_STATE } from '../../common/constants';

const Layout = ({
  history, location, getUserFromApi, isAuthenticated, refToken,
}) => {
  const adminAccess = () => {
    const admin1 = get(storage.get('user'), 'user.typeOfId') === USER_STATE.ADMIN_FULL;
    const admin2 = get(storage.get('user'), 'user.typeOfId') === USER_STATE.ADMIN_PARTIAL;
    const employee = get(storage.get('user'), 'user.typeOfId') === USER_STATE.EMPLOYEE;
    const admin = admin1 || admin2;
    return { admin, employee };
  };

  const { admin, employee } = adminAccess();

  useEffect(() => {
    if (isAuthenticated && location && location.pathname && admin) {
      history.push(
        AUTH_ROUTES.includes(location.pathname)
          ? '/dashboard'
          : location.pathname,
      );
    } else if (isAuthenticated && employee && location && location.pathname) {
      history.push(
        AUTH_ROUTES.includes(location.pathname) ? '/employee' : '/employee',
      );
    } else if (!isAuthenticated && get(storage.get('user'), 'token')) {
      getUserFromApi();
    }
    // eslint-disable-next-line
  }, [getUserFromApi, isAuthenticated, history]);

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
      {isAuthenticated && admin && (
        <Redirect
          to={
            AUTH_ROUTES.includes(location.pathname)
              ? '/dashboard'
              : location.pathname
          }
        />
      )}
      {isAuthenticated && employee && (
        <Redirect
          to={
            AUTH_ROUTES.includes(location.pathname) ? '/employee' : '/employee'
          }
        />
      )}
    </Fragment>,
    <div key="app" id="app-wrapper">
      <AppRoutes />
    </div>,
  ];
};

Layout.defaultProps = {
  isAuthenticated: false,
};

Layout.propTypes = {
  isAuthenticated: PropTypes.bool,
  getUserFromApi: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  refToken: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = (dispatch) => ({
  getUserFromApi: () => {
    dispatch(getUser());
  },
  refToken: () => {
    dispatch(refreshToken());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
