import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "podcast",
  initialState: {
    //loading states
    loading: false,
    loadingAll: false,
    loadingAllAdmin: false,
    creating: false,
    updating: false,
    deleting: false,
    isSearching: false,
    rssLoading: false,
    getOneLoading: false,
    suspending: false,
    downloading: false,
    //success states
    created: false,
    fetched: false,
    updated: false,
    deleted: false,
    isSearched: false,
    rssFetchSuccess: false,
    gotOne: false,
    suspended: false,
    downloadSuccess: false,
    //failure states
    createFailed: false,
    fetchFailed: false,
    updateFailed: false,
    deleteFailed: false,
    fetchAllFailed: false,
    fetchAllAdminFailed: false,
    searchFailed: false,
    rssFetchFailed: false,
    getOneFailed: false,
    suspendFailed: false,
    downloadFailed: false,
    //data
    createData: null,
    fetchData: null,
    fetchAllData: null,
    fetchAllAdminData: null,
    updateData: null,
    deleteData: null,
    lastFetch: null,
    searchData: null,
    rssFetchData: null,
    getOneData: null,
    suspendData: null,
    downloadData: null,
    donwloadSlim: null
  },
  reducers: {
    resetRss: (podcast) => {
      podcast.rssLoading = false;
      podcast.rssFetchSuccess = false;
      podcast.rssFetchFailed = false;
      podcast.rssFetchData = null;
    },
    resetSuspended: (podcast) => {
      podcast.suspending = false;
      podcast.suspended = false;
      podcast.suspendFailed = false;
      podcast.suspendData = null;
    },
    resetOne: (podcast) => {
      podcast.getOneLoading = false;
      podcast.getOneFailed = false;
      podcast.gotOne = false;
      podcast.getOneData = null;
    },
    reset: (podcast) => {
      //loading states
      podcast.loading = false;
      podcast.loadingAll = false;
      podcast.loadingAllAdmin = false;
      podcast.creating = false;
      podcast.updating = false;
      podcast.deleting = false;
      podcast.isSearching = false;
      podcast.rssLoading = false;
      podcast.getOneLoading = false;
      podcast.suspending = false;
      podcast.downloading = false
      //success states
      podcast.created = false;
      podcast.fetched = false;
      podcast.updated = false;
      podcast.deleted = false;
      podcast.isSearched = false;
      podcast.rssFetchSuccess = false;
      podcast.gotOne = false;
      podcast.suspended = false;
      podcast.downloadSuccess = false;
      //failure states
      podcast.createFailed = false;
      podcast.fetchFailed = false;
      podcast.updateFailed = false;
      podcast.deleteFailed = false;
      podcast.fetchAllFailed = false;
      podcast.fetchAllAdmin = false;
      podcast.searchFailed = false;
      podcast.rssFetchFailed = false;
      podcast.getOneFailed = false;
      podcast.suspendFailed = false;
      podcast.downloadFailed = false;
      //data
      podcast.createData = null;
      podcast.fetchData = null;
      podcast.fetchAllData = null;
      podcast.fetchAllAdminData = null;
      podcast.updateData = null;
      podcast.deleteData = null;
      podcast.lastFetch = null;
      podcast.searchData = null;
      podcast.rssFetchData = null;
      podcast.getOneData = null;
      podcast.suspendData = null;
      podcast.downloadData = null;
      podcast.downloadSlim = null;
    },
    reset_download: podcast => {
      podcast.downloading = false
      podcast.downloadSuccess = false
      podcast.downloadFailed = false
      podcast.downloadData = null
      podcast.downloadSlim = false
    },
    //get request
    fetchPodcastLoading: (podcast) => {
      podcast.loading = true;
    },
    //get success
    fetchPodcastSuccess: (podcast, action) => {
      podcast.loading = false;
      podcast.fetchData = action.payload;
      podcast.fetchFailed = false;
    },
    //get err
    fetchPodcastError: (podcast) => {
      podcast.loading = false;
      podcast.fetchFailed = true;
      podcast.fetchData = null;
    },
    fetchRssLoading: (podcast) => {
      podcast.rssLoading = true;
    },
    //get success
    fetchRssSuccess: (podcast, action) => {
      podcast.rssLoading = false;
      podcast.rssFetchSuccess = true;
      podcast.rssFetchData = action.payload;
      podcast.rssFetchFailed = false;
    },
    //get err
    fetchRssError: (podcast, action) => {
      podcast.rssLoading = false;
      podcast.rssFetchSuccess = false;
      podcast.rssFetchFailed = true;
      podcast.rssFetchData = action.payload;
    },
    //get all request
    fetchAllPodcastLoading: (podcast) => {
      podcast.loadingAll = true;
    },
    //get all success
    fetchAllPodcastSuccess: (podcast, action) => {
      podcast.loadingAll = false;
      podcast.fetchAllData = action.payload;
      podcast.fetchAllFailed = false;
    },
    //get all err
    fetchAllPodcastError: (podcast) => {
      podcast.loadingAll = false;
      podcast.fetchAllFailed = true;
      podcast.fetchAllData = null;
    },
    fetchAllPodcastAdminLoading: (podcast) => {
      podcast.loadingAllAdmin = true;
    },
    //get all success
    fetchAllPodcastAdminSuccess: (podcast, action) => {
      podcast.loadingAllAdmin = false;
      podcast.fetchAllAdminData = action.payload;
      podcast.fetchAllAdminFailed = false;
    },
    //get all err
    fetchAllPodcastAdminError: (podcast) => {
      podcast.loadingAllAdmin = false;
      podcast.fetchAllAdminFailed = true;
      podcast.fetchAllAdminData = null;
    },
    //get all request
    fetchPodBySearch: (podcast) => {
      podcast.isSearching = true;
    },
    //get all success
    fetchPodBySearchSuccess: (podcast, action) => {
      podcast.isSearching = false;
      podcast.searchData = action.payload;
      podcast.searchFailed = false;
    },
    //get all err
    fetchPodBySearchError: (podcast) => {
      podcast.isSearching = false;
      podcast.searchFailed = true;
      podcast.searchData = null;
    },
    downloadPodcastsLoading: podcast => {
      podcast.downloading = true
    },
    downloadPodcastsSuccess: (podcast, action) => {
      podcast.downloading = false
      podcast.downloadSuccess = true
      podcast.downloadData = action.payload
      podcast.downloadSlim = action.payload.podcasts
      podcast.downloadFailed = false
    },
    downloadPodcastsFailed: (podcast) => {
      podcast.downloading = false
      podcast.downloadData = null
      podcast.downloadSuccess = false;
      podcast.downloadSlim = null
      podcast.downloadFailed = true
    },
    //create request
    createPodcastLoading: (podcast) => {
      podcast.creating = true;
    },
    //create success
    createPodcastSuccess: (podcast, action) => {
      podcast.creating = false;
      podcast.created = true;
      podcast.createData = action.payload;
      podcast.fetchFailed = false;
    },
    //create err
    createPodcastError: (podcast, action) => {
      podcast.creating = false;
      podcast.createFailed = action.payload;
      podcast.createData = null;
    },
    //update request
    updatePodcastLoading: (podcast) => {
      podcast.updating = true;
    },
    //update success
    updatePodcastSuccess: (podcast, action) => {
      podcast.updating = false;
      podcast.updated = true;
      podcast.updateData = action.payload;
      podcast.updateFailed = false;
    },
    //err
    updatePodcastError: (podcast, action) => {
      podcast.updating = false;
      podcast.updateFailed = action.payload;
      podcast.updateData = null;
    },
    //update request
    getOnePodcastLoading: (podcast) => {
      podcast.getOneLoading = true;
    },
    //update success
    getOnePodcastSuccess: (podcast, action) => {
      podcast.getOneLoading = false;
      podcast.gotOne = true;
      podcast.getOneData = action.payload;
      podcast.getOneFailed = false;
    },
    //err
    getOnePodcastError: (podcast, action) => {
      podcast.getOneLoading = false;
      podcast.getOneFailed = action.payload;
      podcast.getOneData = null;
    },
    //delete request
    deletePodcastLoading: (podcast) => {
      podcast.deleting = true;
    },
    //delete success
    deletePodcastSuccess: (podcast, action) => {
      podcast.deleting = false;
      podcast.deleted = true;
      podcast.deleteData = action.payload;
      podcast.deleteFailed = false;
    },
    //delete error
    deletePodcastError: (podcast, action) => {
      podcast.deleting = false;
      podcast.deleteFailed = action.payload;
      podcast.deleteData = null;
    },
    //delete request
    suspendPodcastAdminLoading: (podcast) => {
      podcast.suspending = true;
    },
    //delete success
    suspendPodcastAdminSuccess: (podcast, action) => {
      podcast.suspending = false;
      podcast.suspended = true;
      podcast.suspendData = action.payload;
      podcast.suspendFailed = false;
    },
    //delete error
    suspendPodcastAdminError: (podcast, action) => {
      podcast.suspending = false;
      podcast.suspendFailed = true;
      podcast.suspendData = null;
    },
  },
});

const {
  fetchPodcastLoading,
  fetchPodcastSuccess,
  fetchPodcastError,
  downloadPodcastsLoading,
  downloadPodcastsSuccess,
  downloadPodcastsFailed,
  fetchRssLoading,
  fetchRssSuccess,
  fetchRssError,
  fetchPodBySearch,
  fetchPodBySearchSuccess,
  fetchPodBySearchError,
  fetchAllPodcastLoading,
  fetchAllPodcastSuccess,
  fetchAllPodcastError,
  createPodcastLoading,
  createPodcastSuccess,
  createPodcastError,
  updatePodcastLoading,
  updatePodcastSuccess,
  updatePodcastError,
  deletePodcastLoading,
  deletePodcastSuccess,
  deletePodcastError,
  fetchAllPodcastAdminError,
  fetchAllPodcastAdminLoading,
  fetchAllPodcastAdminSuccess,
  getOnePodcastLoading,
  getOnePodcastSuccess,
  getOnePodcastError,
  suspendPodcastAdminLoading,
  suspendPodcastAdminError,
  suspendPodcastAdminSuccess,
  reset,
  resetRss,
  resetSuspended,
  reset_download,
} = slice.actions;

//Action Creators

export const getPods = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts/user/${value?.userId}?limit=${value?.limit}&offset=${value?.offset}`,
      method: "get",
      type: "pod",
      onStart: fetchPodcastLoading.type,
      onSuccess: fetchPodcastSuccess.type,
      onError: fetchPodcastError.type,
    })
  );
};

export const fetchRss = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/rssfeeds/rssfeed/preview?url=${value.url}`,
      method: "get",
      type: "pod",
      onStart: fetchRssLoading.type,
      onSuccess: fetchRssSuccess.type,
      onError: fetchRssError.type,
    })
  );
};

export const getAllPods = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts`,
      method: "get",
      type: "pod",
      onStart: fetchAllPodcastLoading.type,
      onSuccess: fetchAllPodcastSuccess.type,
      onError: fetchAllPodcastError.type,
    })
  );
};

export const getAllPodcasts = (value, type = "normal") => (dispatch) => {
  let url = `/podcasts/admin?limit=${value?.limit}&offset=${value?.offset}&startDate=${value?.startDate}&endDate=${value?.endDate}`
  if (value?.search) {
    url += `&podcastSearch=${value?.search}`
  }
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "pod",
      onStart: type === "download" ? downloadPodcastsLoading.type : fetchAllPodcastAdminLoading.type,
      onSuccess: type === "download" ? downloadPodcastsSuccess.type : fetchAllPodcastAdminSuccess.type,
      onError: type === "download" ? downloadPodcastsFailed.type : fetchAllPodcastAdminError.type,
    })
  );
};

export const suspend = (value, status) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts/admin/suspend-unsuspend/podcast?podcastId=${value._id}&status=${status}`,
      method: "get",
      type: "pod",
      onStart: suspendPodcastAdminLoading.type,
      onSuccess: suspendPodcastAdminSuccess.type,
      onError: suspendPodcastAdminError.type,
    })
  );
};

export const getAllPodcastsByVisibility = (value, type = "normal") => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts/admin?limit=${value?.limit}&offset=${value?.offset}&startDate=${value?.startDate}&endDate=${value?.endDate}&visibility=${value?.visibility}`,
      method: "get",
      type: "pod",
      onStart: type === "download" ? downloadPodcastsLoading.type : fetchAllPodcastAdminLoading.type,
      onSuccess: type === "download" ? downloadPodcastsSuccess.type : fetchAllPodcastAdminSuccess.type,
      onError: type === "download" ? downloadPodcastsSuccess.type : fetchAllPodcastAdminError.type,
    })
  );
};

export const getAllPodsBySearchParam = (value, type = "normal") => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts?podcastSearch=${value.search}&limit=${value.limit}`,
      method: "get",
      type: "pod",
      onStart: type === "download" ? downloadPodcastsLoading.type : fetchPodBySearch.type,
      onSuccess: type === "download" ? downloadPodcastsSuccess.type : fetchPodBySearchSuccess.type,
      onError: type === "download" ? downloadPodcastsFailed.type : fetchPodBySearchError.type,
    })
  );
};

export const createPod = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/podcasts/podCast",
      method: "post",
      data: value,
      type: "pod",
      onStart: createPodcastLoading.type,
      onSuccess: createPodcastSuccess.type,
      onError: createPodcastError.type,
    })
  );
};

export const updatePod = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts/podCast/${value.show_id}`,
      method: "patch",
      data: value.data.formData,
      type: "pod",
      onUploadProgress: value.onUploadProgress,
      onStart: updatePodcastLoading.type,
      onSuccess: updatePodcastSuccess.type,
      onError: updatePodcastError.type,
    })
  );
};

export const getOnePod = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts/podCast/${value._id}`,
      method: "get",
      type: "pod",
      onStart: getOnePodcastLoading.type,
      onSuccess: getOnePodcastSuccess.type,
      onError: getOnePodcastError.type,
    })
  );
};

export const deletePod = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/podcasts/podCast/${value.podcastId}`,
      method: "delete",
      type: "pod",
      onUploadProgress: value.onUploadProgress,
      onStart: deletePodcastLoading.type,
      onSuccess: deletePodcastSuccess.type,
      onError: deletePodcastError.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetRssData = () => (dispatch) => dispatch({ type: resetRss.type });
export const resetSuspend = () => (dispatch) => dispatch({ type: resetSuspended.type });
export const resetDownload = () => (dispatch) => dispatch({ type: reset_download.type });

//Selectors
//Memoization
export const getPodCasts = createSelector(
  (state) => state.entities.pod,
  (pod) => pod
);

export const podList = createSelector(
  (state) => state,
  (pod) => pod
);

export default slice.reducer;
