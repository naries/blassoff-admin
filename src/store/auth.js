import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    details: null,
    signupFailed: null,
    newUser: false,
    newUserData: null,
    reset: false,
    validated: false,
    passwordReset: false,
    lastFetch: null,
    loginFailed: null,
    //update user
    updating: false,
    updateData: null,
    updateFailed: null,
    //get user
    fetchingUser: false,
    fetchUserData: null,
    fetchUserFailed: null,
    //unblock user
    unblockingUser: false,
    unblockUserData: null,
    unblockUserFailed: null,
    //resend activation token
    resendingActivationCode: false,
    resendActivationCodeSuccess: null,
    resendActivationCodeFailed: null,
    //change password
    changingPwd: false,
    changePwdSuccess: null,
    changePwdFailed: null,
  },
  reducers: {
    reset: (auth) => {
      auth.loading = false;
      auth.newUser = false;
      auth.details = null;
      auth.signupFailed = null;
      auth.reset = false;
      auth.validated = false;
      auth.lastFetch = null;
      auth.passwordReset = false;
      auth.updating = false;
      auth.updateData = null;
      auth.updateFailed = null;
      auth.loginFailed = null;
      auth.fetchingUser = false;
      auth.fetchUserData = null;
      auth.fetchUserFailed = null;
      auth.newUserData = null;
      auth.unblockingUser = false;
      auth.unblockUserData = null;
      auth.unblockUserFailed = null;
      auth.resendingActivationCode = false;
      auth.resendActivationCodeSuccess = null;
      auth.resendActivationCodeFailed = null;
      auth.changingPwd = false;
      auth.changePwdSuccess = null;
      auth.changePwdFailed = null;
    },
    authRequested: (auth) => {
      auth.loading = true;
    },
    userRegistered: (auth, action) => {
      auth.newUser = true;
      auth.loading = false;
      auth.newUserData = action.payload;
    },
    userLoggedIn: (auth, action) => {
      const currentDate = new Date();
      auth.newUser = false;
      auth.details = action.payload.data;
      auth.lastFetch = moment(currentDate.getTime()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      auth.loading = false;
    },
    userAccountValidated: (auth, action) => {
      auth.loading = false;
      auth.validated = true;
      auth.details = action.payload;
    },
    userResetPassword: (auth, action) => {
      const currentDate = new Date();
      auth.loading = false;
      auth.details = action.payload;
      auth.lastFetch = moment(currentDate.getTime()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      auth.passwordReset = true;
    },
    sentResetPasswordLink: (auth, action) => {
      console.log("sentResetPasswordLink", action.payload)
      auth.loading = false;
      auth.details = action.payload;
      auth.reset = true;
    },
    authRequestFailed: (auth, action) => {
      auth.loading = false;
      auth.loginFailed = action.payload;
    },
    newUserFailed: (auth, action) => {
      auth.signupFailed = action.payload;
      auth.loading = false;
    },
    accountActivated: (auth, action) => {
      const currentDate = new Date();
      auth.newUser = false;
      auth.details = action.payload;
      auth.lastFetch = moment(currentDate.getTime()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      auth.loading = false;
    },
    passwordChanged: (auth, action) => {
      auth.loading = false;
      auth.details = action.payload;
    },
    //update user
    updatingUser: (auth) => {
      auth.updating = true;
      auth.updateData = null;
      auth.updateFailed = null;
    },
    updateUserFailed: (auth, action) => {
      auth.loading = false;
      auth.updateData = null;
      auth.updateFailed = action.payload;
    },
    updateUserSuccess: (auth, action) => {
      auth.loading = false;
      auth.updateData = action.payload;
      auth.updateFailed = null;
    },
    //get user
    gettingUser: (auth) => {
      auth.fetchingUser = true;
      auth.fetchUserData = null;
      auth.fetchUserFailed = null;
    },
    getUserSuccess: (auth, action) => {
      auth.fetchingUser = false;
      auth.fetchUserData = action.payload;
      auth.fetchUserFailed = null;
    },
    getUserFailed: (auth, action) => {
      auth.fetchingUser = false;
      auth.fetchUserData = null;
      auth.fetchUserFailed = action.payload;
    },
    //unlock user
    unlockingUser: (auth) => {
      auth.unblockingUser = true;
      auth.unblockUserData = null;
      auth.unblockUserFailed = null;
    },
    unlockUserSuccess: (auth, action) => {
      auth.unblockingUser = false;
      auth.unblockUserData = action.payload;
      auth.unblockUserFailed = null;
    },
    unlockUserFailed: (auth, action) => {
      auth.unblockingUser = false;
      auth.unblockUserData = null;
      auth.unblockUserFailed = action.payload;
    },
    //resend activation token
    resendingActivationToken: (auth) => {
      auth.resendingActivationCode = true;
      auth.resendActivationCodeSuccess = null;
      auth.resendActivationCodeFailed = null;
    },
    resendActivationTokenSuccess: (auth, action) => {
      auth.resendingActivationCode = false;
      auth.resendActivationCodeSuccess = action.payload;
      auth.resendActivationCodeFailed = null;
    },
    resendActivationTokenFailed: (auth, action) => {
      auth.resendingActivationCode = false;
      auth.resendActivationCodeSuccess = null;
      auth.resendActivationCodeFailed = action.payload;
    },
    //change password
    changingPassword: (auth) => {
      auth.changingPwd = true;
      auth.changePwdSuccess = null;
      auth.changePwdFailed = null;
    },
    changePasswordSuccess: (auth, action) => {
      auth.changingPwd = false;
      auth.changePwdSuccess = action.payload;
      auth.changePwdFailed = null;
    },
    changePasswordFailed: (auth, action) => {
      auth.changingPwd = false;
      auth.changePwdSuccess = null;
      auth.changePwdFailed = action.payload;
    },
    userLoggedOut: (auth) => {
      auth.isLogged = false;
    },
  },
});

const {
  authRequested,
  userLoggedIn,
  authRequestFailed,
  newUserFailed,
  userRegistered,
  sentResetPasswordLink,
  accountActivated,
  userAccountValidated,
  userResetPassword,
  //update user
  updatingUser,
  updateUserSuccess,
  updateUserFailed,
  //get user
  gettingUser,
  getUserSuccess,
  getUserFailed,
  //unlock user
  unlockingUser,
  unlockUserSuccess,
  unlockUserFailed,
  //resend activation token
  resendingActivationToken,
  resendActivationTokenSuccess,
  resendActivationTokenFailed,
  //change password
  changingPassword,
  changePasswordSuccess,
  changePasswordFailed,
  reset,
} = slice.actions;

//Action Creators
export const loginUser = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/login",
      method: "post",
      type: 'user',
      data: value,
      onStart: authRequested.type,
      onSuccess: userLoggedIn.type,
      onError: authRequestFailed.type,
    })
  );
};

export const registerUser = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/users/custom/creatorUser",
      method: "post",
      data: value,
      onStart: authRequested.type,
      onSuccess: userRegistered.type,
      onError: newUserFailed.type,
    })
  );
};

export const resetPassword = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/custom/forget-password/${value}`,
      method: "get",
      onStart: authRequested.type,
      onSuccess: sentResetPasswordLink.type,
      onError: authRequestFailed.type,
    })
  );
};

export const verifyAccount = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/users/custom/validate-token",
      method: "post",
      data: value,
      onStart: authRequested.type,
      onSuccess: userAccountValidated.type,
      onError: authRequestFailed.type,
    })
  );
};

export const resetUserPassword = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/users/custom/reset-password",
      method: "post",
      data: value.data,
      token: value.token,
      onStart: authRequested.type,
      onSuccess: userResetPassword.type,
      onError: authRequestFailed.type,
    })
  );
};

export const activateAccount = (token) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/custom/activate/${token}/creatorUser`,
      method: "get",
      onStart: authRequested.type,
      onSuccess: accountActivated.type,
      onError: authRequestFailed.type,
    })
  );
};

export const updateUser = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/users/user",
      method: "put",
      data: value,
      onStart: updatingUser.type,
      onSuccess: updateUserSuccess.type,
      onError: updateUserFailed.type,
    })
  );
};

export const viewUser = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/user/${value?.authUserId}`,
      method: "get",
      data: value,
      onStart: gettingUser.type,
      onSuccess: getUserSuccess.type,
      onError: getUserFailed.type,
    })
  );
};

export const unlockUser = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/user/enable/${value?.otp}`,
      method: "get",
      onStart: unlockingUser.type,
      onSuccess: unlockUserSuccess.type,
      onError: unlockUserFailed.type,
    })
  );
};

export const resendActivationToken = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/user/send-creator-token/${value?.email}`,
      method: "get",
      onStart: resendingActivationToken.type,
      onSuccess: resendActivationTokenSuccess.type,
      onError: resendActivationTokenFailed.type,
    })
  );
};

export const changePassword = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/users/custom/change-password",
      method: "patch",
      data: value,
      onStart: changingPassword.type,
      onSuccess: changePasswordSuccess.type,
      onError: changePasswordFailed.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });

//Selectors
//Memoization
export const getAuthDetails = createSelector(
  (state) => state.entities.auth,
  (auth) => auth
);

export default slice.reducer;
