import React, { useState, useEffect } from "react";

import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getPodCasts } from "../../../../store/podcast";

import { Button, Row, Col, Container, Spinner } from "react-bootstrap";

import {
  getEpisodes,
  resetData,
  uploadEpisode,
} from "../../../../store/episodes";
import { useHistory } from "react-router";

let uplaodAudioElement = null;
const reader = new FileReader();
const image = new Image();

export const UploadEpisode = () => {
  const history = useHistory();
  const [uploadProgress, setUploadProgress] = useState();
  const [upload_audio, setUploadAudio] = useState(null);
  const [picture, setPicture] = useState(null);
  const [upload_picture, setUploadPicture] = useState(null);
  const [audioFile, setAudioFile] = useState("");
  const [showSuccess, setShowSuccess] = useState();
  const [values, setValue] = useState();
  const [errors, setErrors] = useState();

  const dispatch = useDispatch();
  const podcast = useSelector(getPodCasts);
  const episode = useSelector(getEpisodes);

  const { updateFailed, createFailed } = episode;

  const onUploadProgress = (progressEvent) => {
    let percentCompleted = 0;
    percentCompleted = Math.floor(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  const handleValue = (e) => {
    setErrors({ ...errors, [e.target.name]: undefined });
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(resetData());
  }, []);

  useEffect(() => {
    if (episode.uploaded) {
      setShowSuccess(true);
    }
  }, [episode]);

  const validateInput = () => {
    dispatch(resetData());

    if (!values?.title) {
      setErrors({ ...errors, title: "Please enter title" });
      return false;
    }

    if (!values?.show_id) {
      setErrors({ ...errors, show_id: "Please select a podcast" });
      return false;
    }

    if (!audioFile) {
      setErrors({
        ...errors,
        audioFile: "Please select an audio file to upload",
      });
      return false;
    }

    return true;
  };

  const handleUpload = () => {
    let formData = new FormData();

    //get all values
    formData.set("title", values?.title);
    formData.set("media_file", upload_audio);

    //dispatch
    dispatch(
      uploadEpisode({
        data: {
          formData,
        },
        show_id: values?.show_id,
        onUploadProgress,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate the inputs
    if (validateInput()) {
      //   create the podcast
      handleUpload();
    }
  };

  const handleFile = (e, type) => {
    if (e.target.files[0].type === "audio/mpeg") {
      if (e.target.files[0].size < 1048576) {
        setErrors({
          ...errors,
          audioFile: "Minimum of 1 Megabyte is allowed",
        });
        return;
      }
      setAudioFile(e.target.files[0].name);
      setUploadAudio(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="new-pod-title">Create Your Podcast Episode</div>
        <div className="new-pod-container ">
          <form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col xs={12}>
                  <div className="form-group">
                    <label>Episode Title</label>
                    <input
                      name="title"
                      type="text"
                      maxLength={30}
                      className="form-control pod-input"
                      placeholder="episode title."
                      onChange={(e) => handleValue(e)}
                    />
                    {errors?.title && (
                      <div className="text-danger px-3">{errors?.title}</div>
                    )}
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="form-group">
                    <label>Choose the podcast for this episode</label>
                    <select
                      className="form-control pod-input"
                      name="show_id"
                      onChange={(e) => handleValue(e)}
                    >
                      <option value="" selected>
                        Select a Podcast
                      </option>
                      {podcast?.fetchData?.podCast.map((data, id) => (
                        <option key={id} value={data.show_id}>
                          {data.title}
                        </option>
                      ))}
                    </select>
                    {errors?.show_id && (
                      <div className="text-danger px-3">{errors?.show_id}</div>
                    )}
                  </div>
                </Col>
              </Row>

              <div>
                <Row className="mb-3">
                  <Col xs={12}>
                    <div className="form-group">
                      <label>Choose the file you want to upload</label>
                      <input
                        type="text"
                        name="media_hidden"
                        className="form-control pod-input"
                        placeholder="Maximum file size is 300 MB."
                        value={audioFile}
                        onClick={() => {
                          uplaodAudioElement.click();
                        }}
                      />
                      <input
                        style={{ display: "none" }}
                        name="media_url"
                        type="file"
                        accept="audio/mp3"
                        ref={(e) => (uplaodAudioElement = e)}
                        onChange={(e) => {
                          setErrors({
                            ...errors,
                            audioFile: undefined,
                          });
                          setUploadAudio();
                          handleFile(e, "media_url");
                        }}
                      />
                      {errors?.audioFile && (
                        <div className="text-danger px-3">
                          {errors?.audioFile}
                        </div>
                      )}
                    </div>
                  </Col>

                
                </Row>
              </div>
            </Container>
            {updateFailed ||
              (createFailed && (
                <div className="text-danger text-center mb-2">
                  unable to add episode. Please try again later..
                </div>
              ))}
            <div>
              <div
                className="d-flex justify-content-center"
                style={{ gap: "1rem" }}
              >
                <Button
                  variant="warning"
                  className="pod-button"
                  type="submit"
                  disabled={episode.uploading}
                  style={{ minWidth: "120px" }}
                >
                  <span className="button-label">
                    {episode.uploading ? (
                      <Spinner variant="primary" animation="border" size="sm" />
                    ) : (
                      "Submit"
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <SweetAlert
          success
          title="Success Data!"
          onConfirm={() => {
            dispatch(resetData());
            history.push("/episodes");
          }}
          customButtons={
            <React.Fragment>
              <button
                className="pod-button"
                onClick={() => {
                  dispatch(resetData());
                  history.push("/episodes");
                }}
              >
                Close
              </button>
            </React.Fragment>
          }
        >
          Episode added successfully
        </SweetAlert>
      )}
    </>
  );
};
