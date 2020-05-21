/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Authentication from './Auth.view';
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUserEmail,
  userPasswordReset,
  resendEmailVerification,
  userPasswordUpdate,
} from './auth.api';

const authSelector = (state) => state.get('auth');

const loginStatusSelector = (state) => state.getIn(['auth', 'isLoggingIn']);

const AuthContainer = () => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);
  const isLoggingIn = useSelector(loginStatusSelector);

  const props = {
    logoutUser: () => dispatch(logoutUser()),
    loginUser: (payload) => dispatch(loginUser(payload)),
    registerUser: (payload) => dispatch(registerUser(payload)),
    verifyUserEmail: (token) => dispatch(verifyUserEmail(token)),
    userPasswordReset: (token) => dispatch(userPasswordReset(token)),
    resendEmailVerification: (token) => dispatch(resendEmailVerification(token)),
    userPasswordUpdate: (payload) => dispatch(userPasswordUpdate(payload)),
  };

  return (
    <Authentication
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      auth={auth}
      isLoggingIn={isLoggingIn}
    />
  );
};

export default AuthContainer;
