import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "bgMusic",
  initialState: {
    //loading states
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    //success states
    created: false,
    fetched: false,
    updated: false,
    deleted: false,
    //failure states
    createFailed: false,
    fetchFailed: false,
    updateFailed: false,
    deleteFailed: false,
    //data
    createData: null,
    fetchData: null,
    updateData: null,
    deleteData: null,
    lastFetch: null,
  },
  reducers: {
    reset: (bgMusic) => {
      //loading states
      bgMusic.loading = false;
      bgMusic.creating = false;
      bgMusic.updating = false;
      bgMusic.deleting = false;
      //success states
      bgMusic.created = false;
      bgMusic.fetched = false;
      bgMusic.updated = false;
      bgMusic.deleted = false;
      //failure states
      bgMusic.createFailed = false;
      bgMusic.fetchFailed = false;
      bgMusic.updateFailed = false;
      bgMusic.deleteFailed = false;
      //data
      bgMusic.createData = null;
      bgMusic.fetchData = null;
      bgMusic.updateData = null;
      bgMusic.deleteData = null;
      bgMusic.lastFetch = null;
    },
    //get request
    fetchMusicLoading: (bgMusic) => {
      bgMusic.loading = true;
    },
    //get success
    fetchMusicSuccess: (bgMusic, action) => {
      bgMusic.loading = false;
      bgMusic.fetchData = action.payload;
      bgMusic.fetchFailed = false;
    },
    //get err
    fetchMusicError: (bgMusic) => {
      bgMusic.loading = false;
      bgMusic.fetchFailed = true;
      bgMusic.fetchData = null;
    },
    //create request
    createMusicLoading: (bgMusic) => {
      bgMusic.creating = true;
    },
    //create success
    createMusicSuccess: (bgMusic, action) => {
      bgMusic.creating = false;
      bgMusic.createData = action.payload;
      bgMusic.fetchFailed = false;
    },
    //create err
    createMusicError: (bgMusic) => {
      bgMusic.creating = false;
      bgMusic.createFailed = true;
      bgMusic.createData = null;
    },
    //update request
    updateMusicLoading: (bgMusic) => {
      bgMusic.updating = true;
    },
    //update success
    updateMusicSuccess: (bgMusic, action) => {
      bgMusic.updating = false;
      bgMusic.updateData = action.payload;
      bgMusic.updateFailed = false;
    },
    //err
    updateMusicError: (bgMusic) => {
      bgMusic.updating = false;
      bgMusic.updateFailed = true;
      bgMusic.updateData = null;
    },
    //delete request
    deleteMusicLoading: (bgMusic) => {
      bgMusic.deleting = true;
    },
    //delete success
    deleteMusicSuccess: (bgMusic, action) => {
      bgMusic.deleting = false;
      bgMusic.deleteData = action.payload;
      bgMusic.deleteFailed = false;
    },
    //delete err
    deleteMusicError: (bgMusic) => {
      bgMusic.deleting = false;
      bgMusic.deleteFailed = true;
      bgMusic.deleteData = null;
    },
  },
});

const {
  fetchMusicLoading,
  fetchMusicSuccess,
  fetchMusicError,
  createMusicLoading,
  createMusicSuccess,
  createMusicError,
  updateMusicLoading,
  updateMusicSuccess,
  updateMusicError,
  deleteMusicLoading,
  deleteMusicSuccess,
  deleteMusicError,
  reset,
} = slice.actions;

//Action Creators
export const createbgMusic = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/background-music/backgroundMusic",
      method: "post",
      data: value.data.formData,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: createMusicLoading.type,
      onSuccess: createMusicSuccess.type,
      onError: createMusicError.type,
    })
  );
};

export const updatebgMusic = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/background-music/backgroundMusic/${value.bgMusic_id}`,
      method: "patch",
      data: value.data.formData,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: updateMusicLoading.type,
      onSuccess: updateMusicSuccess.type,
      onError: updateMusicError.type,
    })
  );
};

export const getBgMusic = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/background-music?limit=${value?.limit}&offset=${value?.offset}`,
      method: "get",
      type: "pod",
      onStart: fetchMusicLoading.type,
      onSuccess: fetchMusicSuccess.type,
      onError: fetchMusicError.type,
    })
  );
};

export const deletebgMusic = (id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/background-music/backgroundMusic/${id}`,
      method: "delete",
      type: "pod",
      onStart: deleteMusicLoading.type,
      onSuccess: deleteMusicSuccess.type,
      onError: deleteMusicError.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });

//Selectors
//Memoization
export const getbgMusics = createSelector(
  (state) => state.entities.bgMusic,
  (bgMusic) => bgMusic
);

export default slice.reducer;
