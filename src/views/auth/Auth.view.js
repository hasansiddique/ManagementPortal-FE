import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

import AuthRoutes from './AuthRoutes';

const Authentication = ({
  match,
  loginUser,
  logoutUser,
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
  isUpdatedPassword,
  userPasswordUpdate,
}) => {
  return (
    <div key="auth-view" id="auth">
      <div className="auth-wrapper">
        <section className="auth-content">

          <div className="auth-logo">
            <img src="data:image/jpeg;base64,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" alt=" Wanclouds" height={100} />
          </div>

          <div className="auth-component">
            <Card>
              <AuthRoutes
                match={match}
                loginUser={loginUser}
                logOutUser={logoutUser}
                isLoggingIn={isLoggingIn}
                isLoggingOut={isLoggingOut}
                isLoggedOut={isLoggedOut}
                registerUser={registerUser}
                isRegistering={isRegistering}
                verifyUserEmail={verifyUserEmail}
                isEmailVerified={isEmailVerified}
                isRegisterSuccess={isRegisterSuccess}
                userPasswordReset={userPasswordReset}
                resendEmailVerification={resendEmailVerification}
                userPasswordUpdate={userPasswordUpdate}
                isUpdatedPassword={isUpdatedPassword}
              />
            </Card>
          </div>

        </section>
        <footer className="auth-footer">
          Copyright 2020. Wanclouds, Inc.
        </footer>
      </div>
    </div>
  );
};

Authentication.defaultProps = {};

Authentication.propTypes = {
  match: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isLoggingOut: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  isEmailVerified: PropTypes.string.isRequired,
  verifyUserEmail: PropTypes.func.isRequired,
  isRegisterSuccess: PropTypes.bool.isRequired,
  userPasswordReset: PropTypes.func.isRequired,
  resendEmailVerification: PropTypes.func.isRequired,
  isUpdatedPassword: PropTypes.bool.isRequired,
  userPasswordUpdate: PropTypes.func.isRequired,
};

Authentication.styles = {
  layout: {},
};

export default Authentication;
