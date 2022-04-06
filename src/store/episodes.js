import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "episode",
  initialState: {
    //loading states
    fetching: false,
    fetchingAll: false,
    fetchingPodEpisodes: false,
    uploadingRSS: false,
    uploading: false,
    creating: false,
    updating: false,
    deleting: false,
    suspending: false,
    fetchingFlagged: false,
    downloading: false,
    //success states
    fetched: false,
    fetchedAll: false,
    fetchedPodEpisodes: false,
    uploadedRSS: false,
    uploaded: false,
    created: false,
    updated: false,
    deleted: false,
    suspended: false,
    fetchedFlagged: false,
    downloadSuccess: false,
    //failure states
    createFailed: false,
    fetchFailed: false,
    fetchAllFailed: false,
    updateFailed: false,
    deleteFailed: false,
    fetchEpisodesFailed: false,
    rssUploadFailed: false,
    uploadFailed: false,
    suspendFailed: false,
    fetchingFlaggedFailed: false,
    downloadFailed: false,
    //data
    createData: null,
    fetchData: null,
    fetchAllData: null,
    updateData: null,
    uploadData: null,
    deleteData: null,
    podEpisodeData: null,
    rssUploadData: null,
    suspendData: null,
    fetchFlaggedData: null,
    downloadSlim: null,
    downloadData: null,
    //others
    lastFetch: null,
  },
  reducers: {
    reset: (episode) => {
      //loading
      episode.fetching = false;
      episode.fetchingFlagged = false;
      episode.fetchingAll = false;
      episode.fetchingPodEpisodes = false;
      episode.uploadingRSS = false;
      episode.uploading = false;
      episode.creating = false;
      episode.updating = false;
      episode.deleting = false;
      episode.suspending = false;
      episode.downloading = false;
      //success
      episode.fetched = false;
      episode.fetchedFlagged = false;
      episode.fetchedAll = false;
      episode.fetchedPodEpisodes = false;
      episode.uploadedRSS = false;
      episode.uploaded = false;
      episode.created = false;
      episode.updated = false;
      episode.deleted = false;
      episode.suspended = false;
      episode.downloadSuccess = false;
      //failure
      episode.createFailed = false;
      episode.fetchFailed = false;
      episode.fetchFlaggedFailed = false;
      episode.fetchAllFailed = false;
      episode.uploadFailed = false;
      episode.updateFailed = false;
      episode.deleteFailed = false;
      episode.fetchEpisodesFailed = false;
      episode.rssUploadFailed = false;
      episode.suspendFailed = false;
      episode.downloadFailed = false;
      //data
      episode.createData = null;
      episode.fetchData = null;
      episode.fetchFlaggedData = null;
      episode.fetchAllData = null;
      episode.updateData = null;
      episode.deleteData = null;
      episode.podEpisodeData = null;
      episode.rssUploadData = null;
      episode.uploadData = null;
      episode.suspendData = null;
      episode.downloadData = null;
      episode.downloadSlim = null;
    },
    resetSuspended: (episode) => {
      episode.suspending = false;
      episode.suspended = false;
      episode.suspendFailed = false;
      episode.suspendData = null;
    },
    reset_download: episode => {
      episode.downloading = false
      episode.downloadSuccess = false
      episode.downloadFailed = false
      episode.downloadData = null
      episode.downloadSlim = false
    },
    fetchLoading: (episode) => {
      episode.fetching = true;
      episode.fetchFailed = false;
    },
    fetchingSuccess: (episode, action) => {
      episode.fetching = false;
      episode.fetched = true;
      episode.fetchData = action.payload;
      episode.fetchFailed = false;
    },
    fetchingFailed: (episode) => {
      episode.fetching = false;
      episode.fetched = false;
      episode.fetchData = null;
      episode.fetchFailed = true;
    },
    fetchFlaggedLoading: (episode) => {
      episode.fetchingFlagged = true;
      episode.fetchFlaggedFailed = false;
    },
    fetchingFlaggedSuccess: (episode, action) => {
      episode.fetchingFlagged = false;
      episode.fetchedFlagged = true;
      episode.fetchFlaggedData = action.payload;
      episode.fetchFlaggedFailed = false;
    },
    fetchingFlaggedFailed: (episode) => {
      episode.fetchingFlagged = false;
      episode.fetchedFlagged = false;
      episode.fetchFlaggedData = null;
      episode.fetchFlaggedFailed = true;
    },
    fetchAllLoading: (episode) => {
      episode.fetchingAll = true;
      episode.fetchFailed = false;
    },
    fetchAllSuccess: (episode, action) => {
      episode.fetchingAll = false;
      episode.fetchedAll = true;
      episode.fetchAllData = action.payload;
      episode.fetchAllFailed = false;
    },
    fetchAllFailed: (episode) => {
      episode.fetchingAll = false;
      episode.fetchedAll = false;
      episode.fetchAllData = null;
      episode.fetchAllFailed = false;
    },
    fetchingPodEpisodes: (episode) => {
      episode.fetchingPodEpisodes = true;
      episode.fetchEpisodesFailed = false;
    },
    fetchingPodEpisodeSuccess: (episode, action) => {
      episode.fetchingPodEpisodes = false;
      episode.fetchedPodEpisodes = true;
      episode.podEpisodeData = action.payload;
      episode.fetchEpisodesFailed = false;
    },
    fetchingPodEpisodeFailed: (episode) => {
      episode.fetchingPodEpisodes = false;
      episode.fetchedPodEpisodes = false;
      episode.fetchEpisodesFailed = true;
      episode.podEpisodeData = null;
    },
    // donwload
    downloadEpisodesLoading: episode => {
      episode.downloading = true
    },
    downloadEpisodesSuccess: (episode, action) => {
      episode.downloading = false
      episode.downloadSuccess = true
      episode.downloadData = action.payload
      episode.downloadSlim = action.payload.episodes
      episode.downloadFailed = false
    },
    downloadEpisodesFailed: (episode) => {
      episode.downloading = false
      episode.downloadData = null
      episode.downloadSuccess = false;
      episode.downloadSlim = null
      episode.downloadFailed = true
    },
    uploadingRSSFeed: (episode) => {
      episode.uploadingRSS = true;
      episode.rssUploadFailed = false;
    },
    uploadRSSSuccess: (episode, action) => {
      episode.uploadingRSS = false;
      episode.uploadedRSS = true;
      episode.rssUploadData = action.payload;
      episode.rssUploadFailed = false;
    },
    uploadRSSFailed: (episode) => {
      episode.uploadingRSS = false;
      episode.uploadedRSS = false;
      episode.rssUploadFailed = true;
      episode.rssUploadData = null;
    },
    uploading: (episode) => {
      episode.uploadingRSS = true;
      episode.rssUploadFailed = false;
    },
    uploadSuccess: (episode, action) => {
      episode.uploading = false;
      episode.uploaded = true;
      episode.uploadData = action.payload;
      episode.uploadFailed = false;
    },
    uploadFailed: (episode) => {
      episode.uploading = false;
      episode.uploaded = false;
      episode.uploadFailed = true;
      episode.uploadData = null;
    },
    creatingEpisode: (episode) => {
      episode.creating = true;
      episode.createFailed = false;
    },
    creatingEpisodeSuccess: (episode, action) => {
      episode.creating = false;
      episode.created = true;
      episode.createData = action.payload;
      episode.createFailed = false;
    },
    creatingEpisodeFailed: (episode) => {
      episode.creating = false;
      episode.created = false;
      episode.createData = null;
      episode.createFailed = true;
    },
    updatingEpisode: (episode) => {
      episode.updating = true;
      episode.updateFailed = false;
    },
    updatingEpisodeSuccess: (episode, action) => {
      episode.updating = false;
      episode.updateData = action.payload;
      episode.updated = true;
      episode.updateFailed = false;
    },
    updatingEpisodeFailed: (episode, action) => {
      episode.updating = false;
      episode.updated = false;
      episode.updateData = null;
      episode.updateFailed = action.payload;
    },
    uploadingEpisode: (episode) => {
      episode.uploading = true;
      episode.uploaded = false;
    },
    uploadingEpisodeSuccess: (episode, action) => {
      episode.uploading = false;
      episode.uploadData = action.payload;
      episode.uploaded = true;
      episode.uploadFailed = false;
    },
    uploadingEpisodeFailed: (episode, action) => {
      episode.uploading = false;
      episode.uploaded = false;
      episode.uploadData = null;
      episode.uploadFailed = action.payload;
    },
    deletingEpisode: (episode) => {
      episode.deleting = true;
      episode.deleteFailed = false;
    },
    deletingEpisodeSuccess: (episode, action) => {
      episode.deleting = false;
      episode.deleted = true;
      episode.deleteData = action.payload;
      episode.deleteFailed = false;
    },
    deletingEpisodeFailed: (episode, action) => {
      episode.deleting = false;
      episode.deleted = false;
      episode.deleteData = null;
      episode.deleteFailed = action.payload;
    },
    suspendEpisodeAdminLoading: (episode) => {
      episode.suspending = true;
    },
    //delete success
    suspendEpisodeAdminSuccess: (episode, action) => {
      episode.suspending = false;
      episode.suspended = true;
      episode.suspendData = action.payload;
      episode.suspendFailed = false;
    },
    //delete error
    suspendEpisodeAdminError: (episode) => {
      episode.suspending = false;
      episode.suspendFailed = true;
      episode.suspendData = null;
    },
  },
});

const {
  fetchLoading,
  fetchingSuccess,
  fetchingFailed,
  fetchFlaggedLoading,
  fetchingFlaggedSuccess,
  fetchingFlaggedFailed,
  fetchAllLoading,
  fetchAllSuccess,
  fetchAllFailed,
  downloadEpisodesLoading,
  downloadEpisodesSuccess,
  downloadEpisodesFailed,
  fetchingPodEpisodes,
  fetchingPodEpisodeSuccess,
  fetchingPodEpisodeFailed,
  uploadingRSSFeed,
  uploadRSSSuccess,
  uploadRSSFailed,
  uploadingEpisode,
  uploadingEpisodeSuccess,
  uploadingEpisodeFailed,
  creatingEpisode,
  creatingEpisodeSuccess,
  creatingEpisodeFailed,
  updatingEpisode,
  updatingEpisodeSuccess,
  updatingEpisodeFailed,
  deletingEpisode,
  deletingEpisodeSuccess,
  deletingEpisodeFailed,
  suspendEpisodeAdminLoading,
  suspendEpisodeAdminError,
  suspendEpisodeAdminSuccess,
  resetSuspended,
  reset_download,
  reset,
} = slice.actions;

//Action Creators
export const createEpisode = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/episodes/episode",
      method: "post",
      data: value,
      type: "pod",
      onStart: creatingEpisode.type,
      onSuccess: creatingEpisodeSuccess.type,
      onError: creatingEpisodeFailed.type,
    })
  );
};

export const updateEpisode = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/episode/${value.episode_id}`,
      method: "put",
      data: value.data.formData,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: updatingEpisode.type,
      onSuccess: updatingEpisodeSuccess.type,
      onError: updatingEpisodeFailed.type,
    })
  );
};

export const getEpisode = (value, type) => (dispatch) => {
  let url = `/episodes/admin?limit=${value?.limit}&offset=${value?.offset}&startDate=${value?.startDate}&endDate=${value?.endDate}`
  if (value?.search) {
    url += `&episodeSearch=${value?.search}`
  }

  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "pod",
      onStart: type === "download" ? downloadEpisodesLoading.type : fetchLoading.type,
      onSuccess: type === "download" ? downloadEpisodesSuccess.type : fetchingSuccess.type,
      onError: type === "download" ? downloadEpisodesFailed.type : fetchingFailed.type,
    })
  );
};

export const getEpisodeByVisibility = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/admin?limit=${value?.limit}&offset=${value?.offset}&startDate=${value?.startDate}&endDate=${value?.endDate}&visibility=${value?.visibility}`,
      method: "get",
      type: "pod",
      onStart: fetchFlaggedLoading.type,
      onSuccess: fetchingFlaggedSuccess.type,
      onError: fetchingFlaggedFailed.type,
    })
  );
};

export const getAllEpisode = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/user?limit=${value?.limit}&offset=${value?.offset}`,
      method: "get",
      type: "pod",
      onStart: fetchAllLoading.type,
      onSuccess: fetchAllSuccess.type,
      onError: fetchAllFailed.type,
    })
  );
};

export const getPodEpisode = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/podcast/${value?.show_id}?limit=${value?.limit}&offset=${value?.offset}`,
      method: "get",
      type: "pod",
      onStart: fetchingPodEpisodes.type,
      onSuccess: fetchingPodEpisodeSuccess.type,
      onError: fetchingPodEpisodeFailed.type,
    })
  );
};

export const uploadEpisode = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/shows/${value.show_id}/episode`,
      method: "post",
      type: "pod",
      data: value.data.formData,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      onStart: uploadingEpisode.type,
      onSuccess: uploadingEpisodeSuccess.type,
      onError: uploadingEpisodeFailed.type,
    })
  );
};

export const deleteEpisode = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/episode/${value.episodeId}`,
      method: "delete",
      type: "pod",
      onStart: deletingEpisode.type,
      onSuccess: deletingEpisodeSuccess.type,
      onError: deletingEpisodeFailed.type,
    })
  );
};

export const suspend = (value, status) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/admin/suspend-unsuspend/episode?episodeId=${value._id}&status=${status}`,
      method: "get",
      type: "pod",
      onStart: suspendEpisodeAdminLoading.type,
      onSuccess: suspendEpisodeAdminSuccess.type,
      onError: suspendEpisodeAdminError.type,
    })
  );
};

export const uploadRSS = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/rssfeeds/rssfeed`,
      method: "post",
      type: "pod",
      data: value,
      onStart: uploadingRSSFeed.type,
      onSuccess: uploadRSSSuccess.type,
      onError: uploadRSSFailed.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetSuspend = () => (dispatch) => dispatch({ type: resetSuspended.type });
export const resetDownload = () => (dispatch) => dispatch({ type: reset_download.type });


//Selectors
//Memoization
export const getEpisodes = createSelector(
  (state) => state.entities.episode,
  (episode) => episode
);

export default slice.reducer;
