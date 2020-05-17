import { get } from "lodash";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import AppRoutes from "./app.routes";
import storage from "./common/storage";
import { AUTH_ROUTES } from "./common/constants";
import AppLoad from "./components/appLoad/AppLoad";
import { getUser, refreshToken } from "./views/auth/auth.api";

const Root = ({
  history,
  location,
  refToken,
  isLoggingIn,
  getUserFromApi,
  isAuthenticated,
}) => {
  useEffect(() => {
    if (isAuthenticated && location && location.pathname) {
      history.push(
        AUTH_ROUTES.includes(location.pathname)
          ? "/dashboard"
          : location.pathname
      );
    } else if (!isAuthenticated && get(storage.get("user"), "token")) {
      getUserFromApi();
    }
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
    }
  );

  return [
    <Fragment key="redirect">
      {isAuthenticated && (
        <Redirect
          to={
            AUTH_ROUTES.includes(location.pathname)
              ? "/dashboard"
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

Root.propTypes = {
  isAuthenticated: PropTypes.bool,
  getUserFromApi: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  refToken: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(["auth", "isAuthenticated"]),
  isLoggingIn: state.getIn(["auth", "isLoggingIn"]),
});

const mapDispatchToProps = (dispatch) => ({
  getUserFromApi: () => {
    dispatch(getUser());
  },
  refToken: () => {
    dispatch(refreshToken());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
