import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "dashboardInfo",
  initialState: {
    loading: false,
    fetched: false,
    fetchFailed: false,
    fetchData: null,

    loadingStats: false,
    fetchFailedStats: false,
    fetchStatsData: null,
  },
  reducers: {
    reset: (dashboardInfo) => {
      dashboardInfo.loading = false;
      dashboardInfo.fetched = false;
      dashboardInfo.fetchFailed = false;
      dashboardInfo.fetchData = null;
      
      dashboardInfo.loadingStats = false;
      dashboardInfo.fetchStatsFailed = false;
      dashboardInfo.fetchStatsData = null;
    },
    //get request
    fetchDashboardInfoLoading: (dashboardInfo) => {
      dashboardInfo.loading = true;
    },
    //get success
    fetchDashboardInfoSuccess: (dashboardInfo, action) => {
      dashboardInfo.loading = false;
      dashboardInfo.fetchData = action.payload.data;
      dashboardInfo.fetchFailed = false;
    },
    //get err
    fetchDashboardInfoError: (dashboardInfo) => {
      dashboardInfo.loading = false;
      dashboardInfo.fetchFailed = true;
      dashboardInfo.fetchData = null;
    },
    
    //get Statistics
    fetchDashboardStatsLoading: (dashboardInfo) => {
      dashboardInfo.loadingStats = true;
    },
    //get success
    fetchDashboardStatsSuccess: (dashboardInfo, action) => {
      dashboardInfo.loadingStats = false;
      dashboardInfo.fetchStatsData = action.payload.data;
      dashboardInfo.fetchStatsFailed = false;
    },
    //get err
    fetchDashboardStatsError: (dashboardInfo) => {
      dashboardInfo.loadingStats = false;
      dashboardInfo.fetchStatsFailed = true;
      dashboardInfo.fetchStatsData = null;
    },
  },
});

const {
  fetchDashboardInfoLoading,
  fetchDashboardInfoSuccess,
  fetchDashboardInfoError,
  fetchDashboardStatsLoading,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsError,
  reset,
} = slice.actions;

//Action Creators

export const getDashboardInfo = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `?offset=${value?.offset}&limit=${value?.limit}`,
      method: "get",
      type: "audit",
      onStart: fetchDashboardInfoLoading.type,
      onSuccess: fetchDashboardInfoSuccess.type,
      onError: fetchDashboardInfoError.type,
    })
  );
};

export const getDashboardStats = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/dashboard`,
      method: "get",
      type: "",
      onStart: fetchDashboardStatsLoading.type,
      onSuccess: fetchDashboardStatsSuccess.type,
      onError: fetchDashboardStatsError.type,
    })
  );
};


export const resetData = () => (dispatch) => dispatch({ type: reset.type });

//Selectors
//Memoization
export const getDashboardSelector = createSelector(
  (state) => state.entities.dashboard,
  (dashboard) => dashboard
);

export default slice.reducer;
