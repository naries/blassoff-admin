import React, { useEffect, useRef, useState } from "react";
import { Modal, Container, Tabs, Tab } from "react-bootstrap";
import moment from "moment";
import { BgMusic } from "../BgMusic";
import { Effects } from "../Effects";
import { Library } from "../Library";
import { Record } from "../Record";
import RecordIcon from "../../../assets/svg/record-black.svg";
import SoundWave from "../../../assets/svg/sound-wave.svg";
import LibraryIcon from "../../../assets/svg/library-icon.svg";
import MusicIcon from "../../../assets/svg/music-icon.svg";
import { StartRecording } from "../Record/StartRecording";
import { toast } from "react-toastify";
import { getRecordingStream } from "../../../modules/getRecordingStream";
import { checkMicPermission } from "../../../modules/checkMicPermission";
import { checkMediaRecorder } from "../../../modules/checkMediaRecorder";
import "./style.css";
import { store } from "../RecordingContext";
import { recordingActions } from "../RecordingContext/actions";

var bgMusic = new Audio('https://cdn.pixabay.com/download/audio/2020/10/11/audio_fe4d3bcac9.mp3?filename=cali-1171.mp3');
bgMusic.volume = 0.5;

const recordingConfig = {
  audio: true,
  video: false,
};

export const TabDescription = ({ description }) => (
  <div className="bg-yellow rounded-top p-1 d-flex align-items-center justify-content-center text-white">
    {description}
  </div>
);

const Home = ({ open, setOpen }) => {
  const globalState = React.useContext(store);
  const { state, dispatch } = globalState;
  const {
    recorder,
    activeKey,
    mimeType,
    recordingState,
    duration,
  } = state;
  const { isRecording, isStopped, isPlaying, isPaused } = recordingState;
  const increment = useRef(null);

  const startRecording = async () => {
    try {
      handleTimeStart();
      recorder.start();
    } catch (err) {
      toast.error("ERR: ", err);
    }
  };

  const handleTimeStart = () => {
    bgMusic.play();
    let startTimestamp;
    startTimestamp = moment().startOf("day");

    increment.current = setInterval(() => {
      startTimestamp.add(1, "second");
      dispatch({
        type: recordingActions.SET_DURATION,
        payload: startTimestamp.format("HH:mm:ss"),
      });
    }, 1000);
  };

  const handleTimeStop = () => {
    bgMusic.src = "";
    clearInterval(increment.current);
    dispatch({
      type: recordingActions.SET_DURATION,
      payload: "00:00:00",
    });
  };

  useEffect(async () => {
    if (open) {
      getRecordingStream(recordingConfig).then((data) => {
        dispatch({
          type: recordingActions.SET_AUDIO_INPUTS,
          payload: data?.mediaDevices,
        });
        checkPermissions(data.stream);
      });
    }
  }, [open]);

  const checkPermissions = (data) => {
    if (checkMicPermission()) {
      if (checkMediaRecorder()) {
        let r = new MediaRecorder(data, { type: mimeType });

        r.ondataavailable = function (event) {

          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          dispatch({
            type: recordingActions.SET_CURRENT_RECORDING,
            payload: URL.createObjectURL(event.data),
          });
        };

        r.onstop = function (e) {
          dispatch({
            type: recordingActions.SET_RECORDINGS,
          });
        };

        dispatch({
          type: recordingActions.SET_RECORDER,
          payload: r,
        });
      } else {
        toast.error(
          "Sorry, your browser doesn't support the MediaRecorder API, so this demo will not work."
        );
      }
    } else {
      toast.error("Access to microphone is denied");
    }
  };

  const TabTitle = ({ title, imgSrc, altTxt }) => (
    <div className="d-flex align-items-center justify-content-center w-100">
      <img
        src={imgSrc}
        alt={altTxt}
        className="mr-2"
        style={{ width: "18px", height: "26px" }}
      />
      <span className="font-weight-normal">{title}</span>
    </div>
  );

  return (
    <Modal
      show={open}
      onHide={() => {
        setOpen(false);
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
      dialogClassName="modal-90w h-75"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <Container> Add New Podcasts</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="h-100">
        <Tabs
          activeKey={activeKey}
          onSelect={(k) =>
            dispatch({
              type: recordingActions.SET_ACTIVE_KEY,
              payload: k,
            })
          }
          id="new-podcast"
        >
          <Tab
            eventKey="record"
            title={
              <TabTitle
                title="Record"
                imgSrc={RecordIcon}
                altTxt="record icon"
              />
            }
          >
            {isRecording || isStopped || isPaused || isPlaying ? (
              <StartRecording
                recorder={recorder}
                duration={duration}
                handleStop={handleTimeStop}
              />
            ) : (
              <Record startRecording={startRecording} />
            )}
          </Tab>
          <Tab
            eventKey="library"
            title={
              <TabTitle
                title="Library"
                imgSrc={LibraryIcon}
                altTxt="record icon"
              />
            }
          >
            <Library />
          </Tab>
          <Tab
            eventKey="effect"
            title={
              <TabTitle
                title="Effects"
                imgSrc={SoundWave}
                altTxt="record icon"
              />
            }
          >
            <Effects />
          </Tab>
          <Tab
            eventKey="background_music"
            title={
              <TabTitle
                title="Background Music"
                imgSrc={MusicIcon}
                altTxt="record icon"
              />
            }
          >
            <BgMusic />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default Home;
