import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createRadio, getRadios, resetData } from "../../store/radio";
import Select from "react-select";
import { getPodCasts } from "../../store/podcast";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import { getCategoryDetails } from "../../store/category";
import { removeDuplicates } from "../../modules/removeArrDuplicates";

let formData = new FormData();
const reader = new FileReader();
const image = new Image();
const animatedComponents = makeAnimated();

export default function AddRadio({ showAdd, setShowAdd, loadRadios }) {
  const [uploadProgress, setUploadProgress] = useState();
  const [values, setValue] = useState();
  const [categories, setCategories] = useState([]);

  const [picture, setPicture] = useState(null);
  const [upload_picture, setUploadPicture] = useState(null);

  const onUploadProgress = (progressEvent) => {
    let percentCompleted = 0;
    percentCompleted = Math.floor(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();
  const podcast = useSelector(getPodCasts);

  const dispatch = useDispatch();
  const category = useSelector(getCategoryDetails);
  const radioData = useSelector(getRadios);
  const { createData, createFailed } = radioData;

  useEffect(() => {
    if (category?.data?.categories.length) {
      let filteredCategories = removeDuplicates(
        category?.data?.categories,
        "displayName"
      );

      const cats = filteredCategories.map((c) => {
        return {
          label: c?.displayName,
          value: c?._id,
          category_id: c?.category_id,
        };
      });
      setCategories(cats);
    }
  }, [category?.data?.categories]);

  useEffect(() => {
    if (createData) {
      //handle success here
      setAddSuccess(true);
    }
    if (createFailed) {
      setAddFailure(true);
    }
  }, [createData, createFailed]);

  const handleValue = (e) => {
    setErrors();
    dispatch(resetData());
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate the inputs
    if (validateInput()) {
      //   create the podcast
      handleCreate();
    }
  };

  const handleCreate = () => {
    const categoriesToSubmit = values?.category_id
      .map((cat) => {
        return cat?.value;
      })
      .join(",")
      .replace(/\s+/g, "");

    dispatch(
      createRadio({
        data: {
          name: values.name,
          station: values.station,
          mediaUrl: values.mediaUrl,
          artwork: values.artwork,
          categories: String(categoriesToSubmit),
        },
        onUploadProgress,
      })
    );
  };

  const validateInput = () => {
    dispatch(resetData());

    if (!values?.name) {
      setErrors({ ...errors, name: "Please enter station name" });
      return false;
    }

    if (!values?.station) {
      setErrors({ ...errors, station: "Please enter station" });
      return false;
    }

    if (!values?.mediaUrl) {
      setErrors({ ...errors, mediaUrl: "Please enter media url" });
      return false;
    }

    if (!values?.artwork) {
      setErrors({ ...errors, artwork: "Please enter artwork" });
      return false;
    }

    if (!values?.category_id) {
      setErrors({
        ...errors,
        category_id: "Please select at least one category",
      });
      return false;
    }

    return true;
  };

  const closeModal = () => {
    setShowAdd(false);
    loadRadios();
    dispatch(resetData());
  };
  return (
    <Modal
      show={showAdd}
      onHide={() => {
        closeModal();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Create Radio</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addSuccess ? (
          <>
            <Alert show={addSuccess} variant="success">
              <Alert.Heading>SUCCESS</Alert.Heading>
              <p>Radio added successfully</p>
            </Alert>
            <div className="d-flex justify-content-end p-2">
              <Button
                onClick={() => {
                  closeModal();
                }}
                variant="outline-success"
              >
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="p-4">
              <Container>
                <Row>
                  <Col xs={12}>
                    {createFailed && (
                      <Alert variant="danger">{createFailed}</Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Name</label>
                            <input
                              name="name"
                              type="text"
                              maxLength={30}
                              className="form-control pod-input"
                              placeholder="Name"
                              onChange={(e) => handleValue(e)}
                              value={values?.name}
                            />
                            {errors?.name && (
                              <div className="text-danger px-3">
                                {errors?.name}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Station</label>
                            <input
                              name="station"
                              type="text"
                              maxLength={30}
                              className="form-control pod-input"
                              placeholder="Station"
                              onChange={(e) => handleValue(e)}
                              value={values?.station}
                            />
                            {errors?.station && (
                              <div className="text-danger px-3">
                                {errors?.station}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Media Url</label>
                            <input
                              name="mediaUrl"
                              type="text"
                              maxLength={30}
                              className="form-control pod-input"
                              placeholder="Media Url"
                              onChange={(e) => handleValue(e)}
                              value={values?.mediaUrl}
                            />
                            {errors?.mediaUrl && (
                              <div className="text-danger px-3">
                                {errors?.mediaUrl}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">
                              Artwork(convert image to base64)
                            </label>
                            <textarea
                              name="artwork"
                              onChange={(e) => handleValue(e)}
                              type="text"
                              className="form-control pod-textarea"
                              rows="4"
                              style={{ resize: "none" }}
                              placeholder="Convert image to base64 string and past here"
                            />
                            {errors?.artwork && (
                              <div className="text-danger px-3">
                                {errors?.artwork}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Category</label>
                            <Select
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              options={categories}
                              defaultValue={values?.category_id}
                              value={values?.category_id}
                              onChange={(value) => {
                                setValue({
                                  ...values,
                                  category_id: value,
                                });
                              }}
                            />

                            {errors?.category_id && (
                              <div className="text-danger px-3">
                                {errors?.category_id}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="warning" type="submit">
                          <span className="button-label">
                            {radioData?.creating ? (
                              <Spinner variant="secondary" />
                            ) : (
                              "Save"
                            )}
                          </span>
                        </Button>
                      </div>
                    </form>
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
