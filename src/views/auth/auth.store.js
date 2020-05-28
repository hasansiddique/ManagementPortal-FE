import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import {
  INACTIVE, SUCCESS, FAILURE, ACTIVE, EMAIL_VERIFYING, EMAIL_VERIFIED, EMAIL_VERIFICATION_CONFLICT,
} from '../../common/constants';

const initialState = Map({
  user: null,
  loginStatus: INACTIVE,
  loginError: null,
  logoutStatus: INACTIVE,
  logoutError: null,
  registerStatus: INACTIVE,
  registerError: null,
  isAuthenticated: false,
  isEmailVerified: '',
  resetMsg: '',
  isUpdatingAccount: false,
  passwordUpdateStatus: INACTIVE,
});

const loginReducers = {
  requestUserLogin: (state) => state
    .set('user', null)
    .set('loginError', null)
    .set('isAuthenticated', false)
    .set('loginStatus', ACTIVE),
  userLoginSuccess: (state, action) => state
    .set('user', action.payload)
    .set('loginError', null)
    .set('isAuthenticated', true)
    .set('loginStatus', SUCCESS),
  userLoginFailure: (state, action) => state
    .set('user', null)
    .set('loginError', action.payload)
    .set('isAuthenticated', false)
    .set('loginStatus', FAILURE),
};

const logoutReducers = {
  requestUserLogout: (state) => state
    .set('logoutError', null)
    .set('logoutStatus', ACTIVE),
  userLogoutSuccess: (state) => state
    .set('isAuthenticated', false)
    .set('logoutStatus', SUCCESS),
  userLogoutFailure: (state, action) => state
    .set('logoutError', action.payload)
    .set('logoutStatus', FAILURE),
};

const registerReducers = {
  requestUserRegister: (state) => state
    .set('registerError', null)
    .set('registerStatus', ACTIVE),
  userRegisterSuccess: (state) => state
    .set('registerStatus', SUCCESS),
  userRegisterFailure: (state, action) => state
    .set('registerError', action.payload)
    .set('registerStatus', FAILURE),
};

const emailVerficationReducers = {
  requestVerifyUserEmail: (state) => state
    .set('isEmailVerified', EMAIL_VERIFYING),
  verifyUserEmailSuccess: (state) => state
    .set('isEmailVerified', EMAIL_VERIFIED),
  verifyUserEmailFailure: (state) => state
    .set('isEmailVerified', EMAIL_VERIFICATION_CONFLICT),
};

const passwordResetReducers = {
  requestUserPasswordReset: (state) => state
    .set('resetMsg', ''),
  userPasswordResetSuccess: (state) => state
    .set('resetMsg', SUCCESS),
  userPasswordResetFailure: (state) => state
    .set('resetMsg', FAILURE),
};

const userVerificationReducers = {
  requestResendUserVerification: (state) => state
    .set('isUpdatingAccount', true),
  resendUserVerificationSuccess: (state) => state
    .set('isUpdatingAccount', false),
  resendUserVerificationFailure: (state) => state
    .set('isUpdatingAccount', false),
};

const updatePasswordReducers = {
  requestUserPasswordUpdate: (state) => state
    .set('passwordUpdateStatus', ACTIVE),
  userPasswordUpdateSuccess: (state) => state
    .set('passwordUpdateStatus', SUCCESS),
  userPasswordUpdateFailure: (state) => state
    .set('passwordUpdateStatus', FAILURE),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...loginReducers,
    ...logoutReducers,
    ...registerReducers,
    ...emailVerficationReducers,
    ...passwordResetReducers,
    ...userVerificationReducers,
    ...updatePasswordReducers,
  },
});

export const {
  requestUserLogin,
  requestUserLogout,
  userLoginFailure,
  userLoginSuccess,
  userLogoutFailure,
  userLogoutSuccess,
  requestUserRegister,
  userRegisterFailure,
  userRegisterSuccess,
  requestResendUserVerification,
  requestUserPasswordReset,
  requestVerifyUserEmail,
  resendUserVerificationFailure,
  resendUserVerificationSuccess,
  userPasswordResetFailure,
  userPasswordResetSuccess,
  verifyUserEmailFailure,
  verifyUserEmailSuccess,
  requestUserPasswordUpdate,
  userPasswordUpdateFailure,
  userPasswordUpdateSuccess,
} = authSlice.actions;

export default authSlice.reducer;
