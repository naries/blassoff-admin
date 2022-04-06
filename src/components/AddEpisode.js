import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { loadState } from "../helpers/local_storage";
import { useDispatch, useSelector } from "react-redux";
import { getPodCasts } from "../store/podcast";
import { visibility } from "../data";
import {
  uploadEpisode,
  updateEpisode,
  getEpisodes,
  resetData,
} from "../store/episodes";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

let uplaodAudioElement = null;
let uplaodPictureElement = null;
let formData = new FormData();
const reader = new FileReader();
const image = new Image();

const AddEpisode = ({ open, setOpen }) => {
  const [progress, setProgress] = useState(50);
  const [uploadProgress, setUploadProgress] = useState();
  const [upload_audio, setUploadAudio] = useState(null);
  const [audioFileName, setName] = useState("");
  const [upload_picture, setUploadPicture] = useState(null);
  const [picture, setPicture] = useState(null);
  const [values, setValue] = useState();
  const [episode_id, setShowId] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const podcasts = useSelector(getPodCasts);
  const episode = useSelector(getEpisodes);
  const userId = loadState() && loadState().userId;

  const { loading, created, response } = episode;

  useEffect(() => {
    if (created && progress === 50) {
      response && setShowId(response.episode_id);
      setProgress(100);
    }

    if (!created && progress === 100) {
      setUploadPicture(null);
      setPicture(null);
      setProgress(50);
      setUploadAudio(null);
      setShowId();
      setValue();
      setName("");
      setOpen(false);
    }
  }, [created, dispatch, progress, response, setOpen, userId]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(() => true);

    values && formData.set("title", values.title);
    upload_audio && formData.set("media_file", upload_audio);

    if (progress === 50) {
      if (upload_audio) {
        dispatch(
          uploadEpisode({
            data: {
              formData,
            },
            show_id: values && values.show_id, //this is the podcast ID
            onUploadProgress,
          })
        );
      }
    }
    if (progress === 100) {
      formData.set("title", values.title);
      values &&
        !isEmpty(values.description) &&
        formData.set("visibility", values?.visibility);
      values &&
        !isEmpty(values.visibility) &&
        formData.set("cip_visibility", values?.visibility);
      values && !isEmpty(values.tags) && formData.set("tags", values.tags);
      upload_audio && formData.set("media_file", upload_audio);
      upload_picture && formData.set("image_file", upload_picture);

      dispatch(
        updateEpisode({
          data: {
            formData,
          },
          episode_id,
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

  const handleFile = (e) => {
    if (e.target.files[0].type === "audio/mpeg") {
      if (e.target.files[0].size < 1048576) {
        toast.error("Minimum of 1 Megabyte is allowed");
        return;
      }
      setName(e.target.files[0].name);
      setUploadAudio(e.target.files[0]);
    } else {
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        image.src = reader.result;
        image.onload = () => {
          if (image.width < 400 || image.width > 3000) {
            toast.error(
              "Upload an image with width between 400 pixels and 3000 pixels."
            );
            return;
          }

          setUploadPicture(e.target.files[0]);
          setPicture(reader.result);
        };
      };
    }
  };

  return (
    <Modal
      show={open}
      onHide={() => {
        dispatch(resetData());
        setUploadPicture(null);
        setPicture(null);
        setProgress(50);
        setUploadAudio(null);
        setShowId();
        setValue();
        setName("");
        setOpen(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            <Container> Upload New Episode</Container>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="my-3">
              <ProgressBar variant="warning" className="stage" now={progress} />
            </div>
            <Row>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label>Episode Title</label>
                  <input
                    name="title"
                    type="text"
                    maxLength={30}
                    className="form-control"
                    placeholder="episode title."
                    onChange={(e) => handleValue(e)}
                    required
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
                    <option value="" selected>
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
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label>Choose the file you want to upload</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Maximum file size is 300 MB."
                    value={audioFileName}
                    onClick={() => {
                      uplaodAudioElement.click();
                    }}
                  />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept="audio/mp3"
                    ref={(e) => (uplaodAudioElement = e)}
                    onChange={(e) => {
                      setUploadAudio();
                      handleFile(e, "media_url");
                    }}
                  />
                </div>
                {!upload_audio && isSubmitting ? (
                  <div className="text-danger">
                    Please select file to upload
                  </div>
                ) : null}
              </Col>
            </Row>
            {loading && !created && (
              <div className="wait text-center my-2">
                <span>
                  <Spinner animation="border" size="sm" className="mr-1" />{" "}
                </span>
                just a moment...please, the page is loading
              </div>
            )}
            {progress === 100 && created && (
              <div>
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <div className="form-group">
                      <label>Episode Description</label>
                      <textarea
                        name="description"
                        onChange={(e) => handleValue(e)}
                        type="text"
                        className="form-control"
                        rows="4"
                        style={{ resize: "none" }}
                        placeholder="Listeners want to know what your episode is about before they tune in. (optional)"
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div>
                      <label>Picture</label>
                      <div className="d-flex flex-row">
                        <img
                          src={picture || "https://via.placeholder.com/160"}
                          alt="album"
                          className="mr-3"
                          height="160"
                          width="160"
                        />
                        <div>
                          <div className="recommendation mb-2">
                            We recommend uploading episode artwork at least
                            1400x1400 pixels in size. We support: jpg, png, gif
                            and tiff formats, at a minimum of 400x400 px, and
                            maximum of 4 MB.
                          </div>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/png, image/jpeg, image/gif, image/tiff"
                            placeholder="image"
                            ref={(e) => (uplaodPictureElement = e)}
                            onChange={(e) => {
                              setUploadPicture();
                              handleFile(e);
                            }}
                          />
                          <Button
                            variant="light"
                            className="upload-file"
                            onClick={() => {
                              uplaodPictureElement.click();
                            }}
                          >
                            Upload New Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <div className="form-group">
                      <div className="form-group">
                        <label>Visibility</label>
                        <select
                          className="form-control"
                          name="visibility"
                          onChange={(e) => handleValue(e)}
                          required
                        >
                          <option selected>Select a visibility status</option>
                          {visibility.map((data, id) => (
                            <option key={id} value={data.value}>
                              {data.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="form-group">
                      <label>
                        Tags(keywords that allows listeners find your episodes
                        easily)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        className="form-control"
                        placeholder="Add tags, seperated with comma. Max 20 tags (30 chars per tag limit)."
                        value={values && values.tags}
                        onChange={(e) => handleValue(e)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            )}
            <div className="my-3">
              {uploadProgress && progress === 50 && (
                <ProgressBar
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  className="percentage"
                />
              )}

              {uploadProgress && progress === 100 && (
                <ProgressBar
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  className="percentage"
                />
              )}
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer className="pb-5 pt-3">
          {progress === 50 && (
            <div className="d-flex flex-row">
              <Button variant="warning" type="submit" disabled={loading}>
                <span className="button-label">Save & Continue</span>
              </Button>
            </div>
          )}
          {progress === 100 && (
            <div className="d-flex flex-row">
              <Button variant="warning" type="submit" disabled={loading}>
                <span className="button-label">Publish</span>
              </Button>
            </div>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddEpisode;
