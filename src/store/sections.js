import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "section",
  initialState: {
    //loading states
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    updatingPod: false,
    loadingSectionPods: false,
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
    updatePodFailed: null,
    sectionPodFailed: null,
    //data
    createData: null,
    fetchData: null,
    updateData: null,
    deleteData: null,
    updatePodData: null,
    sectionPodData: null,
    lastFetch: null,
  },
  reducers: {
    reset: (section) => {
      //loading states
      section.loading = false;
      section.creating = false;
      section.updating = false;
      section.deleting = false;
      section.updatingPod = false;

      //success states
      section.created = false;
      section.fetched = false;
      section.updated = false;
      section.deleted = false;
      //failure states
      section.createFailed = false;
      section.fetchFailed = false;
      section.updateFailed = false;
      section.deleteFailed = false;
      section.updatePodFailed = null;
      //data
      section.createData = null;
      section.fetchData = null;
      section.updateData = null;
      section.deleteData = null;
      section.lastFetch = null;
      section.updatePodData = null;
    },
    //get request
    fetchSectionLoading: (section) => {
      section.loading = true;
    },
    //get success
    fetchSectionSuccess: (section, action) => {
      section.loading = false;
      section.fetchData = action.payload;
      section.fetchFailed = false;
    },
    //get err
    fetchSectionError: (section) => {
      section.loading = false;
      section.fetchFailed = true;
      section.fetchData = null;
    },
    //get request
    fetchSectionPodsLoading: (section) => {
      section.loadingSectionPods = true;
    },
    //get success
    fetchSectionPodsSuccess: (section, action) => {
      section.loadingSectionPods = false;
      section.sectionPodData = action.payload;
      section.sectionPodFailed = false;
    },
    //get err
    fetchSectionPodsFailed: (section) => {
      section.loadingSectionPods = false;
      section.sectionPodData = null;
      section.sectionPodFailed = true;
    },
    //create request
    createSectionLoading: (section) => {
      section.creating = true;
    },
    //create success
    createSectionSuccess: (section, action) => {
      section.creating = false;
      section.createData = action.payload;
      section.fetchFailed = false;
    },
    //create err
    createSectionError: (section, action) => {
      section.creating = false;
      section.createFailed = action.payload;
      section.createData = null;
    },
    //update request
    updateSectionLoading: (section) => {
      section.updating = true;
    },
    //update success
    updatesectionSuccess: (section, action) => {
      section.updating = false;
      section.updateData = action.payload;
      section.updateFailed = false;
    },
    //update error
    updatesectionError: (section) => {
      section.updating = false;
      section.updateFailed = true;
      section.updateData = null;
    },
    //update pod request
    updateSectionPodsLoading: (section) => {
      section.updatingPod = true;
    },
    //update pod success
    updatesectionPodsSuccess: (section, action) => {
      section.updatingPod = false;
      section.updatePodData = action.payload;
      section.updatePodFailed = false;
    },
    //update pod error
    updatesectionPodsError: (section, action) => {
      section.updatingPod = false;
      section.updatePodFailed = action.payload;
      section.updatePodData = null;
    },
    //delete request
    deleteSectionLoading: (section) => {
      section.deleting = true;
    },
    //delete success
    deletesectionSuccess: (section, action) => {
      section.deleting = false;
      section.deleteData = action.payload;
      section.deleteFailed = false;
    },
    //delete err
    deleteSectionError: (section) => {
      section.deleting = false;
      section.deleteFailed = true;
      section.deleteData = null;
    },
  },
});

const {
  fetchSectionLoading,
  fetchSectionSuccess,
  fetchSectionError,
  createSectionLoading,
  createSectionSuccess,
  createSectionError,
  updateSectionLoading,
  updatesectionSuccess,
  updatesectionError,
  updateSectionPodsLoading,
  updatesectionPodsSuccess,
  updatesectionPodsError,
  deleteSectionLoading,
  deletesectionSuccess,
  deleteSectionError,
  fetchSectionPodsLoading,
  fetchSectionPodsSuccess,
  fetchSectionPodsFailed,
  reset,
} = slice.actions;

//Action Creators
export const createSection = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/sections/section",
      method: "post",
      data: value.data,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: createSectionLoading.type,
      onSuccess: createSectionSuccess.type,
      onError: createSectionError.type,
    })
  );
};

export const updateSection = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `sections/section/${value?.id}`,
      method: "patch",
      data: value.data,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: updateSectionLoading.type,
      onSuccess: updatesectionSuccess.type,
      onError: updatesectionError.type,
    })
  );
};

export const updateSectionPodcasts = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `sections/podcasts`,
      method: "patch",
      data: value,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: updateSectionPodsLoading.type,
      onSuccess: updatesectionPodsSuccess.type,
      onError: updatesectionPodsError.type,
    })
  );
};

export const getSection = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `sections?limit=${value?.limit}&offset=${value?.offset}`,
      method: "get",
      type: "pod",
      onStart: fetchSectionLoading.type,
      onSuccess: fetchSectionSuccess.type,
      onError: fetchSectionError.type,
    })
  );
};

export const getSectionPodcasts = (id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `sections/podcasts/${id}`,
      method: "get",
      type: "pod",
      onStart: fetchSectionPodsLoading.type,
      onSuccess: fetchSectionPodsSuccess.type,
      onError: fetchSectionPodsFailed.type,
    })
  );
};

export const deleteSection = (id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `sections/section/${id}`,
      method: "delete",
      type: "pod",
      onStart: deleteSectionLoading.type,
      onSuccess: deletesectionSuccess.type,
      onError: deleteSectionError.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });

//Selectors
//Memoization
export const getSections = createSelector(
  (state) => state.entities.sections,
  (section) => section
);

export default slice.reducer;
