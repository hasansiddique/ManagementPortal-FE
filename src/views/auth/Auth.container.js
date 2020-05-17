import { connect } from 'react-redux';

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

const mapStateToProps = (state) => ({
  user: state.getIn(['auth', 'user']),
  error: state.getIn(['auth', 'error']),
  isLoggingIn: state.getIn(['auth', 'isLoggingIn']),
  isLoggedOut: state.getIn(['auth', 'isLoggedOut']),
  isLoggingOut: state.getIn(['auth', 'isLoggingOut']),
  isRegistering: state.getIn(['auth', 'isRegistering']),
  isEmailVerified: state.getIn(['auth', 'isEmailVerified']),
  requestingLogin: state.getIn(['auth', 'requestingLogin']),
  isRegisterSuccess: state.getIn(['auth', 'isRegisterSuccess']),
  isUpdatedPassword: state.getIn(['auth', 'isUpdatedPassword']),
});

const mapDispatchToProps = (dispatch) => {
  return ({
    logoutUser: () => {
      dispatch(logoutUser());
    },
    loginUser: (payload) => {
      dispatch(loginUser((payload)));
    },
    registerUser: (payload) => {
      dispatch(registerUser(payload));
    },
    verifyUserEmail: (token) => {
      dispatch(verifyUserEmail(token));
    },
    userPasswordReset: (token) => {
      dispatch(userPasswordReset(token));
    },
    resendEmailVerification: (token) => {
      dispatch(resendEmailVerification(token));
    },
    userPasswordUpdate: (payload) => {
      dispatch(userPasswordUpdate(payload));
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
