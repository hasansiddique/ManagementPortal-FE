import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import storage from '../common/storage';

const ProtectedComponent = ({
  path,
  exact,
  Component,
  isAuthenticated,
}) => (
  <Route
    path={path}
    exact={exact}
    render={() => (
      (isAuthenticated || storage.get('user') !== undefined)
        ? <Component />
        : <Redirect to="/user/login" />
    )}
  />
);

ProtectedComponent.defaultProps = {
  isAuthenticated: false,
  exact: false,
  path: '',
};

ProtectedComponent.propTypes = {
  Component: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool,
  path: PropTypes.array,
  exact: PropTypes.bool,
};

export default ProtectedComponent;
