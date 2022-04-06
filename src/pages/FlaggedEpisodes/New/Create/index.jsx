import React, { useState, useEffect } from "react";

import { loadState } from "../../../../helpers/local_storage";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getPodCasts, getPods } from "../../../../store/podcast";

import { Button, Row, Col, Container, Spinner } from "react-bootstrap";

import {
  getEpisodes,
  resetData,
  uploadEpisode,
  updateEpisode,
} from "../../../../store/episodes";

import CloudIcon from "../../../../assets/svg/cloud-icon.svg";

import { visibility } from "../../../../data";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

let uplaodAudioElement = null;
let uplaodPictureElement = null;
const reader = new FileReader();
const image = new Image();

export const CreateEpisode = () => {
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
  const userId = loadState() && loadState().userId;

  const { updateFailed, uploadFailed } = episode;

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
    if (userId) {
      dispatch(
        getPods({
          userId,
          limit: 0,
          offset: 0,
        })
      );
    }
  }, []);

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

  useEffect(() => {
    let formData = new FormData();

    if (episode?.uploadData !== null && validateInput()) {
      //get all values
      formData.set("title", values?.title);
      formData.set("description", values?.description);
      formData.set("tags", values?.tags);
      formData.set("visibility", values?.visibility);
      formData.set("cip_visibility", values.visibility);
      upload_picture && formData.set("image_file", upload_picture);
      formData.set("media_file", upload_audio);

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
        show_id: values.show_id,
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
    } else {
      let file = e.target.files[0]

      if (!file) return;

      if (file?.size > 1000000) {
        setErrors({
          ...errors,
          picture:
            "We recommend uploading an image with maximum size of 512KB.",
        });
        return;
      }
      reader?.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        image.src = reader?.result;
        image.onload = () => {
          if (type === "image_url") {
            if (image.height < 1400 || image.width < 1400) {
              setErrors({
                ...errors,
                picture:
                  "Upload an image with resolution at least 1400px by 1400px.",
              });
              return;
            }
            setUploadPicture(e.target.files[0]);
            setPicture(reader?.result);
            setErrors({ ...errors, picture: undefined });
          }
        };
      };
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
                  <Col xs={12}>
                    <div className="d-flex flex-row mb-3">
                      <div>
                        <label className="pod-label">Picture</label>
                        <img
                          src={picture || "https://via.placeholder.com/1400"}
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
                            .Jpeg or .Png up to 512KB in size. 1400px x
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
                    {errors?.picture && (
                      <div className="text-danger px-3">{errors?.picture}</div>
                    )}
                  </Col>

                  <Col xs={12}>
                    <div className="form-group">
                      <div className="form-group">
                        <label>Visibility</label>
                        <select
                          className="form-control pod-input"
                          name="visibility"
                          onChange={(e) => handleValue(e)}
                        >
                          <option selected>Select a visibility status</option>
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
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>
                        Tags(keywords that allows listeners find your episodes
                        easily)
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
                        <div className="text-danger px-3">{errors?.tags}</div>
                      )}
                    </div>
                  </Col>
                  <Col xs={12}>
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
                  </Col>
                </Row>
              </div>
            </Container>

            <div>
              <div
                className="d-flex justify-content-center"
                style={{ gap: "1rem" }}
              >
                <Button
                  variant="warning"
                  className="pod-button"
                  type="submit"
                  disabled={episode.uploading || episode.updating}
                  style={{ minWidth: "120px" }}
                >
                  <span className="button-label">
                    {episode.uploading || episode.updating ? (
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

      {(updateFailed || uploadFailed) && (
        <SweetAlert
          error
          title="Operation Failed!"
          onConfirm={() => {
            dispatch(resetData());
          }}
          customButtons={
            <React.Fragment>
              <button
                className="pod-button"
                onClick={() => {
                  dispatch(resetData());
                }}
              >
                Close
              </button>
            </React.Fragment>
          }
        >
          {updateFailed || uploadFailed}
        </SweetAlert>
      )}
    </>
  );
};
