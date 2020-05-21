import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import storage from '../common/storage';

const ProtectedComponent = ({
  path,
  exact,
  Component,
  isAuthenticated,
  ...restProps
}) => {
  return (
    <Route
      path={path}
      exact={exact}
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      render={(props) => (isAuthenticated || storage.get('user') !== undefined ? (
      // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...props} />
      ) : (
        <Redirect to="/user/login" />
      ))}
    />
  );
};

ProtectedComponent.defaultProps = {
  isAuthenticated: false,
  exact: false,
  path: '',
};

ProtectedComponent.propTypes = {
  Component: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default ProtectedComponent;
