import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './views/Login';
import LogOut from './views/Logout';
import Register from './views/Register';
import ResendEmail from './views/ResendEmail';
import ForgotPassword from './views/ForgotPassword';
import EmailVerification from './views/EmailVerification';
import UpdatePassword from './views/UpdatePassword';

const AuthRoutes = ({
  loginUser,
  logOutUser,
  isLoggingIn,
  isLoggedOut,
  registerUser,
  isLoggingOut,
  isRegistering,
  verifyUserEmail,
  isEmailVerified,
  isRegisterSuccess,
  userPasswordReset,
  resendEmailVerification,
  userPasswordUpdate,
  isUpdatedPassword,
}) => {
  return ([
    <Route
      key="login"
      exact
      path={['/', '/user', '/user/login']}
      render={() => {
        return (
          <Login
            handleSubmit={loginUser}
            isLoggingIn={isLoggingIn}
          />
        );
      }}
    />,
    <Route
      key="register"
      exact
      path="/user/register"
      render={() => {
        return (
          <Register
            handleSubmit={registerUser}
            isRegistering={isRegistering}
            isRegisterSuccess={isRegisterSuccess}
          />
        );
      }}
    />,
    <Route
      key="logout"
      exact
      path="/user/logout"
      render={() => {
        return (
          <LogOut
            logOutUser={logOutUser}
            isLoggingOut={isLoggingOut}
            isLoggedOut={isLoggedOut}
          />
        );
      }}
    />,
    <Route
      key="emailVerification"
      exact
      path="/user/verify/:token"
      render={() => {
        return (
          <EmailVerification
            verifyUserEmail={verifyUserEmail}
            isEmailVerified={isEmailVerified}
          />
        );
      }}
    />,
    <Route
      key="forgotPassword"
      exact
      path="/user/forgot-password"
      render={() => {
        return (
          <ForgotPassword
            isLoggingIn={isLoggingIn}
            handleSubmit={userPasswordReset}
          />
        );
      }}
    />,
    <Route
      key="resendEmail"
      exact
      path="/user/resend-email"
      render={() => {
        return (
          <ResendEmail
            handleSubmit={resendEmailVerification}
            isLoggingIn={isLoggingIn}
          />
        );
      }}
    />,
    <Route
      key="UpdatePassword"
      exact
      path="/user/update-password"
      render={() => {
        return (
          <UpdatePassword
            handleSubmit={userPasswordUpdate}
            isUpdatedPassword={isUpdatedPassword}
          />
        );
      }}
    />,
  ]);
};

AuthRoutes.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isLoggingOut: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  isUpdatedPassword: PropTypes.bool,
  isEmailVerified: PropTypes.string.isRequired,
  verifyUserEmail: PropTypes.func.isRequired,
  isRegisterSuccess: PropTypes.bool.isRequired,
  userPasswordReset: PropTypes.func.isRequired,
  resendEmailVerification: PropTypes.func.isRequired,
};

export default AuthRoutes;
