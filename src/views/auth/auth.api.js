import get from 'lodash/get';

import request from '../../common/request';
import storage from '../../common/storage';
import { HTTP_STATUS } from '../../common/constants';
import { openNotification } from '../../components/Notification';
import {
  requestUserLogin,
  userLoginSuccess,
  userLoginFailure,

  requestUserRegister,
  registerUserSuccess,
  registerUserFailure,

  requestUserLogout,
  userLogoutSuccess,
  userLogoutFailure,

  requestUserPasswordReset,
  userPasswordResetSuccess,
  userPasswordResetFailure,

  requestVerifyUserEmail,
  verifyUserEmailSuccess,
  verifyUserEmailFailure,

  requestResendUserVerification,
  resendUserVerificationSuccess,
  resendUserVerificationFailure,
} from './auth.actions';

export const getUser = () => {
  return async (dispatch) => {
    dispatch(requestUserLogin());

    try {
      const userId = get(storage.get('user'), 'id');
      const res = await request.get(`/v1/users/${userId}`);
      dispatch(userLoginSuccess(res.data || {}));

      return res;
    } catch (err) {
      dispatch(userLoginFailure(err));
      if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Unauthorized User',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Some thing went wrong while making the request',
        });
      }

      return null;
    }
  };
};

export const loginUser = (payload) => {
  return async (dispatch) => {
    dispatch(requestUserLogin());

    try {
      const res = await request.post('/v1/users/login', payload);

      dispatch(userLoginSuccess(res.data || {}));
      storage.set('user', Object.assign(res.data, {}));
      window.location.reload();

      return res;
    } catch (err) {
      dispatch(userLoginFailure(err));
      if (err.response.status === HTTP_STATUS.UNAUTHORIZED || HTTP_STATUS.NOT_FOUND) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Some thing went wrong while making the request',
        });
      }
      return null;
    }
  };
};

export const registerUser = (payload) => {
  return async (dispatch) => {
    dispatch(requestUserRegister());

    try {
      const res = await request.post('/v1/users', payload);
      dispatch(registerUserSuccess());
      return res;
    } catch (err) {
      dispatch(registerUserFailure());
      if (err.response.status === HTTP_STATUS.BAD_REQUEST) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Email!',
        });
      } else if (err.response.status === HTTP_STATUS.CONFLICT) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Email address already exists, please try different email address.',
        });
      }
      return null;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(requestUserLogout());
    try {
      const userId = get(storage.get('user'), 'id');
      const res = await request.post(`/v1/users/${userId}/logout`);
      dispatch(userLogoutSuccess());
      storage.clear();

      return res;
    } catch (e) {
      dispatch(userLogoutFailure());
      if (e.response.status === HTTP_STATUS.BAD_REQUEST) {
        return null;
      }
    }
    return null;
  };
};


export const userPasswordReset = (data) => {
  return async (dispatch) => {
    dispatch(requestUserPasswordReset());

    try {
      const res = await request.post('/v1/users/reset-password', data);
      dispatch(userPasswordResetSuccess(res.data));
      return res;
    } catch (err) {
      dispatch(userPasswordResetFailure());
      if (err.response.status === HTTP_STATUS.BAD_REQUEST) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Some thing went wrong while making the request',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'User Account',
          description: 'Some thing went wrong while making the request',
        });
      }
    }
    return null;
  };
};

export const verifyUserEmail = (token) => {
  return async (dispatch) => {
    dispatch(requestVerifyUserEmail());

    try {
      const res = await request.post(`/v1/users/confirm/${token}`);
      dispatch(verifyUserEmailSuccess(res.data));
      return res;
    } catch (err) {
      dispatch(verifyUserEmailFailure());
      if (err.response.status === HTTP_STATUS.NOT_FOUND) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid User!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Some thing went wrong while making the request',
        });
      }
    }
    return null;
  };
};


export const resendEmailVerification = (data) => {
  return async (dispatch) => {
    dispatch(requestResendUserVerification());

    try {
      const res = await request.post('/v1/users/resend-confirmation', data);
      dispatch(resendUserVerificationSuccess(res.data));
      return res;
    } catch (err) {
      dispatch(resendUserVerificationFailure());
      if (err.response.status === HTTP_STATUS.BAD_REQUEST) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Incorrect Email Address, Please try again',
        });
      } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
        openNotification({
          type: 'error',
          title: 'User Account',
          description: 'Invalid Email Address, Please ty again',
        });
      } else if (err.response.status === HTTP_STATUS.CONFLICT) {
        openNotification({
          type: 'error',
          title: 'User Account',
          description: 'Email is already confirmed.',
        });
      }
    }
    return null;
  };
};
