import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "payment",
    initialState: {
        loading: false,
        data: null,
    },
    reducers: {
        reset: (payment) => {
            payment.loading = false;            
            payment.data = null;
        },
        paymentRequested: (payment) => {
            payment.loading = true;
        },
        paymentDataSet: (payment, action) => {
            payment.data = action.payload.data;
            payment.loading = false;
        },
        paymentRequestFailed: (payment) => {
            payment.loading = false;
        },
    }
})

const {
    paymentRequestFailed,
    paymentRequested,
    paymentDataSet,
    reset
} = slice.actions;

//Action Creators
export const resetData = () => (dispatch) => dispatch({ type: reset.type })
export const getpayment = (value) => (dispatch) => {
    dispatch(apiCallBegan({
        url: `?offset=${value.offset}&limit=${value.limit}`,
        method: "get",
        type: "payment",
        onStart: paymentRequested.type,
        onSuccess: paymentDataSet.type,
        onError: paymentRequestFailed.type
    }))
}

//Selectors
//Memoization
export const getpaymentDetails = createSelector(
    (state) => state.entities.payments,
    (payments) => payments
)

export const getAll = createSelector(
    (state) => state
)

export default slice.reducer;