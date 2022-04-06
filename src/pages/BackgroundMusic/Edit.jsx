import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatebgMusic, getbgMusics, resetData } from "../../store/bgMusic";

import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  ProgressBar,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { visibility, genres } from "../../data";
import { getAudioDuration } from "../../modules/getAudioDuration";

let uplaodAudioElement = null;
let formData = new FormData();

export default function AddBackgroundMusic({
  showEdit,
  setShowEdit,
  loadBgMusic,
  editPayload,
}) {
  const [uploadProgress, setUploadProgress] = useState();
  const [upload_audio, setUploadAudio] = useState(null);
  const [audioFileName, setName] = useState("");
  const [values, setValue] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioDuration, setAudioDuration] = useState();

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);

  const musicData = useSelector(getbgMusics);
  const { updateData, updateFailed } = musicData;

  useEffect(() => {
    if (editPayload) {
      setValue({
        ...values,
        title: editPayload?.title,
        genre: editPayload?.genre,
        type: editPayload?.type,
      });
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateData) {
      //handle success here
      setAddSuccess(true);
    }
    if (updateFailed) {
      setAddFailure(true);
    }
  }, [updateData, updateFailed]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(() => true);
    setUploadProgress();

    // //reset data
    // dispatch(resetData());

    formData.set("title", values.title);
    formData.set("type", values.type);
    formData.set("genre", values.genre);
    formData.set("duration", audioDuration);
    formData.set("media_file", upload_audio);

    dispatch(
      updatebgMusic({
        data: {
          formData,
        },
        onUploadProgress,
        bgMusic_id: editPayload._id,
      })
    );
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
      setName(e.target.files[0].name);
      setUploadAudio(e.target.files[0]);
    } else {
      console.log("its wrong file type");
    }
  };

  useEffect(() => {
    async function getDuration() {
      let duration = await getAudioDuration(upload_audio);
      setAudioDuration(duration);
    }
    if (upload_audio) {
      getDuration();
    }
  }, [upload_audio]);

  return (
    <Modal
      show={showEdit}
      onHide={() => {
        setShowEdit(false);
        setUploadProgress();
        setAddFailure(false);
        setAddSuccess(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Upload background music</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addSuccess ? (
          <Alert show={addSuccess} variant="success">
            <Alert.Heading>SUCCESS</Alert.Heading>
            <p>
              Selected file has been successfully added as a background music on
              the system.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  setAddSuccess(false);
                  setShowEdit(false);
                  loadBgMusic();
                }}
                variant="outline-success"
              >
                Close
              </Button>
            </div>
          </Alert>
        ) : (
          <>
            <div className="p-4">
              <Container>
                <Row>
                  <Col xs={12}>
                    <Card style={{ padding: "1rem" }}>
                      {addFailure && (
                        <Alert variant="danger">
                          Unable to complete update, please try again
                        </Alert>
                      )}
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} md={6}>
                            <div className="form-group">
                              <label>Title</label>
                              <input
                                name="title"
                                type="text"
                                maxLength={30}
                                value={values?.title}
                                className="form-control"
                                placeholder="episode title."
                                onChange={(e) => handleValue(e)}
                                required
                              />
                            </div>
                          </Col>
                          <Col xs={12} md={6}>
                            <div className="form-group">
                              <div className="form-group">
                                <label>Type</label>
                                <select
                                  className="form-control"
                                  name="type"
                                  onChange={(e) => handleValue(e)}
                                  required
                                >
                                  <option selected>Select Type</option>
                                  {visibility.map((data, id) => {
                                    return (
                                      <option
                                        selected={data.value === values?.type}
                                        key={id}
                                        value={data.value}
                                      >
                                        {data.label}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} md={6}>
                            <div className="form-group">
                              <label>Media File</label>
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
                          </Col>

                          <Col xs={12} md={6}>
                            <div className="form-group">
                              <label>Genre</label>
                              <select
                                className="form-control"
                                name="genre"
                                onChange={(e) => handleValue(e)}
                                required
                              >
                                <option selected>Select Genre</option>
                                {genres.map((data, id) => {
                        
                                  return (
                                    <option
                                      selected={data.value === values?.genre}
                                      key={id}
                                      value={data.value}
                                    >
                                      {data.label}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </Col>
                        </Row>

                        <div className="my-3">
                          {uploadProgress && uploadProgress !== 100 && (
                            <ProgressBar
                              now={uploadProgress}
                              label={`${uploadProgress}%`}
                              className="percentage"
                            />
                          )}
                        </div>

                        <div className="d-flex justify-content-end">
                          <Button
                            variant="warning"
                            type="submit"
                            disabled={updateData?.creating}
                          >
                            <span className="button-label">
                              {updateData?.creating ? (
                                <Spinner variant="secondary" />
                              ) : (
                                "Update"
                              )}
                            </span>
                          </Button>
                        </div>
                      </form>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
