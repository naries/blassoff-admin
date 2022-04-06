import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { createSelector } from "reselect";


const slice = createSlice({
  name: 'listeners',

  initialState: {
    // loading states
    loading: false,
    toggling: false,
    activating: false,

    // success states
    fetched: false,
    toggleSuccess: true,
    activateSuccess: true,

    // failure states
    fetchFailed: false,
    toggleFailed: false,
    activateFailed: false,

    //data
    fetchData: null,
    fetchSlim: null,

    downloading: false,
    downloadSuccess: false,
    downloadFailed: false,
    downloadData: null,
    downloadSlim: false,
  },
  reducers: {
    reset_download: listener => {
      listener.downloading = false
      listener.downloadSuccess = false
      listener.downloadFailed = false
      listener.downloadData = null
      listener.downloadSlim = false
    },
    reset: listener => {
      // loading states
      listener.loading = false
      listener.toggling = false
      listener.activating = false

      // success states
      listener.fetched = false
      listener.toggleSuccess = false
      listener.activateSuccess = false

      // failure states
      listener.fetchFailed = false
      listener.toggleFailed = false
      listener.activateFailed = false

      // data
      listener.fetchData = null
    },
    resetToggle: listener => {
      listener.toggling = false
      listener.toggleSuccess = false
      listener.toggleFailed = false
    },
    resetActivate: listener => {
      listener.activating = false
      listener.activateSuccess = false
      listener.activateFailed = false
    },
    resetToggles: listener => {
      listener.toggling = false
      listener.toggleSuccess = false
      listener.toggleFailed = false
      listener.activating = false
      listener.activateSuccess = false
      listener.activateFailed = false
    },
    fetchCreatorsLoading: listener => {
      listener.loading = true
    },
    fetchCreatorsSuccess: (listener, action) => {
      listener.loading = false
      listener.fetchData = action.payload.response
      listener.fetchSlim = action.payload.response.value
      listener.fetchFailed = false
    },
    // download comments
    downloadListenersLoading: listener => {
      listener.downloading = true
    },
    downloadListenersSuccess: (listener, action) => {
      listener.downloading = false
      listener.downloadSuccess = true
      listener.downloadData = action.payload.response
      listener.downloadSlim = action.payload.response.value
      listener.downloadFailed = false
    },
    downloadListenersFailed: (listener) => {
      listener.downloading = false
      listener.downloadData = null
      listener.downloadSuccess = false;
      listener.downloadSlim = null
      listener.downloadFailed = true
    },
    fetchCreatorsFailed: (listener) => {
      listener.loading = false
      listener.fetchData = null
      listener.fetchSlim = null
      listener.fetchFailed = true
    },
    toggleExclusiveLoading: listener => {
      listener.toggling = true
    },
    toggleExclusiveSuccess: (listener, action) => {
      listener.toggling = false
      listener.toggleSuccess = true
      listener.toggleFailed = false
    },
    toggleExclusiveFailed: (listener) => {
      listener.toggling = false
      listener.toggleSuccess = false
      listener.toggleFailed = true
    },
    toggleActivateLoading: listener => {
      listener.activating = true
    },
    toggleActivateSuccess: (listener, action) => {
      listener.activating = false
      listener.activateSuccess = true
      listener.activateFailed = false
    },
    toggleActivateFailed: (listener) => {
      listener.activating = false
      listener.activateSuccess = false
      listener.activateFailed = true
    }
  }
})

const {
  fetchCreatorsLoading,
  fetchCreatorsFailed,
  fetchCreatorsSuccess,
  downloadListenersLoading,
  downloadListenersFailed,
  downloadListenersSuccess,
  toggleExclusiveLoading,
  toggleExclusiveFailed,
  toggleExclusiveSuccess,
  toggleActivateLoading,
  toggleActivateFailed,
  toggleActivateSuccess,
  resetActivate,
  resetToggle,
  resetToggles,
  reset_download,
  reset
} = slice.actions

// Actions listeners

export const getListener = (value, type) => (dispatch) => {
  let url = `users/listener-users?limit=${value?.limit}&offset=${value?.offset}&startDate=${value?.startDate}&endDate=${value?.endDate}`
  if (value?.search) {
    url += `&listenerSearch=${value?.search}`
  }

  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "listener",
      onStart: type === "download" ? downloadListenersLoading.type : fetchCreatorsLoading.type,
      onSuccess: type === "download" ? downloadListenersSuccess.type : fetchCreatorsSuccess.type,
      onError: type === "download" ? downloadListenersFailed.type : fetchCreatorsFailed.type,
    })
  );
};


export const toggleExclusive = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/approve-exclusive-user/${value?._id}?userId=${value?._id}`,
      method: "get",
      type: "listener",
      onStart: toggleExclusiveLoading.type,
      onSuccess: toggleExclusiveSuccess.type,
      onError: toggleExclusiveFailed.type,
    })
  );
};

export const toggleActivate = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/activate-listener/${value?._id}/admin`,
      method: "get",
      type: "listener",
      onStart: toggleActivateLoading.type,
      onSuccess: toggleActivateSuccess.type,
      onError: toggleActivateFailed.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetExclusivityToggle = () => (dispatch) => dispatch({ type: resetToggle.type });
export const resetActivationToggle = () => (dispatch) => dispatch({ type: resetActivate.type });
export const resetAllToggles = () => (dispatch) => dispatch({ type: resetToggles.type });
export const resetDownload = () => (dispatch) => dispatch({ type: reset_download.type });

//Selectors
//Memoization
export const getListeners = createSelector(
  (state) => state.entities.listeners,
  (listener) => listener
);

export default slice.reducer