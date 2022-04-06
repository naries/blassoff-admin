import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "banner",
  initialState: {
    //loading states
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    rdeleting: false,
    updatingBanner: false,
    //success states
    created: false,
    fetched: false,
    updated: false,
    deleted: false,
    rdeleted: false,
    //failure states
    createFailed: false,
    fetchFailed: false,
    updateFailed: false,
    deleteFailed: false,
    rdeleteFailed: false,
    updateBannerFailed: null,
    //data
    createData: null,
    fetchData: null,
    updateData: null,
    deleteData: null,
    rdeleteData: null,
    updateBannerData: null,
    lastFetch: null,
  },
  reducers: {
    reset: (banner) => {
      //loading states
      banner.loading = false;
      banner.creating = false;
      banner.updating = false;
      banner.deleting = false;
      banner.rdeleting = false;
      banner.updatingBanner= false;

      //success states
      banner.created = false;
      banner.fetched = false;
      banner.updated = false;
      banner.deleted = false;
      banner.rdeleted=false;
      //failure states
      banner.createFailed = false;
      banner.fetchFailed = false;
      banner.updateFailed = false;
      banner.deleteFailed = false;
      banner.rdeleteFailed = false;
      banner.updateBannerFailed = null;
      //data
      banner.createData = null;
      banner.fetchData = null;
      banner.updateData = null;
      banner.deleteData = null;
      banner.lastFetch = null;
      banner.updateBannerData = null;
      banner.rdeleteData = null;
    },
    //get request
    fetchBannerLoading: (banner) => {
      banner.loading = true;
    },
    //get success
    fetchBannerSuccess: (banner, action) => {
      banner.loading = false;
      banner.fetchData = action.payload;
      banner.fetchFailed = false;
    },
    //get err
    fetchBannerError: (banner) => {
      banner.loading = false;
      banner.fetchFailed = true;
      banner.fetchData = null;
    },
    //create request
    createBannerLoading: (banner) => {
      banner.creating = true;
    },
    //create success
    createBannerSuccess: (banner, action) => {
      banner.creating = false;
      banner.createData = action.payload;
      banner.fetchFailed = false;
    },
    //create err
    createBannerError: (banner, action) => {
      banner.creating = false;
      banner.createFailed = action.payload;
      banner.createData = null;
    },
    //update request
    updateBannerLoading: (banner) => {
      banner.updating = true;
    },
    //update success
    updateBannerSuccess: (banner, action) => {
      banner.updating = false;
      banner.updateData = action.payload;
      banner.updateFailed = false;
    },
    //update error
    updateBannerError: (banner) => {
      banner.updating = false;
      banner.updateFailed = true;
      banner.updateData = null;
    },
    //update banner request
    updateBannerBannersLoading: (banner) => {
      banner.updatingBanner = true;
    },
    //update banner success
    updateBannerBannersSuccess: (banner, action) => {
      banner.updatingBanner = false;
      banner.updateBannerData = action.payload;
      banner.updateBannerFailed = false;
    },
    //update Banner error
    updateBannerBannersError: (banner, action) => {
      banner.updatingBanner = false;
      banner.updateBannerFailed = action.payload;
      banner.updateBannerData = null;
    },
    //delete request
    toggleBannerLoading: (banner) => {
      banner.deleting = true;
    },
    //delete success
    toggleBannerSuccess: (banner, action) => {
      banner.deleting = false;
      banner.deleteData = action.payload;
      banner.deleteFailed = false;
    },
    //delete err
    toggleBannerError: (banner) => {
      banner.deleting = false;
      banner.deleteFailed = true;
      banner.deleteData = null;
    },
    //delete request
    deleteBannerLoading: (banner) => {
      banner.rdeleting = true;
    },
    //delete success
    deleteBannerSuccess: (banner, action) => {
      banner.rdeleting = false;
      banner.rdeleteData = action.payload;
      banner.rdeleteFailed = false;
    },
    //delete err
    deleteBannerError: (banner) => {
      banner.rdeleting = false;
      banner.rdeleteFailed = true;
      banner.rdeleteData = null;
    },
  },
});

const {
  fetchBannerLoading,
  fetchBannerSuccess,
  fetchBannerError,
  createBannerLoading,
  createBannerSuccess,
  createBannerError,
  updateBannerLoading,
  updateBannerSuccess,
  updateBannerError,
  toggleBannerLoading,
  toggleBannerSuccess,
  toggleBannerError,
  deleteBannerLoading,
  deleteBannerSuccess,
  deleteBannerError,
  reset,
} = slice.actions;

//Action Creators
export const createBanner = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/banners/banner",
      method: "post",
      data: value.data,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: createBannerLoading.type,
      onSuccess: createBannerSuccess.type,
      onError: createBannerError.type,
    })
  );
};

export const updateBanner = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `banners/banner/${value?.id}`,
      method: "put",
      data: value.data,
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: value.onUploadProgress,
      type: "pod",
      onStart: updateBannerLoading.type,
      onSuccess: updateBannerSuccess.type,
      onError: updateBannerError.type,
    })
  );
};

export const getBanner = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `banners?limit=100&offset=0`,
      method: "get",
      type: "pod",
      onStart: fetchBannerLoading.type,
      onSuccess: fetchBannerSuccess.type,
      onError: fetchBannerError.type,
    })
  );
};
export const deleteBanner = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `banners/banner/${value._id}`,
      method: "delete",
      type: "pod",
      onStart: deleteBannerLoading.type,
      onSuccess: deleteBannerSuccess.type,
      onError: deleteBannerError.type,
    })
  );
};

export const toggleActivation = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `banners/banner/${value.id}/${value.status}`,
      method: "get",
      type: "pod",
      onStart: toggleBannerLoading.type,
      onSuccess: toggleBannerSuccess.type,
      onError: toggleBannerError.type,
    })
  );
};

export const resetData = () => (dispatch) => dispatch({ type: reset.type });

//Selectors
//Memoization
export const getBanners = createSelector(
  (state) => state.entities.banners,
  (banner) => banner
);

export default slice.reducer;
