import React, { useEffect } from "react";
import { TabDescription } from "../Home";
import StopBtn from "../../../assets/svg/stop-recording.svg";
import DeleteBtn from "../../../assets/svg/delete-recording.svg";
import SoundWave from "../../../assets/svg/soundwave.svg";
import Rewind10 from "../../../assets/svg/rewind-10.svg";
import Forward10 from "../../../assets/svg/forward-10.svg";
import SoundWaveStopped from "../../../assets/svg/soundwave-stopped.svg";
import { Spinner } from "react-bootstrap";
import { recordingActions } from "../RecordingContext/actions";
import { store } from "../RecordingContext";

export const StartRecording = ({ recorder, duration, handleStop }) => {
  const globalState = React.useContext(store);
  const { state, dispatch } = globalState;
  const { recordingState, currentRecording } = state;
  const { isPaused, isRecording, isPlaying, isStopped } = recordingState;

  // useEffect(() => {
  //   //dispatch an action to set this state
  //   dispatch({
  //     type: recordingActions.SET_RECORDING_STATE,
  //     payload: {
  //       isRecording: true,
  //       isPaused: false,
  //       isStopped: false,
  //       isPlaying: false,
  //     },
  //   });
  // }, []);

  const WaveImage = () => {
    if (isRecording || isPlaying) {
      return <img src={SoundWave} />;
    }
    if (isStopped || isPaused) {
      return <img src={SoundWaveStopped} />;
    }
    return <img src={SoundWave} />;
  };

  const Title = () => {
    if (isRecording) return "RECORDING";
    if (isPaused) return "PAUSED";
    if (isPlaying) return "PLAYING";
    return "";
  };

  const handlePlay = () => {
    const tmp = new Audio(currentRecording); //passing your state (hook)
    tmp.play(); //simple play of an audio element.
  };
  return (
    <div className="bg-grey-100">
      <TabDescription description="Start recording...Select your preferred input device to get started!" />
      <div className="bg-white-smoke new-pod-container d-flex align-items-center justify-content-center p-3">
        <div className="w-100">
          <h6 className="text-center mb-3">
            <Title />
          </h6>
          <div
            className={`soundwave ${
              (isStopped || isPaused) && "soundwave-stopped"
            }`}
          >
            <WaveImage />
          </div>
          <p className="text-center mb-4">{duration}</p>
          {isPlaying && (
            <div className="d-flex align-items-center justify-content-center mb-3">
              <img src={Rewind10} className="ml-3" alt="stop-btn" />
              <img
                onClick={() => {
                  dispatch({
                    type: recordingActions.SET_RECORDING_STATE,
                    payload: {
                      isRecording: false,
                      isPaused: false,
                      isStopped: true,
                      isPlaying: false,
                    },
                  });
                }}
                src={StopBtn}
                className="ml-3"
                alt="stop-btn"
              />
              <img src={Forward10} className="ml-3" alt="stop-btn" />
            </div>
          )}
          <div className="d-flex justify-content-center">
            {isRecording && !isPaused && !isStopped && (
              <button
                className="pause-btn"
                onClick={() => {
                  dispatch({
                    type: recordingActions.SET_RECORDING_STATE,
                    payload: {
                      isRecording: false,
                      isPaused: true,
                      isStopped: false,
                      isPlaying: false,
                    },
                  });
                }}
              >
                Pause
              </button>
            )}

            {isPaused && (
              <button
                className="resume-btn"
                onClick={() => {
                  dispatch({
                    type: recordingActions.SET_RECORDING_STATE,
                    payload: {
                      isRecording: true,
                      isPaused: false,
                      isStopped: false,
                      isPlaying: false,
                    },
                  });
                }}
              >
                Resume
              </button>
            )}

            {isStopped && (
              <button
                className="preview-btn"
                onClick={() => {
                  handlePlay();
                  dispatch({
                    type: recordingActions.SET_RECORDING_STATE,
                    payload: {
                      isRecording: false,
                      isPaused: false,
                      isStopped: false,
                      isPlaying: true,
                    },
                  });
                }}
              >
                Preview
              </button>
            )}
            {isRecording ? (
              <img
                src={StopBtn}
                onClick={() => {
                  dispatch({
                    type: recordingActions.SET_RECORDING_STATE,
                    payload: {
                      isRecording: false,
                      isPaused: false,
                      isStopped: true,
                      isPlaying: false,
                    },
                  });

                  if (recorder.state === "recording") {
                    handleStop();
                    recorder.stop();
                  }
                }}
                className="ml-3"
                alt="stop-btn"
              />
            ) : null}

            {isStopped ? (
              <>
                <button className="preview-btn ml-3">Save</button>
                <img
                  onClick={() =>
                    dispatch({
                      type: recordingActions.DELETE_CURRENT_RECORDING,
                    })
                  }
                  src={DeleteBtn}
                  className="ml-3"
                  alt="delete-btn"
                />
              </>
            ) : null}
          </div>
          <Spinner />
        </div>
      </div>
    </div>
  );
};
