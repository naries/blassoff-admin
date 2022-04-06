import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  Container,
  Tabs,
  Tab,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import moment from "moment";
import { getPodCasts } from "../store/podcast";
import getBlobDuration from "get-blob-duration";
import AudioPlayer from "./AudioPlayer";
import RecordRed from "../assets/svg/record-red.svg";
import { loadState } from "../helpers/local_storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadEpisode,
  getEpisodes,
  updateEpisode,
  resetData,
} from "../store/episodes";
import MicRecorder from "mic-recorder-to-mp3";
import { useHistory } from "react-router";
import { visibility } from "../data";

import CloudIcon from "../assets/svg/cloud-icon.svg";

let formData = new FormData();
let uplaodPictureElement = null;
const reader = new FileReader();
const image = new Image();

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
var constraints = { audio: true, video: { width: 1280, height: 720 } };

const RecordEpisode = ({ open, setOpen }) => {
  const history = useHistory();
  const [values, setValue] = useState();
  const [errors, setErrors] = useState();
  const [picture, setPicture] = useState(null);

  const [key, setKey] = useState("offline");
  const podcasts = useSelector(getPodCasts);
  const [blobDuration, setBlobDuration] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:00");
  const [uploadProgress, setUploadProgress] = useState();
  const [stage, setStage] = useState(0);
  const [isBlocked, setIsBlock] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [supported, setSupported] = useState();
  const [audioURL, setAudioURL] = useState("");
  const [audioObj, setAudioObj] = useState("");
  const [upload_picture, setUploadPicture] = useState(null);
  const [showSuccess, setShowSuccess] = useState();

  const increment = useRef(null);
  const dispatch = useDispatch();
  const userId = loadState() && loadState().userId;

  const episode = useSelector(getEpisodes);

  const { loading, response } = episode;

  useEffect(() => {
    setOpen(false);
    setUploadProgress();
    setStage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (navigator && navigator.getUserMedia) {
      setSupported(true);
      navigator.getUserMedia(
        { audio: true },
        () => {
          setIsBlock(false);
        },
        () => {
          setIsBlock(true);
        }
      );
    } else {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    if (audioURL) getDuration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioURL]);

  const getDuration = async () => {
    const blobdur = await getBlobDuration(audioURL);
    setBlobDuration(blobdur);
  };

  const handleTimeStart = () => {
    let startTimestamp;
    startTimestamp = moment().startOf("day");

    increment.current = setInterval(() => {
      startTimestamp.add(1, "second");
      setDuration(startTimestamp.format("HH:mm:ss"));
    }, 1000);
  };

  const handleTimeReset = () => {
    clearInterval(increment.current);
    setDuration("00:00:00");
  };

  const handleValue = (e) => {
    setErrors({ ...errors, [e.target.name]: undefined });
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validateInput()) {
      values && formData.set("title", values.title);
      audioObj && formData.set("media_file", audioObj);

      //todo: also check that user is able to pass an image

      dispatch(
        uploadEpisode({
          data: {
            formData,
          },
          show_id: values && values.show_id,
          onUploadProgress,
        })
      );
    }
  };

  const onUploadProgress = (progressEvent) => {
    let percentCompleted = 0;
    percentCompleted = Math.floor(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  useEffect(() => {
    let formData = new FormData();

    if (episode?.uploadData !== null && validateInput()) {
      //get all values
      formData.set("title", values?.title);
      formData.set("description", values?.description);
      formData.set("tags", values?.tags);
      formData.set("visibility", values?.visibility);
      upload_picture && formData.set("image_file", upload_picture);

      //dispatch
      dispatch(
        updateEpisode({
          data: {
            formData,
          },
          episode_id: episode?.uploadData?._id,
          onUploadProgress,
        })
      );
    }

    if (episode.updated) {
      setShowSuccess(true);
    }
  }, [episode]);

  const start = () => {
    handleTimeStart();
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    handleTimeReset();
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setAudioURL(blobURL);
        setAudioObj(blob);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  const validateInput = () => {
    dispatch(resetData());

    if (!values?.visibility) {
      setErrors({ ...errors, visibility: "Please select visibility" });
      return false;
    }

    if (!values?.tags) {
      setErrors({ ...errors, tags: "Please enter tags for this episode" });
      return false;
    }

    if (!values?.description) {
      setErrors({
        ...errors,
        description: "Please enter a description",
      });
      return false;
    }

    return true;
  };

  const handleFile = (e, type) => {
    reader?.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      image.src = reader?.result;
      image.onload = () => {
        if (type === "image_url") {
          if (image.width < 400 || image.width > 3000) {
            setErrors({
              ...errors,
              picture:
                "Upload an image with width between 400 pixels and 3000 pixels.",
            });
            return;
          }

          setUploadPicture(e.target.files[0]);
          setPicture(reader?.result);
          setErrors({ ...errors, picture: undefined });
        }
      };
    };
  };

  return (
    <Modal
      show={open}
      onHide={() => {
        setOpen(false);
        setUploadProgress();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Create your Episode</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {!supported && (
            <div className="text-center py-5">
              <FontAwesomeIcon icon={faExclamationTriangle} size="5x" />
              <div className="text-dark text-bold h4 mt-3 mb-3">
                Browser Not Supported!
              </div>
              <div className="mb-3">
                Use Google Chrome to access the recorder.
              </div>
            </div>
          )}
          {supported && (
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="ml-3"
            >
              <Tab
                eventKey="offline"
                title={
                  <div className="text-center">
                    <img src={RecordRed} alt="icon" className="mr-2" />
                    Offline Recording
                  </div>
                }
              >
                <div className="py-4 px-3 content border-line">
                  {stage === 0 && !isRecording && (
                    <Row>
                      <Col xs={12} md={6}>
                        <div className="form-group">
                          <label>Episode Title</label>
                          <input
                            name="title"
                            type="text"
                            className="form-control"
                            placeholder="Episode Title"
                            onChange={(e) => handleValue(e)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} md={6}>
                        <div className="form-group">
                          <label>Choose the podcast for this episode</label>
                          <select
                            className="form-control"
                            name="show_id"
                            onChange={(e) => handleValue(e)}
                            required
                          >
                            <option selected value="">
                              Select a Podcast
                            </option>
                            {podcasts &&
                              podcasts.fetchData &&
                              podcasts.fetchData.podCast &&
                              podcasts.fetchData.podCast.map((data, id) => (
                                <option key={id} value={data.show_id}>
                                  {data.title}
                                </option>
                              ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                  )}

                  {stage === 1 && isRecording && (
                    <div className="d-flex justify-content-center pt-5">
                      <div>
                        <div className="mb-3 text-center">
                          <div className="record-info">
                            You are now Recording
                          </div>
                          <div className="record-time">{duration}</div>
                        </div>
                        <Button
                          variant="dark"
                          onClick={() => {
                            stop();
                            setStage(2);
                            // setOpen(false)
                          }}
                          className="record-stop"
                        >
                          Stop Recording
                        </Button>
                      </div>
                    </div>
                  )}

                  {stage === 2 && !isRecording && audioURL && (
                    <Container>
                      {uploadProgress !== 100 ? (
                        <div>
                          <div className="d-flex justify-content-start mb-3 my-4">
                            <div className="record-info">
                              Would you like to save your recording? Or click
                              cancel to return to podcast list.
                            </div>
                          </div>
                          <div className="mb-3">
                            <AudioPlayer
                              episode={audioURL}
                              blobDuration={blobDuration}
                            />
                          </div>

                          <div className="d-flex flex-row mb-3">
                            <div>
                              <label className="pod-label">Picture</label>
                              <img
                                src={
                                  picture || "https://via.placeholder.com/400"
                                }
                                alt="album"
                                className="mr-3 pod-upload-preview"
                                height="160"
                                width="160"
                              />
                            </div>

                            <div className="w-100">
                              <div className="recommendation pod-label mb-2">
                                Podcast Channel Artwork
                              </div>
                              <div
                                className="pod-file-picker"
                                onClick={() => {
                                  uplaodPictureElement.click();
                                }}
                              >
                                <img src={CloudIcon} alt="cloud icon" />
                                <div>
                                  <div className="pod-file-picker-instruction">
                                    Drop an image file here or click to upload
                                  </div>
                                  <div className="pod-file-picker-types">
                                    .Jpeg or .Png up to 15MB in size. 1400 x
                                    1400px high resolution recommended
                                  </div>
                                </div>
                              </div>
                              <input
                                style={{ display: "none" }}
                                type="file"
                                accept="image/png, image/jpeg, image/gif, image/tiff"
                                placeholder="image"
                                name="image_url"
                                ref={(e) => (uplaodPictureElement = e)}
                                onChange={(e) => {
                                  setErrors({
                                    ...errors,
                                    image: undefined,
                                  });
                                  setUploadPicture();
                                  handleFile(e, "image_url");
                                }}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Episode Description</label>
                            <textarea
                              name="description"
                              onChange={(e) => handleValue(e)}
                              type="text"
                              className="form-control pod-textarea"
                              rows="4"
                              style={{ resize: "none" }}
                              placeholder="Listeners want to know what your episode is about before they tune in. (optional)"
                            />
                            {errors?.description && (
                              <div className="text-danger px-3">
                                {errors?.description}
                              </div>
                            )}
                          </div>

                          <div className="form-group">
                            <div className="form-group">
                              <label>Visibility</label>
                              <select
                                className="form-control pod-input"
                                name="visibility"
                                onChange={(e) => handleValue(e)}
                              >
                                <option selected>
                                  Select a visibility status
                                </option>
                                {visibility.map((data, id) => (
                                  <option key={id} value={data.value}>
                                    {data.label}
                                  </option>
                                ))}
                              </select>
                              {errors?.visibility && (
                                <div className="text-danger px-3">
                                  {errors?.visibility}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>
                              Tags(keywords that allows listeners find your
                              episodes easily)
                            </label>
                            <input
                              type="text"
                              name="tags"
                              className="form-control pod-input"
                              placeholder="Add tags, seperated with comma. Max 20 tags (30 chars per tag limit)."
                              value={values && values.tags}
                              onChange={(e) => handleValue(e)}
                            />
                            {errors?.tags && (
                              <div className="text-danger px-3">
                                {errors?.tags}
                              </div>
                            )}
                          </div>

                          <div className="my-3">
                            {uploadProgress && (
                              <ProgressBar
                                now={uploadProgress}
                                label={`${uploadProgress}%`}
                                className="percentage"
                              />
                            )}
                          </div>

                          <div className="d-flex justify-content-between mt-4">
                            <Button
                              variant="danger"
                              className="record-red"
                              disabled={loading}
                              onClick={() => {
                                setStage(0);
                                setOpen(false);
                                setUploadProgress();
                              }}
                            >
                              Cancel
                            </Button>

                            <Button
                              variant="dark"
                              className="record-save"
                              disabled={loading}
                              onClick={(e) => {
                                handleSubmit(e);
                              }}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="p-3 text-white bg-success font-weight-bold mb-4">
                            <h4>Episode uploaded successfully</h4>
                          </div>

                          <Button
                            variant="dark"
                            disabled={loading}
                            onClick={() => {
                              dispatch(resetData());
                              history.push("/podcasts");
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      )}
                    </Container>
                  )}
                </div>
              </Tab>
              <Tab
                eventKey="live"
                title={
                  <div className="text-center">
                    <img src={RecordRed} alt="icon" className="mr-2" /> Live
                    Recording
                  </div>
                }
              >
                <div className="py-4 px-3 content border-line">
                  The live recording feature is not available yet
                </div>
              </Tab>
            </Tabs>
          )}
        </Container>
      </Modal.Body>
      {supported && key === "offline" && (
        <Modal.Footer className="pb-5 pt-3">
          {stage === 0 && (
            <Button
              variant="danger"
              onClick={() => {
                setStage(1);
                start();
              }}
              disabled={values && values.title && values.show_id ? false : true}
              className="record-button"
            >
              Click to start recording
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default RecordEpisode;
