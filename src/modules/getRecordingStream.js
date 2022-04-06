export const getRecordingStream =  async (config) => {
  let mediaDevices = [];
  const stream = await navigator.mediaDevices.getUserMedia(config);
  await navigator.mediaDevices.enumerateDevices().then(md => {
    mediaDevices = md;
  })
  return {stream, mediaDevices};
};
