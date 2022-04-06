import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "user",
  initialState: {
    //loading states
    loading: false,
    loadingOne: false,
    creating: false,
    updating: false,
    changingPw: false,
    //success states
    created: false,
    fetched: false,
    updateSuccess: false,
    changeSuccess: false,
    changePwSuccess: false,

    //failure states
    createFailed: false,
    fetchFailed: false,
    fetchOneFailed: false,
    changeFailed: false,
    updateFailed: false,
    changePwFailed: false,

    //data
    createData: null,
    fetchData: null,
    fetchOneData: null
  },
  reducers: {
    reset: (user) => {
      //loading states
      user.loading = false;
      user.creating = false;
      user.changing = false;

      //success states
      user.created = false;
      user.fetched = false;


      //failure states
      user.createFailed = false;
      user.fetchFailed = false;
      user.changeFailed = false;

      //data
      user.createData = null;
      user.fetchData = null;
      user.changeSuccess = null;
    },
    resetCreate: user => {
      user.creating = false;
      user.createFailed = false;
      user.fetchFailed = false;
      user.createData = null;
    },
    resetUpdate: user => {
      user.updating = false;
      user.updateFailed = false;
      user.updateSuccess = false;
    },
    resetChange: user => {
      user.changing = false;
      user.changeFailed = false;
      user.changeSuccess = false;
    },
    resetChangePw: user => {
      user.changingPw = false;
      user.changePwFailed = false;
      user.changePwSuccess = false;
    },
    resetOne: user => {
      user.loadingOne = false;
      user.fetchOneFailed = false;
      user.fetchOneData = null;
    },
    //get request
    fetchUsersLoading: (user) => {
      user.loading = true;
    },
    //get success
    fetchUsersSuccess: (user, action) => {
      user.loading = false;
      user.fetchData = action.payload.data;
      user.fetchFailed = false;
    },
    //get err
    fetchUsersError: (user) => {
      user.loading = false;
      user.fetchFailed = true;
      user.fetchData = null;
    },
    fetchOneUserLoading: (user) => {
      user.loadingOne = true;
    },
    //get success
    fetchOneUserSuccess: (user, action) => {
      user.loadingOne = false;
      user.fetchOneData = action.payload.data;
      user.fetchOneFailed = false;
    },
    //get err
    fetchOneUserError: (user) => {
      user.loadingOne = false;
      user.fetchOneFailed = true;
      user.fetchOneData = null;
    },
    changeUserStatusLoading: (user) => {
      user.changing = true;
    },
    //get success
    changeUserStatusSuccess: (user, action) => {
      user.changing = false;
      user.changeSuccess = true;
      user.changeFailed = false;
    },
    //get err
    changeUserStatusError: (user) => {
      user.changing = false;
      user.changeSuccess = false;
      user.changeFailed = true;
    },
    changePwStatusLoading: (user) => {
      user.changingPw = true;
    },
    //get success
    changePwStatusSuccess: (user, action) => {
      user.changingPw = false;
      user.changePwSuccess = true;
      user.changePwFailed = false;
    },
    //get err
    changePwStatusError: (user) => {
      user.changingPw = false;
      user.changePwSuccess = false;
      user.changePwFailed = true;
    },
    updateUserStatusLoading: (user) => {
      user.updating = true;
    },
    //get success
    updateUserStatusSuccess: (user, action) => {
      user.updating = false;
      user.updateSuccess = true;
      user.updateFailed = false;
    },
    //get err
    updateUserStatusError: (user) => {
      user.updating = false;
      user.updateSuccess = false;
      user.updateFailed = true;
    },
    //create request
    createUsersLoading: (user) => {
      user.creating = true;
    },
    //create success
    createUsersSuccess: (user, action) => {
      user.creating = false;
      user.createData = action.payload;
      user.fetchFailed = false;
    },
    //create err
    createUsersError: (user, action) => {
      user.creating = false;
      user.createFailed = action.payload;
      user.createData = null;
    },
  },
});

const {
  fetchUsersLoading,
  fetchUsersSuccess,
  fetchUsersError,
  fetchOneUserLoading,
  fetchOneUserSuccess,
  fetchOneUserError,
  updateUserStatusLoading,
  updateUserStatusSuccess,
  updateUserStatusError,
  changeUserStatusLoading,
  changeUserStatusSuccess,
  changeUserStatusError,
  changePwStatusLoading,
  changePwStatusSuccess,
  changePwStatusError,
  createUsersLoading,
  createUsersSuccess,
  createUsersError,
  resetCreate,
  resetChange,
  resetUpdate,
  resetOne,
  resetChangePw,
  reset,
} = slice.actions;

//Action Creators
export const createUsers = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "createUser",
      method: "post",
      data: value.data,
      type: "user",
      onStart: createUsersLoading.type,
      onSuccess: createUsersSuccess.type,
      onError: createUsersError.type,
    })
  );
};


export const getUser = (value) => (dispatch) => {
  let url = `getusers`
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "user",
      onStart:  fetchUsersLoading.type,
      onSuccess:  fetchUsersSuccess.type,
      onError:  fetchUsersError.type,
    })
  );
};

export const getOneUser = (value) => (dispatch) => {
  let url = `?userId=${value.id}`
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "user",
      onStart:  fetchOneUserLoading.type,
      onSuccess:  fetchOneUserSuccess.type,
      onError:  fetchOneUserError.type,
    })
  );
};

export const deactivate = (value) => (dispatch) => {
  let url = `status`
  dispatch(
    apiCallBegan({
      url,
      method: "post",
      type: "user",
      data: value,
      onStart:  changeUserStatusLoading.type,
      onSuccess:  changeUserStatusSuccess.type,
      onError:  changeUserStatusError.type,
    })
  );
};

export const update = (value) => (dispatch) => {
  let url = "";
  dispatch(
    apiCallBegan({
      url,
      method: "put",
      type: "user",
      data: value.data,
      onStart:  updateUserStatusLoading.type,
      onSuccess:  updateUserStatusSuccess.type,
      onError:  updateUserStatusError.type,
    })
  );
};

export const changePwd = (value) => (dispatch) => {
  let url = "resetpassword";
  dispatch(
    apiCallBegan({
      url,
      method: "post",
      type: "user",
      data: value,
      onStart:  changePwStatusLoading.type,
      onSuccess:  changePwStatusSuccess.type,
      onError:  changePwStatusError.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetCreation = () => (dispatch) => dispatch({ type: resetCreate.type });
export const resetActivateDeactivate = () => (dispatch) => dispatch({ type: resetChange.type });
export const resetEdit = () => (dispatch) => dispatch({ type: resetUpdate.type });
export const resetOneUser = () => (dispatch) => dispatch({ type: resetOne.type });
export const resetPassword = () => (dispatch) => dispatch({ type: resetChangePw.type });

//Selectors
//Memoization
export const getUsers = createSelector(
  (state) => state.entities.users,
  (users) => users
);

export default slice.reducer;
