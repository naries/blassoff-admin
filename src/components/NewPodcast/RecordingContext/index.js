import produce from "immer";
import React, { createContext, useReducer } from "react";
import { initialState } from "./utils";
import { recordingActions } from "./actions";

const store = createContext(initialState);
const { Provider } = store;
const {
  SET_RECORDINGS,
  SET_RECORDING_STATE,
  SET_AUDIO_INPUTS,
  SET_RECORDER,
  SET_DURATION,
  SET_ACTIVE_KEY,
  SET_SELECTED_INPUT,
  SET_RECORDING_MODAL_STATUS,
  SET_CURRENT_RECORDING,
  DELETE_CURRENT_RECORDING
} = recordingActions;

const StateProvider = ({ children }) => {
  //reducer
  const reducer = produce((draft, action) => {
    switch (action.type) {
      case SET_RECORDING_MODAL_STATUS: {
        draft.isRecordingModalOpen = action.payload;
        break;
      }
      case SET_RECORDINGS: {
        draft.recordings.push(draft.currentRecording);
        break;
      }

      case SET_CURRENT_RECORDING: {
        draft.currentRecording = action.payload;
        break;
      }

      case DELETE_CURRENT_RECORDING: {
        draft.currentRecording = null;
        draft.recordings.shift();
        draft.recordingState = {
          isRecording: false,
          isPaused: false,
          isStopped: false,
          isPlaying: false,
        }
        break;
      }

      case SET_RECORDING_STATE: {
        draft.recordingState = action.payload;
        break;
      }

      case SET_AUDIO_INPUTS: {
        draft.audioInputs = [...action.payload];
        break;
      }

      case SET_RECORDER: {
        draft.recorder = action.payload;
        break;
      }

      case SET_DURATION: {
        draft.duration = action.payload;
        break;
      }

      case SET_ACTIVE_KEY: {
        draft.activeKey = action.payload;
      }

      case SET_SELECTED_INPUT: {
        draft.selectedInput = action.payload;
        break;
      }

      default:
        break;
    }
  });

  //useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
