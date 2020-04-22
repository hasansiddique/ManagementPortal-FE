import { Link, Redirect, withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Result, Spin } from 'antd';

const EmailVerification = ({ match, verifyUserEmail, isEmailVerified }) => {
  const [fireRedirect, handleFireRedirect] = useState(false);
  const [route, handleRoute] = useState('');

  useEffect(() => {
    if (isEmailVerified) {
      handleRoute('/user/login');
    }
  }, [isEmailVerified]);

  useEffect(() => {
    if (match && match.params && match.params.token) {
      verifyUserEmail(match.params.token);
    }
  }, []);

  return (
    <>
      <div key="redirect">
        {fireRedirect && [
          <div key={1}>{handleFireRedirect(false)}</div>,
          <Redirect key={2} to={route} />,
        ]}
      </div>

      {isEmailVerified === 'EMAIL_VERIFYING' && <Spin text="Verifying Email address" />}

      {isEmailVerified === 'EMAIL_VERIFIED' && (
        <Result
          status="success"
          title="Welcome!"
          subTitle="Thanks for signing up! We just send you an email to verify and complete your registration."
          extra={[
            <Button type="primary" style={{ width: '100%' }}>
              <Link to="/user/login">Login</Link>
            </Button>,
          ]}
        />
      )}

      {isEmailVerified === 'EMAIL_VERIFICATION_CONFLICT' && (
        <Result
          status="error"
          subTitle="Your email is already registered, please click on login button."
          extra={[
            <Button type="primary" style={{ width: '100%' }}>
              <Link to="/user/login">Login</Link>
            </Button>,
          ]}
        />
      )}
    </>
  );
};


EmailVerification.propTypes = {
  match: PropTypes.object.isRequired,
  verifyUserEmail: PropTypes.func.isRequired,
  isEmailVerified: PropTypes.string.isRequired,
};
export default withRouter(EmailVerification);
