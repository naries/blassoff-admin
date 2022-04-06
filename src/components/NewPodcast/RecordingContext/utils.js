var initialState = {
  isRecordingModalOpen: false,
  recordings: [],
  currentRecording: null,
  recordingState: {
    isRecording: false,
    isPaused: false,
    isStopped: false,
    isPlaying: false,
  },
  audioInputs: [],
  recorder: null,
  duration:"00:00:00",
  activeKey: "record", 
  selectedInput: "default",
  mimeType: "audio/webm"
};

export { initialState };
