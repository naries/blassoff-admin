export const checkMediaRecorder = () => {
  let isAvailable = false;

  if ("MediaRecorder" in window) {
    isAvailable = true;
  }
  return isAvailable;
};
