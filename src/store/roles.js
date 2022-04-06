import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "role",
    initialState: {
        loading: false,
        creating: false,

        created: false,

        createFailed: false,

        
        data: null,
    },
    reducers: {
        reset: (role) => {
            role.loading = false;
            role.creating = false;

            role.created = false;

            role.createFailed = false;
            
            role.data = null;
        },
        roleRequested: (role) => {
            role.loading = true;
        },
        roleDataSet: (role, action) => {
            role.data = action.payload.data;
            role.loading = false;
        },
        roleRequestFailed: (role) => {
            role.loading = false;
        },
        roleCreateLoading: (role) => {
            role.creating = true;
        },
        roleCreateSuccess: (role, action) => {
            role.creating = false;
            role.created = true;
            role.createFailed = false;
        },
        roleCreateFailed: (role) => {
            role.creating = false;
            role.created = false;
            role.createFailed = true;
        },
    }
})

const {
    roleRequestFailed,
    roleRequested,
    roleDataSet,
    roleCreateFailed,
    roleCreateLoading,
    roleCreateSuccess,
    reset
} = slice.actions;

//Action Creators
export const resetData = () => (dispatch) => dispatch({ type: reset.type })
export const getrole = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: "/getRoles",
        method: "get",
        type: "role",
        onStart: roleRequested.type,
        onSuccess: roleDataSet.type,
        onError: roleRequestFailed.type
    }))
}

export const createRole = (value) => (dispatch) => {
    dispatch(apiCallBegan({
        url: "/addrole",
        method: "post",
        type: "role",
        data: value,
        onStart: roleCreateLoading.type,
        onSuccess: roleCreateSuccess.type,
        onError: roleCreateFailed.type
    }))
}

//Selectors
//Memoization
export const getroleDetails = createSelector(
    (state) => state.entities.roles,
    (roles) => roles
)

export const getAll = createSelector(
    (state) => state
)

export default slice.reducer;