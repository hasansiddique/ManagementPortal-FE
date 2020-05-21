/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { useDispatch } from 'react-redux';

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


const AuthContainer = () => {
  const dispatch = useDispatch();

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
    />
  );
};

export default AuthContainer;
