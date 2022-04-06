import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "notification",
  initialState: {
    loading: false,
    deleting: false,
    creating: false,
    updating: false,
    downloading: false,

    fetched: false,
    updated: false,
    downloadSuccess: false,

    fetchFailed: false,
    deleteFailed: false,
    createFailed: false,
    updateFailed: false,
    downloadFailed: false,

    fetchData: null,
    deleteData: null,
    createData: null,
    updateData: null,
    downloadData: null,
    downloadSlim: false,
  },
  reducers: {
    reset_download: notification => {
      notification.downloading = false
      notification.downloadSuccess = false
      notification.downloadFailed = false
      notification.downloadData = null
      notification.downloadSlim = false
    },
    reset: (notification) => {
      notification.loading = false;
      notification.deleting = false;
      notification.creating = false;
      notification.updating = false;

      notification.fetched = false;
      notification.updated = false;

      notification.fetchFailed = false;
      notification.createFailed = false;
      notification.deleteFailed = false;
      notification.updateFailed = false;

      notification.fetchData = null;
      notification.deleteData = null;
      notification.createData = null;
      notification.updateData = null;

      notification.downloading = false
      notification.downloadSuccess = false
      notification.downloadFailed = false
      notification.downloadData = null
      notification.downloadSlim = false
    },
    //get request
    fetchNotificationLoading: (notification) => {
      notification.loading = true;
    },
    //get success
    fetchNotificationSuccess: (notification, action) => {
      notification.loading = false;
      notification.fetchData = action.payload;
      notification.fetchFailed = false;
    },
    //get err
    fetchNotificationError: (notification) => {
      notification.loading = false;
      notification.fetchFailed = true;
      notification.fetchData = null;
    },
    // download radio
    downloadNotificationLoading: notification => {
      notification.downloading = true
    },
    downloadNotificationSuccess: (notification, action) => {
      notification.downloading = false
      notification.downloadSuccess = true
      notification.downloadData = action.payload
      notification.downloadSlim = action.payload.adminNotifications
      notification.downloadFailed = false
    },
    downloadNotificationFailed: (notification) => {
      notification.downloading = false
      notification.downloadData = null
      notification.downloadSuccess = false;
      notification.downloadSlim = null
      notification.downloadFailed = true
    },
    // delete
    deleteNotificationLoading: (notification) => {
      notification.deleting = true;
    },
    // delete success
    deleteNotificationSuccess: (notification, action) => {
      notification.deleting = false;
      notification.deleteData = action.payload;
      notification.deleteFailed = false;
    },
    // delete err
    deleteNotificationError: (notification) => {
      notification.deleting = false;
      notification.deleteFailed = true;
      notification.deleteData = null;
    },
    //create
    createNotificationLoading: (notification) => {
      notification.creating = true;
    },
    // delete success
    createNotificationSuccess: (notification, action) => {
      notification.creating = false;
      notification.createData = action.payload;
      notification.createFailed = false;
    },
    // delete err
    createNotificationError: (notification) => {
      notification.creating = false;
      notification.createFailed = true;
      notification.createData = null;
    },
    //update
    updateNotificationLoading: (notification) => {
      notification.updating = true;
    },
    // update success
    updateNotificationSuccess: (notification, action) => {
      notification.updating = false;
      notification.updated = true;
      notification.updateData = action.payload;
      notification.updateFailed = false;
    },
    // update err
    updateNotificationError: (notification, action) => {
      notification.updating = false;
      notification.updated = false;
      notification.updateFailed = action.payload;
      notification.updateData = null;
    },
  },
});

const {
  fetchNotificationLoading,
  fetchNotificationSuccess,
  fetchNotificationError,
  downloadNotificationLoading,
  downloadNotificationSuccess,
  downloadNotificationFailed,
  deleteNotificationLoading,
  deleteNotificationSuccess,
  deleteNotificationError,
  createNotificationLoading,
  createNotificationSuccess,
  createNotificationError,
  updateNotificationLoading,
  updateNotificationSuccess,
  updateNotificationError,
  reset_download,
  reset,
} = slice.actions;

//Action Creators

export const getNotification = (value, type = "normal") => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/admin-notifications?limit=${value?.limit}&offset=${value?.offset}`,
      method: "get",
      type: "pod",
      onStart: type === "download" ? downloadNotificationLoading.type : fetchNotificationLoading.type,
      onSuccess: type === "download" ? downloadNotificationSuccess.type : fetchNotificationSuccess.type,
      onError: type === "download" ? downloadNotificationFailed.type : fetchNotificationError.type,
    })
  );
};

export const createNotification = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/admin-notifications`,
      method: "post",
      type: "pod",
      data: value,
      onStart: createNotificationLoading.type,
      onSuccess: createNotificationSuccess.type,
      onError: createNotificationError.type,
    })
  );
};

export const updateNotification = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/admin-notifications/${value._id}`,
      method: "put",
      type: "pod",
      data: value.data,
      onStart: updateNotificationLoading.type,
      onSuccess: updateNotificationSuccess.type,
      onError: updateNotificationError.type,
    })
  );
};

export const deleteNotification = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/admin-notifications/${value?._id}`,
      method: "delete",
      type: "pod",
      onStart: deleteNotificationLoading.type,
      onSuccess: deleteNotificationSuccess.type,
      onError: deleteNotificationError.type,
    })
  );
};


export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetDownload = () => (dispatch) => dispatch({ type: reset_download.type });


//Selectors
//Memoization
export const getNotificationSelector = createSelector(
  (state) => state.entities.notification,
  (notification) => notification
);

export default slice.reducer;
