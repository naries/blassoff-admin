import axios from "axios";
import * as actions from "../api";
import { loadState } from "../../helpers/local_storage";
import { REACT_APP_API_URL } from "../../config";

const getBaseUrl = (reqType) => {
  let baseURL = REACT_APP_API_URL;
  switch (reqType) {
    case "user":
      baseURL += 'user/';
      break;
    case "role":
      baseURL += 'roles/'
      break;
    case "customer":
      baseURL += 'customer/'
      break;
    default:
      baseURL = 'user/';
      break;
  }
  return baseURL;
};

const api =
  ({ dispatch, getState }) =>
    (next) =>
      async (action) => {
        const state = loadState() && loadState().user && loadState();
        if (action.type !== actions.apiCallBegan.type) return next(action);

        const {
          url,
          method,
          data,
          onSuccess,
          onStart,
          onError,
          type,
          onUploadProgress,
          maxContentLength,
          maxBodyLength,
        } = action.payload;

        if (onStart) dispatch({ type: onStart });
        next(action);

        try {
          const response = await axios.request({
            baseURL: getBaseUrl(type),
            url,
            method,
            data,
            headers: { Authorization: `${state && `Bearer ${state.token}`}` },
            onUploadProgress: onUploadProgress && onUploadProgress,
            maxContentLength: maxContentLength && maxContentLength,
            maxBodyLength: maxBodyLength && maxBodyLength,
          });

          //General
          dispatch(actions.apiCallSuccess(response.data));

          //Specific
          if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
        } catch (error) {
          //General
          dispatch(actions.apiCallFailed(error?.response?.data?.message));

          //Specific
          if (onError)
            dispatch({ type: onError, payload: error?.response?.data?.message });
        }
      };

export default api;
