import get from 'lodash/get';
// import CryptoJS from 'crypto-js';

import request from '../../common/request';
import storage from '../../common/storage';
import { HTTP_STATUS } from '../../common/constants';
import { openNotification } from '../../components/Notification';

import {
  requestUserLogin,
  userLoginSuccess,
  userLoginFailure,
  requestUserRegister,
  userRegisterSuccess,
  userRegisterFailure,
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
  requestUserPasswordUpdate,
  userPasswordUpdateSuccess,
  userPasswordUpdateFailure,
} from './auth.store';

// @Todo (Hanzlah) working on crypto js for data encryption and decryption for security if required
//  now i commented the following below code for crypto js and uncomment import module from top

export const getUser = () => {
  return async (dispatch) => {
    dispatch(requestUserLogin());

    try {
      const userId = get(storage.get('user'), 'user.id');
      const res = await request.get(`/v1/users/${userId}`);
      dispatch(userLoginSuccess(res.data || {}));
      // // Encrypt
      // const encryptData = CryptoJS.AES.encrypt(
      //   JSON.stringify(res.data),
      //   'secret key 123',
      // ).toString();
      // console.log('encryptedData', encryptData);
      // // Decrypt
      // const bytes = CryptoJS.AES.decrypt(encryptData, 'secret key 123');
      // const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log('decryptedData', decryptedData);
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
      storage.set('user', { ...res.data });
      window.location.reload();
      return res;
    } catch (err) {
      dispatch(userLoginFailure(err));
      if (
        err.response.status === HTTP_STATUS.UNAUTHORIZED || HTTP_STATUS.NOT_FOUND
      ) {
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
      dispatch(userRegisterSuccess());
      return res;
    } catch (err) {
      dispatch(userRegisterFailure());
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
          description:
            'Email address already exists, please try different email address.',
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
      const refreshToken = get(storage.get('user'), 'token.refreshToken');
      const data = { token: refreshToken };
      const payload = JSON.stringify(data);
      const res = await request.post('/v1/users/logout', payload);
      storage.clear();
      dispatch(userLogoutSuccess());

      return res;
    } catch (err) {
      dispatch(userLogoutFailure(err));
      if (err.response.status === HTTP_STATUS.BAD_REQUEST) {
        return null;
      }
    }
    return null;
  };
};

export const refreshToken = () => {
  return async () => {
    try {
      const refToken = get(storage.get('user'), 'token.refreshToken');
      const obj = storage.get('user');
      const data = { token: refToken };
      const payload = JSON.stringify(data);
      const res = await request.post('/v1/users/token', payload);
      storage.set(
        'user',
        Object.assign(obj, {
          token: {
            accessToken: res.data.accessToken,
            refreshToken: obj.token.refreshToken,
          },
        }),
      );
      return res;
    } catch (err) {
      if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
        storage.clear();
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
      dispatch(userPasswordResetSuccess());
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

export const userPasswordUpdate = (payload) => {
  return async (dispatch) => {
    dispatch(requestUserPasswordUpdate());

    try {
      const res = await request.put('/v1/users/update-password', payload);
      dispatch(userPasswordUpdateSuccess());
      if (res.status === 200) {
        openNotification({
          type: 'success',
          title: 'User Login',
          description: 'Password SuccessFully Updated',
        });
      }
      return res;
    } catch (err) {
      dispatch(userPasswordUpdateFailure());
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
