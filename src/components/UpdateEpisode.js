import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  ProgressBar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadState } from "../helpers/local_storage";
import { visibility } from "../data";
import {
  updateEpisode,
  getEpisodes,
  getEpisode,
  resetData,
} from "../store/episodes";
import { toast } from "react-toastify";

let uplaodPictureElement = null;
let formData = new FormData();
const reader = new FileReader();
const image = new Image();

const UpdateEpisode = ({ open, setOpen, selected, loadEpisodes }) => {
  const [uploadProgress, setUploadProgress] = useState();
  const [upload_picture, setUploadPicture] = useState(null);
  const [picture, setPicture] = useState(null);
  const [values, setValue] = useState();

  const dispatch = useDispatch();
  const episode = useSelector(getEpisodes);
  const userId = loadState() && loadState().userId;

  const { loading, response } = episode;

  useEffect(() => {
    setUploadPicture(null);
    setPicture(null);
    setValue();
    setOpen(false);
    setUploadProgress();
  }, [dispatch, response, setOpen, userId]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (values || selected) &&
      formData.set(
        "title",
        values && values.title ? values.title : selected ? selected.title : ""
      );
    (values || selected) &&
      formData.set(
        "description",
        values && values.description
          ? values.description
          : selected
          ? selected.description
          : ""
      );
    (values || selected) &&
      formData.set(
        "visibility",
        values && values.visibility
          ? values.visibility
          : selected
          ? selected.visibility
          : ""
      );
    (values || selected) &&
      formData.set(
        "tags",
        values && values.tags
          ? values.tags
          : selected
          ? selected.tags.toString()
          : ""
      );
    upload_picture && formData.set("image_file", upload_picture);

    dispatch(
      updateEpisode({
        data: {
          formData,
        },
        episode_id: selected.episode_id,
        onUploadProgress,
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <div>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <div className="form-group">
                <label>Episode Title</label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="episode title."
                  value={
                    values && values.title
                      ? values.title
                      : selected
                      ? selected.title
                      : ""
                  }
                  onChange={(e) => handleValue(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Episode Description</label>
                <textarea
                  name="description"
                  type="text"
                  className="form-control"
                  rows="4"
                  onChange={(e) => handleValue(e)}
                  value={
                    values && values.description
                      ? values.description
                      : selected && selected
                      ? selected.description
                      : ""
                  }
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
                    src={
                      picture ||
                      (selected && selected.image_url) ||
                      "https://via.placeholder.com/160"
                    }
                    alt="album"
                    className="mr-3"
                    height="160"
                    width="160"
                  />
                  <div>
                    <div className="recommendation mb-2">
                      We recommend uploading episode artwork at least 1400x1400
                      pixels in size. We support: jpg, png, gif and tiff
                      formats, at a minimum of 400x400 px, and maximum of 4 MB.
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
                    value={
                      values && values.visibility
                        ? values.visibility
                        : selected
                        ? selected.visibility
                        : ""
                    }
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
                  Tags(keywords that allows listeners find your episodes easily)
                </label>
                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  placeholder="Add tags, seperated with comma. Max 20 tags (30 chars per tag limit)."
                  value={
                    values && values.tags
                      ? values.tags
                      : selected
                      ? selected.tags.toString()
                      : ""
                  }
                  onChange={(e) => handleValue(e)}
                />
              </div>
            </Col>
          </Row>
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
      </Container>
    </form>
  );
};

export default UpdateEpisode;
