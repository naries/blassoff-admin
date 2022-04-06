import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "radio",
  initialState: {
    //loading states
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    updatingRadio: false,
    loadingImpression: false,
    downloading: false,
    //success states
    created: false,
    fetched: false,
    updated: false,
    deleted: false,
    downloadSuccess: false,
    //failure states
    createFailed: false,
    fetchFailed: false,
    updateFailed: false,
    deleteFailed: false,
    updateRadioFailed: null,
    fetchImpressionFailed: false,
    downloadFailed: false,
    //data
    createData: null,
    fetchData: null,
    updateData: null,
    deleteData: null,
    updateRadioData: null,
    lastFetch: null,
    fetchImpressionData: null,
    downloadData: null,
    downloadSlim: null,
  },
  reducers: {
    reset_download: radio => {
      radio.downloading = false
      radio.downloadSuccess = false
      radio.downloadFailed = false
      radio.downloadData = null
      radio.downloadSlim = false
    },
    reset: (radio) => {
      //loading states
      radio.loading = false;
      radio.creating = false;
      radio.updating = false;
      radio.deleting = false;
      radio.updatingRadio = false;
      radio.downloading = false;

      //success states
      radio.created = false;
      radio.fetched = false;
      radio.updated = false;
      radio.deleted = false;
      radio.downloadSuccess = false;


      //failure states
      radio.createFailed = false;
      radio.fetchFailed = false;
      radio.updateFailed = false;
      radio.deleteFailed = false;
      radio.updateRadioFailed = null;
      radio.downloadFailed = false
      //data
      radio.createData = null;
      radio.fetchData = null;
      radio.updateData = null;
      radio.deleteData = null;
      radio.lastFetch = null;
      radio.updateRadioData = null;
      radio.downloadData = null;
      radio.downloadSlim = null;
    },
    //get request
    fetchRadioLoading: (radio) => {
      radio.loading = true;
    },
    //get success
    fetchRadioSuccess: (radio, action) => {
      radio.loading = false;
      radio.fetchData = action.payload;
      radio.fetchFailed = false;
    },
    //get err
    fetchRadioError: (radio) => {
      radio.loading = false;
      radio.fetchFailed = true;
      radio.fetchData = null;
    },
    // download radio
    downloadRadioLoading: radio => {
      radio.downloading = true
    },
    downloadRadioSuccess: (radio, action) => {
      radio.downloading = false
      radio.downloadSuccess = true
      radio.downloadData = action.payload
      radio.downloadSlim = action.payload.value
      radio.downloadFailed = false
    },
    downloadRadioFailed: (radio) => {
      radio.downloading = false
      radio.downloadData = null
      radio.downloadSuccess = false;
      radio.downloadSlim = null
      radio.downloadFailed = true
    },
    //create request
    createRadioLoading: (radio) => {
      radio.creating = true;
    },
    //create success
    createRadioSuccess: (radio, action) => {
      radio.creating = false;
      radio.createData = action.payload;
      radio.fetchFailed = false;
    },
    //create err
    createRadioError: (radio, action) => {
      radio.creating = false;
      radio.createFailed = action.payload;
      radio.createData = null;
    },
    //update request
    updateRadioLoading: (radio) => {
      radio.updating = true;
    },
    //update success
    updateRadioSuccess: (radio, action) => {
      radio.updating = false;
      radio.updateData = action.payload;
      radio.updateFailed = false;
    },
    //update error
    updateRadioError: (radio) => {
      radio.updating = false;
      radio.updateFailed = true;
      radio.updateData = null;
    },
    //update radio request
    updateRadioRadiosLoading: (radio) => {
      radio.updatingRadio = true;
    },
    //update Radio success
    updateRadioRadiosSuccess: (radio, action) => {
      radio.updatingRadio = false;
      radio.updateRadioData = action.payload;
      radio.updateRadioFailed = false;
    },
    //update Radio error
    updateRadioRadiosError: (radio, action) => {
      radio.updatingRadio = false;
      radio.updateRadioFailed = action.payload;
      radio.updateRadioData = null;
    },
    //delete request
    toggleRadioLoading: (radio) => {
      radio.deleting = true;
    },
    //delete success
    toggleRadioSuccess: (radio, action) => {
      radio.deleting = false;
      radio.deleteData = action.payload;
      radio.deleteFailed = false;
    },
    //delete err
    toggleRadioError: (radio) => {
      radio.deleting = false;
      radio.deleteFailed = true;
      radio.deleteData = null;
    },

    deletingRadio: (radio) => {
      radio.deleting = true;
      radio.deleteFailed = false;
    },
    deletingRadioSuccess: (radio, action) => {
      radio.deleting = false;
      radio.deleted = true;
      radio.deleteData = action.payload;
      radio.deleteFailed = false;
    },
    deletingRadioFailed: (radio, action) => {
      radio.deleting = false;
      radio.deleted = false;
      radio.deleteData = null;
      radio.deleteFailed = action.payload;
    },

    fetchImpressionsLoading: (radio) => {
      radio.loadingImpression = true;
    },
    //get success
    fetchImpressionsSuccess: (radio, action) => {
      radio.loadingImpression = false;
      radio.fetchImpressionData = action.payload;
      radio.fetchImpressionFailed = false;
    },
    //get err
    fetchImpressionsError: (radio) => {
      radio.loadingImpression = false;
      radio.fetchImpressionFailed = true;
      radio.fetchImpressionData = null;
    },
  },
});

const {
  fetchRadioLoading,
  fetchRadioSuccess,
  fetchRadioError,
  downloadRadioLoading,
  downloadRadioSuccess,
  downloadRadioFailed,
  createRadioLoading,
  createRadioSuccess,
  createRadioError,
  updateRadioLoading,
  updateRadioSuccess,
  updateRadioError,
  toggleRadioLoading,
  toggleRadioSuccess,
  toggleRadioError,
  deletingRadio,
  deletingRadioFailed,
  deletingRadioSuccess,
  fetchImpressionsLoading,
  fetchImpressionsError,
  fetchImpressionsSuccess,
  reset_download,
  reset,
} = slice.actions;

//Action Creators
export const createRadio = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/radio/radio",
      method: "post",
      data: value.data,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "radio",
      onStart: createRadioLoading.type,
      onSuccess: createRadioSuccess.type,
      onError: createRadioError.type,
    })
  );
};

export const updateRadio = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `radio/radio/${value?.id}`,
      method: "patch",
      data: value.data,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "radio",
      onStart: updateRadioLoading.type,
      onSuccess: updateRadioSuccess.type,
      onError: updateRadioError.type,
    })
  );
};

export const getRadio = (value, type = "normal") => (dispatch) => {
  let url = `radio/admin/radios?limit=${value.limit}&offset=${value?.offset}&startDate=${value.startDate}&endDate=${value.endDate}`
  if (value?.search) {
    url +=`&search=${value?.search}`
  }
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "radio",
      onStart: type === "download" ? downloadRadioLoading.type : fetchRadioLoading.type,
      onSuccess: type === "download" ? downloadRadioSuccess.type : fetchRadioSuccess.type,
      onError: type === "download" ? downloadRadioFailed.type : fetchRadioError.type,
    })
  );
};

export const getTotalImpressions = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `radio/radio/impression`,
      method: "get",
      type: "radio",
      onStart: fetchImpressionsLoading.type,
      onSuccess: fetchImpressionsSuccess.type,
      onError: fetchImpressionsError.type,
    })
  );
};

export const deleteRadio = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/radio/radio/${value.radioId}`,
      method: "delete",
      type: "radio",
      onStart: deletingRadio.type,
      onSuccess: deletingRadioSuccess.type,
      onError: deletingRadioFailed.type,
    })
  );
};
export const toggleActivation = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `radio/radio/${value.id}/${value.status}`,
      method: "get",
      type: "radio",
      onStart: toggleRadioLoading.type,
      onSuccess: toggleRadioSuccess.type,
      onError: toggleRadioError.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetDownload = () => (dispatch) => dispatch({ type: reset_download.type });

//Selectors
//Memoization
export const getRadios = createSelector(
  (state) => state,
  (radio) => radio
);


export default slice.reducer;
