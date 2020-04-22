import { createAction } from 'redux-act';

export const requestUserLogin = createAction();
export const userLoginSuccess = createAction((user) => ({ user }));
export const userLoginFailure = createAction((err) => ({ err }));

export const requestUserRegister = createAction();
export const registerUserSuccess = createAction();
export const registerUserFailure = createAction();

export const requestUserLogout = createAction();
export const userLogoutSuccess = createAction();
export const userLogoutFailure = createAction();

export const requestUserPasswordReset = createAction();
export const userPasswordResetSuccess = createAction();
export const userPasswordResetFailure = createAction();

export const requestVerifyUserEmail = createAction();
export const verifyUserEmailSuccess = createAction();
export const verifyUserEmailFailure = createAction();

export const requestResendUserVerification = createAction();
export const resendUserVerificationSuccess = createAction((email) => ({ email }));
export const resendUserVerificationFailure = createAction();
