import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

import AuthRoutes from './AuthRoutes';

const Authentication = (props) => {
  return (
    <div key="auth-view" id="auth">
      <div className="auth-wrapper">
        <section className="auth-content">

          <div className="auth-logo">
            <img src="/wanclouds-logo.jpg" alt=" Wanclouds" height={100} />
          </div>

          <div className="auth-component">
            <Card>
              <AuthRoutes
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
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
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  verifyUserEmail: PropTypes.func.isRequired,
  userPasswordReset: PropTypes.func.isRequired,
  resendEmailVerification: PropTypes.func.isRequired,
  userPasswordUpdate: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  isRegisterSuccess: PropTypes.bool.isRequired,
  isLoggingOut: PropTypes.bool.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  isEmailVerified: PropTypes.bool.isRequired,
  isUpdatedPassword: PropTypes.bool.isRequired,
};

Authentication.styles = {
  layout: {},
};

export default Authentication;
