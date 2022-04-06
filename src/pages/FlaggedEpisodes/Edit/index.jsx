import React, { useState, useEffect } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";

import { Button, Row, Col, Container, Spinner } from "react-bootstrap";

import { getEpisodes, resetData, updateEpisode } from "../../../store/episodes";
import Podcast from "../../../assets/svg/podcast.svg";
import { visibility } from "../../../data";
import { useHistory } from "react-router";
import { AddNewBtn } from "../../../components/AddNewBtn";


export const UpdateEpisode = (props) => {
  const { selected, setOpen, setUpdate } = props;
  const history = useHistory();
  const [uploadProgress, setUploadProgress] = useState();
  const [values, setValue] = useState();
  const [errors, setErrors] = useState();

  const dispatch = useDispatch();
  const episode = useSelector(getEpisodes);

  const { updateFailed, updateData } = episode;

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
    if (selected) {
      setValue({
        ...values,
        title: selected?.title,
        description: selected?.description,
        tags: selected?.tags,
        visibility: selected?.visibility,
      });
    }
  }, [selected]);

  const validateInput = () => {
    dispatch(resetData());

    if (!values?.title) {
      setErrors({ ...errors, title: "Please enter title" });
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

  const handleUpdate = () => {
let formData = new FormData();

    if (validateInput()) {
      //get all values
      formData.set("title", values?.title);
      formData.set("description", values?.description);
      formData.set("tags", values?.tags);
      formData.set("visibility", values?.visibility);
      formData.set("cip_visibility", values.visibility);

      //dispatch
      dispatch(
        updateEpisode({
          data: {
            formData,
          },
          episode_id: selected?._id,
          onUploadProgress,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate the inputs
    if (validateInput()) {
      //   create the podcast
      handleUpdate();
    }
  };

  const handleClose = () => {
    dispatch(resetData());
    if (history.location.pathname === "/episodes") {
      setUpdate(false);
    } else {
      history.push("/episodes");
    }
  };

  return (
    <div className="podcasts-container">
      <div className="podcasts-container--top">
        <div className="podcasts-container--top-left">
          <img src={Podcast} alt="pod title icon" />
          {selected?.title}
        </div>
        <div className="podcasts-container--top-right">&nbsp;</div>
      </div>
      <div className="d-flex flex-column align-items-center podcasts-grid">
        <div className="new-pod-title">Update Episode</div>
        <div className="new-pod-container ">
          <form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col xs={12}>
                  <div className="form-group">
                    <label>Episode Title</label>
                    <input
                      value={values?.title}
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
              </Row>

              <div>
                <Row className="mb-3">
                  <Col xs={12}>
                    <div className="form-group">
                      <div className="form-group">
                        <label>Visibility</label>
                        <select
                          className="form-control pod-input"
                          name="visibility"
                          onChange={(e) => handleValue(e)}
                        >
                          <option value="">Select a visibility status</option>
                          {visibility.map((data, id) => (
                            <option
                              selected={data?.value === values?.visibility}
                              key={id}
                              value={data.value}
                            >
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
                        value={values?.tags}
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
                        value={values?.description}
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
                  variant="secondary"
                  className="pod-secondary-button"
                  style={{ minWidth: "120px" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="warning"
                  className="pod-button"
                  type="submit"
                  disabled={episode.creating || episode.updating}
                  style={{ minWidth: "120px" }}
                >
                  <span className="button-label">
                    {episode.creating || episode.updating ? (
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

      {updateData && (
        <SweetAlert
          success
          title="Success Data!"
          onConfirm={() => {}}
          customButtons={
            <React.Fragment>
              <button className="pod-button" onClick={handleClose}>
                Close
              </button>
            </React.Fragment>
          }
        >
          Episode updated successfully
        </SweetAlert>
      )}

      {updateFailed && (
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
          {updateFailed}
        </SweetAlert>
      )}
    </div>
  );
};
