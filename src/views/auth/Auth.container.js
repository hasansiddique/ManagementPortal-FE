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

import { ACTIVE, SUCCESS, EMAIL_VERIFIED } from '../../common/constants';


const AuthContainer = () => {
  const dispatch = useDispatch();

  const props = {
    isLoggingIn: useSelector((state) => state.getIn(['auth', 'loginStatus']) === ACTIVE),
    isRegistering: useSelector((state) => state.getIn(['auth', 'registerStatus']) === ACTIVE),
    isRegisterSuccess: useSelector((state) => state.getIn(['auth', 'registerStatus']) === SUCCESS),
    isLoggingOut: useSelector((state) => state.getIn(['auth', 'logoutStatus']) === ACTIVE),
    isLoggedOut: useSelector((state) => state.getIn(['auth', 'logoutStatus']) === SUCCESS),
    isEmailVerified: useSelector((state) => state.getIn(['auth', 'isEmailVerified']) === EMAIL_VERIFIED),
    isUpdatedPassword: useSelector((state) => state.getIn(['auth', 'passwordUpdateStatus']) === SUCCESS),
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
