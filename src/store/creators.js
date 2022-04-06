import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { createSelector } from "reselect";


const slice = createSlice({
  name: 'creator',

  initialState: {
    // loading states
    loading: false,
    toggling: false,
    activating: false,
    downloading: false,

    // success states
    fetched: false,
    toggleSuccess: true,
    activateSuccess: true,
    downloadSuccess: true,

    // failure states
    fetchFailed: false,
    toggleFailed: false,
    activateFailed: false,
    downloadFailed: true,

    //data
    fetchData: null,
    fetchSlim: null,
    downloadSlim: null,
  },
  reducers: {
    reset: creator => {
      // loading states
      creator.loading = false
      creator.toggling = false
      creator.activating = false
      creator.downloading = false

      // success states
      creator.fetched = false
      creator.toggleSuccess = false
      creator.activateSuccess = false
      creator.downloadSuccess = false

      // failure states
      creator.fetchFailed = false
      creator.toggleFailed = false
      creator.activateFailed = false
      creator.downloadFailed = false

      // data
      creator.fetchData = null
      creator.downloadData = null
      creator.downloadSlim = false
    },
    resetToggle: creator => {
      creator.toggling = false
      creator.toggleSuccess = false
      creator.toggleFailed = false
    },
    reset_download: creator => {
      creator.downloading = false
      creator.downloadSuccess = false
      creator.downloadFailed = false
      creator.downloadData = null
      creator.downloadSlim = false
    },
    resetActivate: creator => {
      creator.activating = false
      creator.activateSuccess = false
      creator.activateFailed = false
    },
    resetToggles: creator => {
      creator.toggling = false
      creator.toggleSuccess = false
      creator.toggleFailed = false
      creator.activating = false
      creator.activateSuccess = false
      creator.activateFailed = false
    },
    fetchCreatorsLoading: creator => {
      creator.loading = true
    },
    fetchCreatorsSuccess: (creator, action) => {
      creator.loading = false
      creator.fetchData = action.payload.response
      creator.fetchSlim = action.payload.response.value
      creator.fetchFailed = false
    },
    fetchCreatorsFailed: (creator) => {
      creator.loading = false
      creator.fetchData = null
      creator.fetchSlim = null
      creator.fetchFailed = true
    },
    downloadCreatorsLoading: creator => {
      creator.downloading = true
    },
    downloadCreatorsSuccess: (creator, action) => {
      creator.downloading = false
      creator.downloadSuccess = true
      creator.downloadData = action.payload.response
      creator.downloadSlim = action.payload.response.value
      creator.downloadFailed = false
    },
    downloadCreatorsFailed: (creator) => {
      creator.downloading = false
      creator.downloadData = null
      creator.downloadSuccess = false;
      creator.downloadSlim = null
      creator.downloadFailed = true
    },
    toggleExclusiveLoading: creator => {
      creator.toggling = true
    },
    toggleExclusiveSuccess: (creator, action) => {
      creator.toggling = false
      creator.toggleSuccess = true
      creator.toggleFailed = false
    },
    toggleExclusiveFailed: (creator) => {
      creator.toggling = false
      creator.toggleSuccess = false
      creator.toggleFailed = true
    },
    toggleActivateLoading: creator => {
      creator.activating = true
    },
    toggleActivateSuccess: (creator, action) => {
      creator.activating = false
      creator.activateSuccess = true
      creator.activateFailed = false
    },
    toggleActivateFailed: (creator) => {
      creator.activating = false
      creator.activateSuccess = false
      creator.activateFailed = true
    }
  }
})

const {
  fetchCreatorsLoading,
  fetchCreatorsFailed,
  downloadCreatorsSuccess,
  downloadCreatorsLoading,
  downloadCreatorsFailed,
  fetchCreatorsSuccess,
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

// Actions creators

// type can be normal or download.
export const getCreator = (value, type = "normal") => (dispatch) => {
  let url = `users/creator-users?limit=${value?.limit}&offset=${value?.offset}&startDate=${value?.startDate}&endDate=${value?.endDate}`
  if (value?.search) {
    url += `&creatorSearch=${value?.search}`
  }

  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "creator",
      onStart: type === "download" ? downloadCreatorsLoading.type : fetchCreatorsLoading.type,
      onSuccess: type === "download" ? downloadCreatorsSuccess.type : fetchCreatorsSuccess.type,
      onError: type === "download" ? downloadCreatorsFailed.type : fetchCreatorsFailed.type,
    })
  );
};


export const toggleExclusive = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/approve-exclusive-user/${value?._id}?userId=${value?._id}`,
      method: "get",
      type: "creator",
      onStart: toggleExclusiveLoading.type,
      onSuccess: toggleExclusiveSuccess.type,
      onError: toggleExclusiveFailed.type,
    })
  );
};

export const toggleActivate = (value) => (dispatch) => {
  let url = `/users/activate-deactive-creator/admin?userId=${value?._id}`
  if (value?.status === 'active')
    url += `&status=suspended`
  if (value?.status === 'suspended')
    url += `&status=active`
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "creator",
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
export const getCreators = createSelector(
  (state) => state.entities.creators,
  (creator) => creator
);

export default slice.reducer