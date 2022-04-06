import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "category",
    initialState: {
        loading: false,
        data: null,
    },
    reducers: {
        reset: (category) => {
            category.loading = false;
            category.data = null;
        },
        categoryRequested: (category) => {
            category.loading = true;
        },
        categoryDataSet: (category, action) => {
            category.data = action.payload;
            category.loading = false;
        },
        categoryRequestFailed: (category) => {
            category.loading = false;
        },
    }
})

const {
    categoryRequestFailed,
    categoryRequested,
    categoryDataSet,
    reset
} = slice.actions;

//Action Creators
export const resetData = () => (dispatch) => dispatch({ type: reset.type })
export const getCategory = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: "/categories?status=true",
        method: "get",
        type: "pod",
        onStart: categoryRequested.type,
        onSuccess: categoryDataSet.type,
        onError: categoryRequestFailed.type
    }))
}

//Selectors
//Memoization
export const getCategoryDetails = createSelector(
    state => state.entities.category,
    category => category
)


export default slice.reducer;