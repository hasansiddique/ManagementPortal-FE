import { Map } from 'immutable';
import { createReducer } from 'redux-act';
import {
  requestUserLogin,
  userLoginSuccess,
  userLoginFailure,

  requestUserLogout,
  userLogoutSuccess,
  userLogoutFailure,

  requestUserRegister,
  registerUserSuccess,
  registerUserFailure,

  requestVerifyUserEmail,
  verifyUserEmailSuccess,
  verifyUserEmailFailure,

  requestUserPasswordReset,
  userPasswordResetSuccess,
  userPasswordResetFailure,

  requestResendUserVerification,
  resendUserVerificationSuccess,
  resendUserVerificationFailure,

} from './auth.actions';
import {
  FAILURE,
  FETCHING,
  SUCCESS,
  EMAIL_VERIFIED,
  EMAIL_VERIFYING,
  EMAIL_VERIFICATION_CONFLICT,
} from '../../common/constants';

const defaultState = Map({
  user: null,
  error: null,
  isLoggingIn: false,
  requestingLogin: '',
  isLoggingOut: false,
  isLoggedOut: false,
  isEmailVerified: '',
  isRegistering: false,
  isAuthenticated: false,
  isRegisterSuccess: false,
  isUpdatingAccount: false,
});

const reducer = createReducer({
  [requestUserLogin]: (state) => {
    return state
      .set('user', null)
      .set('error', null)
      .set('isAuthenticated', false)
      .set('requestingLogin', FETCHING)
      .set('isLoggingIn', true);
  },
  [userLoginSuccess]: (state, action) => {
    return state
      .set('user', action.user)
      .set('error', null)
      .set('isAuthenticated', true)
      .set('requestingLogin', SUCCESS)
      .set('isLoggingIn', false);
  },
  [userLoginFailure]: (state, action) => {
    return state
      .set('user', null)
      .set('error', action.err)
      .set('isAuthenticated', false)
      .set('requestingLogin', FAILURE)
      .set('isLoggingIn', false);
  },
  [requestUserLogout]: (state) => {
    return state
      .set('isAuthenticated', false)
      .set('isLoggingOut', true)
      .set('isLoggedOut', false);
  },
  [userLogoutSuccess]: (state) => {
    return state
      .set('isAuthenticated', false)
      .set('isLoggingOut', false)
      .set('isLoggedOut', true);
  },
  [userLogoutFailure]: (state) => {
    return state
      .set('isAuthenticated', false)
      .set('isLoggingOut', false)
      .set('isLoggedOut', false);
  },

  [requestUserRegister]: (state) => {
    return state
      .set('isRegistering', true)
      .set('isRegisterSuccess', false);
  },
  [registerUserSuccess]: (state) => {
    return state
      .set('isRegistering', false)
      .set('isRegisterSuccess', true);
  },
  [registerUserFailure]: (state) => {
    return state
      .set('isRegistering', false)
      .set('isRegisterSuccess', false);
  },

  [requestVerifyUserEmail]: (state) => {
    return state
      .set('isEmailVerified', EMAIL_VERIFYING);
  },
  [verifyUserEmailSuccess]: (state) => {
    return state
      .set('isEmailVerified', EMAIL_VERIFIED);
  },
  [verifyUserEmailFailure]: (state) => {
    return state
      .set('isEmailVerified', EMAIL_VERIFICATION_CONFLICT);
  },

  [requestUserPasswordReset]: (state) => {
    return state
      .set('resetMsg', '')
      .set('isLoggingIn', true);
  },
  [userPasswordResetSuccess]: (state) => {
    return state
      .set('resetMsg', SUCCESS)
      .set('isLoggingIn', false);
  },
  [userPasswordResetFailure]: (state) => {
    return state
      .set('resetMsg', FAILURE)
      .set('isLoggingIn', false);
  },

  [requestResendUserVerification]: (state) => {
    return state
      .set('isUpdatingAccount', true);
  },
  [resendUserVerificationSuccess]: (state) => {
    return state
      .set('isUpdatingAccount', false);
  },
  [resendUserVerificationFailure]: (state) => {
    return state
      .set('isUpdatingAccount', false);
  },
}, defaultState);

export default reducer;
