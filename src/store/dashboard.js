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
  },
  reducers: {
    reset: (dashboardInfo) => {
      dashboardInfo.loading = false;
      dashboardInfo.fetched = false;
      dashboardInfo.fetchFailed = false;
      dashboardInfo.fetchData = null;
    },
    //get request
    fetchDashboardInfoLoading: (dashboardInfo) => {
      dashboardInfo.loading = true;
    },
    //get success
    fetchDashboardInfoSuccess: (dashboardInfo, action) => {
      dashboardInfo.loading = false;
      dashboardInfo.fetchData = action.payload;
      dashboardInfo.fetchFailed = false;
    },
    //get err
    fetchDashboardInfoError: (dashboardInfo) => {
      dashboardInfo.loading = false;
      dashboardInfo.fetchFailed = true;
      dashboardInfo.fetchData = null;
    },
  },
});

const {
  fetchDashboardInfoLoading,
  fetchDashboardInfoSuccess,
  fetchDashboardInfoError,
  reset,
} = slice.actions;

//Action Creators

export const getDashboardInfo = (value) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/users/admin/dashboard?startDate=${value?.startDate}&endDate=${value?.endDate}&offset=${value?.offset}&limit=${value?.rows}`,
      method: "get",
      type: "user",
      onStart: fetchDashboardInfoLoading.type,
      onSuccess: fetchDashboardInfoSuccess.type,
      onError: fetchDashboardInfoError.type,
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
