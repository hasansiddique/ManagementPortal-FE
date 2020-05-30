import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

import AuthRoutes from './auth.routes';

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
  authStatus: PropTypes.string.isRequired,
  isEmailVerified: PropTypes.string.isRequired,
};

Authentication.styles = {
  layout: {},
};

export default Authentication;
