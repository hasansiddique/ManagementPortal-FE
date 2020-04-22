import { get } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import AppRoutes from '../../AppRoutes';
import { getUser } from '../auth/auth.api';
import storage from '../../common/storage';
import { AUTH_ROUTES } from '../../common/constants';

const Layout = ({
  history,
  location,
  getUserFromApi,
  isAuthenticated,
}) => {
  useEffect(() => {
    if (isAuthenticated && location && location.pathname) {
      history.push(
        AUTH_ROUTES.includes(location.pathname)
          ? '/dashboard'
          : location.pathname,
      );
    } else if (!isAuthenticated && get(storage.get('user'), 'token')) {
      getUserFromApi();
    }
  }, []);

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
      <AppRoutes />
    </div>,
  ];
};

Layout.defaultProps = {
  isAuthenticated: false,
};

Layout.propTypes = {
  isAuthenticated: PropTypes.bool,
  getUser: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = (dispatch) => ({
  getUserFromApi: () => {
    dispatch(getUser());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
