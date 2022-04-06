import React, { useState, useEffect } from "react";
import { languages } from "../data";
import { loadState } from "../helpers/local_storage";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPod,
  updatePod,
  getPodCasts,
  getPods,
  resetData,
} from "../store/podcast";
import { getCategoryDetails } from "../store/category";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

let uplaodPictureElement = null;
let uplaodCoverElement = null;
let formData = new FormData();
const reader = new FileReader();
const image = new Image();

const AddPodcast = ({ open, setOpen }) => {
  const [progress, setProgress] = useState(50);
  const [uploadProgress, setUploadProgress] = useState();
  const [upload_picture, setUploadPicture] = useState(null);
  const [picture, setPicture] = useState(null);
  const [upload_cover, setUploadCover] = useState(null);
  const [cover, setCover] = useState(null);
  const [values, setValue] = useState();
  const [show_id, setShowId] = useState();

  const dispatch = useDispatch();
  const podcast = useSelector(getPodCasts);
  const category = useSelector(getCategoryDetails);
  const userId = loadState() && loadState().userId;

  const { loading, created, response } = podcast;

  useEffect(() => {
    if (created && progress === 50) {
      response && setShowId(response.show_id);
      setProgress(100);
    }

    if (!created && progress === 100) {
      userId && dispatch(getPods(userId));
      setUploadPicture(null);
      setPicture(null);
      setProgress(50);
      setUploadCover(null);
      setShowId();
      setValue();
      setCover();
      setUploadProgress();
      setOpen(false);
    }
  }, [created, dispatch, progress, response, setOpen, userId]);

  const onUploadProgress = (progressEvent) => {
    let percentCompleted = 0;
    percentCompleted = Math.floor(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (progress === 50) {
      dispatch(createPod(values));
    }
    if (progress === 100) {
      formData.set("title", values.title);
      formData.set("language", values.language);
      values &&
        values.description &&
        formData.set("description", values.description);
      values &&
        values.category_id &&
        formData.set("category_id", values.category_id);
      upload_picture && formData.set("image_file", upload_picture);
      upload_cover && formData.set("cover_image_file", upload_cover);

      dispatch(
        updatePod({
          data: {
            formData,
          },
          show_id,
          onUploadProgress,
        })
      );
    }
  };

  const handleFile = (e, type) => {
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      image.src = reader.result;
      image.onload = () => {
        if (type === "image_url") {
          if (image.width < 400 || image.width > 3000) {
            toast.error(
              "Upload an image with width between 400 pixels and 3000 pixels."
            );
            return;
          }

          setUploadPicture(e.target.files[0]);
          setPicture(reader.result);
        } else {
          //   if (image.width < 600 || image.width > 3000) {
          //     toast.error(
          //       "Please, upload a file with a width and a height not lesser than 600 and greater than 3000 for the cover image"
          //     );
          //     return;
          //   }

          setUploadCover(e.target.files[0]);
          setCover(reader.result);
        }
      };
    };
  };

  return (
    <Modal
      show={open}
      onHide={() => {
        dispatch(resetData());
        setUploadPicture(null);
        setPicture(null);
        setProgress(50);
        setUploadCover(null);
        setShowId();
        setValue();
        setCover();
        setUploadProgress();
        setOpen(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            <Container> Add New Podcast</Container>
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
                  <label>Podcast Title</label>
                  <input
                    name="title"
                    type="text"
                    maxLength={30}
                    className="form-control"
                    placeholder="Podcast Title"
                    onChange={(e) => handleValue(e)}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    className="form-control"
                    name="language"
                    onChange={(e) => handleValue(e)}
                    value={values && values.language}
                    required
                  >
                    <option selected>Choose a language</option>
                    {languages.map((data, id) => (
                      <option key={id} value={data.code}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            {loading && !created && (
              <div className="wait text-center my-2">
                <spa>
                  <Spinner animation="border" size="sm" className="mr-1" />{" "}
                </spa>{" "}
                just a moment...please, the page is loading
              </div>
            )}
            {progress === 100 && created && (
              <Row className="mb-3">
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
                            handleFile(e, "image_url");
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
                <Col xs={12} md={6}>
                  <div>
                    <label>Cover</label>
                    <div className="d-flex flex-column">
                      <img
                        src={cover || "https://via.placeholder.com/600x100"}
                        alt="cover"
                        height="70"
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
                          ref={(e) => (uplaodCoverElement = e)}
                          onChange={(e) => {
                            setUploadCover();
                            handleFile(e, "cover_url");
                          }}
                        />
                        <Button
                          variant="light"
                          className="upload-file mt-2"
                          onClick={() => {
                            uplaodCoverElement.click();
                          }}
                        >
                          Upload New Image
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            {progress === 100 && (
              <Row>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      className="form-control"
                      name="category_id"
                      onChange={(e) => handleValue(e)}
                      required
                    >
                      <option selected>Choose a category</option>
                      {!isEmpty(category.data) &&
                        category.data.categories.map((data, id) => (
                          <option key={id} value={data.category_id}>
                            {data.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="form-group">
                    <label>Episode Description</label>
                    <textarea
                      name="description"
                      type="text"
                      className="form-control"
                      rows="4"
                      onChange={(e) => handleValue(e)}
                      value={values && values.description}
                      style={{ resize: "none" }}
                      placeholder="Listeners want to know what your episode is about before they tune in. (optional)"
                    />
                  </div>
                </Col>
              </Row>
            )}
            <div className="my-3">
              {uploadProgress && (
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
            <div>
              <Button variant="warning" type="submit" disabled={loading}>
                <span className="button-label">Submit</span>
              </Button>
            </div>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddPodcast;
