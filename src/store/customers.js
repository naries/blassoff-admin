import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "customer",
  initialState: {
    //loading states
    loading: false,
    loadingBySearch: false,
    loadingOne: false,
    creating: false,
    updating: false,
    changingPw: false,
    //success states
    created: false,
    fetched: false,
    updateSuccess: false,
    changeSuccess: false,
    changePwSuccess: false,

    //failure states
    createFailed: false,
    fetchFailed: false,
    fetchBySearchFailed: false,
    fetchOneFailed: false,
    changeFailed: false,
    updateFailed: false,
    changePwFailed: false,

    //data
    createData: null,
    fetchData: null,
    fetchBySearchData: null,
    fetchOneData: null
  },
  reducers: {
    reset: (customer) => {
      //loading states
      customer.loading = false;
      customer.creating = false;
      customer.changing = false;

      //success states
      customer.created = false;
      customer.fetched = false;


      //failure states
      customer.createFailed = false;
      customer.fetchFailed = false;
      customer.changeFailed = false;

      //data
      customer.createData = null;
      customer.fetchData = null;
      customer.changeSuccess = null;
    },
    resetCreate: customer => {
      customer.creating = false;
      customer.createFailed = false;
      customer.fetchFailed = false;
      customer.createData = null;
    },
    resetUpdate: customer => {
      customer.updating = false;
      customer.updateFailed = false;
      customer.updateSuccess = false;
    },
    resetChange: customer => {
      customer.changing = false;
      customer.changeFailed = false;
      customer.changeSuccess = false;
    },
    resetChangePw: customer => {
      customer.changingPw = false;
      customer.changePwFailed = false;
      customer.changePwSuccess = false;
    },
    resetOne: customer => {
      customer.loadingOne = false;
      customer.fetchOneFailed = false;
      customer.fetchOneData = null;
    },
    resetBySearchCustomer: customer => {
      customer.loading = false;
      customer.loadingBySearch = false;
      customer.fetchBySearchFailed = false;
      customer.fetchBySearchData = null;
    },
    //get request
    fetchCustomersLoading: (customer) => {
      customer.loading = true;
    },
    //get success
    fetchCustomersSuccess: (customer, action) => {
      customer.loading = false;
      customer.fetchData = action.payload.data;
      customer.fetchFailed = false;
    },
    //get err
    fetchCustomersError: (customer) => {
      customer.loading = false;
      customer.fetchFailed = true;
      customer.fetchData = null;
    },
    fetchCustomerBySearchLoading: (customer) => {
      customer.loadingBySearch = true;
    },
    //get success
    fetchCustomerBySearchSuccess: (customer, action) => {
      if (!action.payload.data) {
        customer.loadingBySearch = false;
        customer.fetchBySearchFailed = true;
        customer.fetchBySearchData = null;
      } else {
        customer.loadingBySearch = false;
        customer.fetchBySearchData = action.payload.data;
        customer.fetchBySearchFailed = false;
      }
    },
    //get err
    fetchCustomerBySearchError: (customer) => {
      customer.loadingBySearch = false;
      customer.fetchBySearchFailed = true;
      customer.fetchBySearchData = null;
    },
    fetchOneCustomerLoading: (customer) => {
      customer.loadingOne = true;
    },
    //get success
    fetchOneCustomerSuccess: (customer, action) => {
      customer.loadingOne = false;
      customer.fetchOneData = action.payload.data;
      customer.fetchOneFailed = false;
    },
    //get err
    fetchOneCustomerError: (customer) => {
      customer.loadingOne = false;
      customer.fetchOneFailed = true;
      customer.fetchOneData = null;
    },
    changeCustomerStatusLoading: (customer) => {
      customer.changing = true;
    },
    //get success
    changeCustomerStatusSuccess: (customer, action) => {
      customer.changing = false;
      customer.changeSuccess = true;
      customer.changeFailed = false;
    },
    //get err
    changeCustomerStatusError: (customer) => {
      customer.changing = false;
      customer.changeSuccess = false;
      customer.changeFailed = true;
    },
    changePwStatusLoading: (customer) => {
      customer.changingPw = true;
    },
    //get success
    changePwStatusSuccess: (customer, action) => {
      customer.changingPw = false;
      customer.changePwSuccess = true;
      customer.changePwFailed = false;
    },
    //get err
    changePwStatusError: (customer) => {
      customer.changingPw = false;
      customer.changePwSuccess = false;
      customer.changePwFailed = true;
    },
    updateCustomerStatusLoading: (customer) => {
      customer.updating = true;
    },
    //get success
    updateCustomerStatusSuccess: (customer, action) => {
      customer.updating = false;
      customer.updateSuccess = true;
      customer.updateFailed = false;
    },
    //get err
    updateCustomerStatusError: (customer) => {
      customer.updating = false;
      customer.updateSuccess = false;
      customer.updateFailed = true;
    },
    //create request
    createCustomersLoading: (customer) => {
      customer.creating = true;
    },
    //create success
    createCustomersSuccess: (customer, action) => {
      customer.creating = false;
      customer.createData = action.payload;
      customer.fetchFailed = false;
    },
    //create err
    createCustomersError: (customer, action) => {
      customer.creating = false;
      customer.createFailed = action.payload;
      customer.createData = null;
    },
  },
});

const {
  fetchCustomersLoading,
  fetchCustomersSuccess,
  fetchCustomersError,
  fetchCustomerBySearchLoading,
  fetchCustomerBySearchSuccess,
  fetchCustomerBySearchError,
  fetchOneCustomerLoading,
  fetchOneCustomerSuccess,
  fetchOneCustomerError,
  updateCustomerStatusLoading,
  updateCustomerStatusSuccess,
  updateCustomerStatusError,
  changeCustomerStatusLoading,
  changeCustomerStatusSuccess,
  changeCustomerStatusError,
  changePwStatusLoading,
  changePwStatusSuccess,
  changePwStatusError,
  createCustomersLoading,
  createCustomersSuccess,
  createCustomersError,
  resetCreate,
  resetChange,
  resetUpdate,
  resetOne,
  resetBySearchCustomer,
  resetChangePw,
  reset,
} = slice.actions;

//Action Creators
// export const createCustomers = (value) => (dispatch) => {
//   dispatch(
//     apiCallBegan({
//       url: "createCustomer",
//       method: "post",
//       data: value.data,
//       type: "customer",
//       onStart: createCustomersLoading.type,
//       onSuccess: createCustomersSuccess.type,
//       onError: createCustomersError.type,
//     })
//   );
// };


export const getCustomer = (value) => (dispatch) => {
  let url = `getcustomers?searchKey=${value.search}&limit=${value.limit}&offset=${value.offset}`
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "customer",
      onStart:  fetchCustomersLoading.type,
      onSuccess:  fetchCustomersSuccess.type,
      onError:  fetchCustomersError.type,
    })
  );
};

export const getOneCustomer = (value) => (dispatch) => {
  let url = `?id=${value.id}`
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "customer",
      onStart:  fetchOneCustomerLoading.type,
      onSuccess:  fetchOneCustomerSuccess.type,
      onError:  fetchOneCustomerError.type,
    })
  );
};

export const getCustomerBySearch = (value) => (dispatch) => {
  let url = `?searchkey=${value}`
  dispatch(
    apiCallBegan({
      url,
      method: "get",
      type: "customer",
      onStart: fetchCustomerBySearchLoading.type,
      onSuccess: fetchCustomerBySearchSuccess.type,
      onError: fetchCustomerBySearchError.type,
    })
  );
};

// export const getOneCustomer = (value) => (dispatch) => {
//   let url = `?customerId=${value.id}`
//   dispatch(
//     apiCallBegan({
//       url,
//       method: "get",
//       type: "customer",
//       onStart:  fetchOneCustomerLoading.type,
//       onSuccess:  fetchOneCustomerSuccess.type,
//       onError:  fetchOneCustomerError.type,
//     })
//   );
// };

// export const deactivate = (value) => (dispatch) => {
//   let url = `status`
//   dispatch(
//     apiCallBegan({
//       url,
//       method: "post",
//       type: "customer",
//       data: value,
//       onStart:  changeCustomerStatusLoading.type,
//       onSuccess:  changeCustomerStatusSuccess.type,
//       onError:  changeCustomerStatusError.type,
//     })
//   );
// };

export const update = (value) => (dispatch) => {
  let url = "saveCustomers";
  dispatch(
    apiCallBegan({
      url,
      method: "post",
      type: "customer",
      data: value.data,
      onStart:  updateCustomerStatusLoading.type,
      onSuccess:  updateCustomerStatusSuccess.type,
      onError:  updateCustomerStatusError.type,
    })
  );
};

// export const changePwd = (value) => (dispatch) => {
//   let url = "resetpassword";
//   dispatch(
//     apiCallBegan({
//       url,
//       method: "post",
//       type: "customer",
//       data: value,
//       onStart:  changePwStatusLoading.type,
//       onSuccess:  changePwStatusSuccess.type,
//       onError:  changePwStatusError.type,
//     })
//   );
// };

export const resetData = () => (dispatch) => dispatch({ type: reset.type });
export const resetCreation = () => (dispatch) => dispatch({ type: resetCreate.type });
export const resetActivateDeactivate = () => (dispatch) => dispatch({ type: resetChange.type });
export const resetEdit = () => (dispatch) => dispatch({ type: resetUpdate.type });
export const resetOneCustomer = () => (dispatch) => dispatch({ type: resetOne.type });
export const resetCustomerBySearch = () => (dispatch) => dispatch({ type: resetBySearchCustomer.type });
export const resetPassword = () => (dispatch) => dispatch({ type: resetChangePw.type });

//Selectors
//Memoization
export const getCustomers = createSelector(
  (state) => state.entities.customers,
  (customers) => customers
);

export default slice.reducer;
