import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    fetched: false,
    fetchFailed: false,
    fetchData: null,

    downloading: false,
    downloadSuccess: false,
    downloadFailed: false,
    downloadData: null,
    downloadSlim: false,
  },
  reducers: {
    reset_download: comment => {
      comment.downloading = false
      comment.downloadSuccess = false
      comment.downloadFailed = false
      comment.downloadData = null
      comment.downloadSlim = false
    },
    reset: (comment) => {
      comment.downloadFailed = false
      comment.downloadSlim = false
      comment.loading = false;
      comment.fetched = false;
      comment.fetchFailed = false;
      comment.fetchData = null;
      comment.downloadData = null

      comment.deleting = false;
      comment.deleted = false;
      comment.deleteFailed = false;
      comment.downloading = false
      comment.downloadSuccess = false

      comment.deactivating = false;
      comment.deactivated = false;
      comment.deactivationFailed = false;
    },
    reset_basics: comment => {
      comment.deleting = false;
      comment.deleted = false;
      comment.deleteFailed = false;

      comment.deactivating = false;
      comment.deactivated = false;
      comment.deactivationFailed = false;
    },
    reset_delete: (comment) => {
      comment.deleting = false;
      comment.deleted = false;
      comment.deleteFailed = false;
    },
    deactivate: (comment) => {
      comment.deactivating = false;
      comment.deactivated = false;
      comment.deactivationFailed = false;
    },
    //get request
    fetchCommentLoading: (comment) => {
      comment.loading = true;
    },
    //get success
    fetchCommentSuccess: (comment, action) => {
      comment.loading = false;
      comment.fetchData = action.payload;
      comment.fetchFailed = false;
    },
    //get err
    fetchCommentError: (comment) => {
      comment.loading = false;
      comment.fetchFailed = true;
      comment.fetchData = null;
    },
    // download comments
    downloadCommentLoading: comment => {
      comment.downloading = true
    },
    downloadCommentSuccess: (comment, action) => {
      comment.downloading = false
      comment.downloadSuccess = true
      comment.downloadData = action.payload
      comment.downloadSlim = action.payload.value
      comment.downloadFailed = false
    },
    downloadCommentFailed: (comment) => {
      comment.downloading = false
      comment.downloadData = null
      comment.downloadSuccess = false;
      comment.downloadSlim = null
      comment.downloadFailed = true
    },
    deleteCommentLoading: (comment) => {
      comment.deleting = true;
    },
    //get success
    deleteCommentSuccess: (comment, action) => {
      comment.deleting = false;
      comment.deleted = true;
      comment.deleteFailed = false;
    },
    //get err
    deleteCommentError: (comment) => {
      comment.deleting = false;
      comment.fetchFailed = true;
      comment.deleted = false;
    },
    deactivateUserLoading: (comment) => {
      comment.deactivating = true;
    },
    //get success
    deactivateUserSuccess: (comment, action) => {
      comment.deactivating = false;
      comment.deactivated = true;
      comment.deactivationFailed = false;
    },
    //get err
    deactivateUserError: (comment) => {
      comment.deactivating = false;
      comment.deactivationFailed = true;
      comment.deactivated = false;
    },
  },
});

const {
  fetchCommentLoading,
  fetchCommentSuccess,
  fetchCommentError,
  downloadCommentLoading,
  downloadCommentSuccess,
  downloadCommentFailed,
  deleteCommentLoading,
  deleteCommentSuccess,
  deleteCommentError,
  deactivateUserLoading,
  deactivateUserSuccess,
  deactivateUserError,
  reset_delete,
  reset_basics,
  reset_download,
  reset,
} = slice.actions;

//Action Creators

export const getComments = (value, type = "normal") => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/admin/comments?limit=${value?.limit}&offset=${value?.offset}&startDate=${value?.startDate}&endDate=${value?.endDate}`,
      method: "get",
      type: "pod",
      onStart: type === "download" ? downloadCommentLoading.type : fetchCommentLoading.type,
      onSuccess: type === "download" ? downloadCommentSuccess.type : fetchCommentSuccess.type,
      onError: type === "download" ? downloadCommentFailed.type : fetchCommentError.type,
    })
  );
};

export const deleteComment = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/admin/comment/delete?commentId=${value._id}&metaDataId=${value?.metaDataId}`,
      method: "delete",
      type: "pod",
      onStart: deleteCommentLoading.type,
      onSuccess: deleteCommentSuccess.type,
      onError: deleteCommentError.type,
    })
  );
};

export const deactivateUserCommenting = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/episodes/admin/deactivate-user-from-commenting?userId=${value?.userId?._id}`,
      method: "get",
      type: "pod",
      onStart: deactivateUserLoading.type,
      onSuccess: deactivateUserSuccess.type,
      onError: deactivateUserError.type,
    })
  );
};


export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetDelete = () => (dispatch) => dispatch({ type: reset_delete.type });
export const resetBasics = () => (dispatch) => dispatch({ type: reset_basics.type });
export const resetDownload = () => (dispatch) => dispatch({ type: reset_download.type });


//Selectors
//Memoization
export const getCommentSelector = createSelector(
  (state) => state.entities.comment,
  (comment) => comment
);

export default slice.reducer;
