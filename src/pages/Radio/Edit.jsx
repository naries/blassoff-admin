import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRadio, getRadios, resetData } from "../../store/radio";
import Select from "react-select";
import makeAnimated from "react-select/animated";




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
import { sectionPos } from "../../data";
import { useSelector } from "react-redux";
import { MyDropzone } from "../../components/MyDropZone";
import { getCategoryDetails } from "../../store/category";
import { removeDuplicates } from "../../modules/removeArrDuplicates";
import { urlRegex } from "../../helpers/urlRegex";

let formData = new FormData();
const reader = new FileReader();
const image = new Image();

const animatedComponents = makeAnimated();
export default function UpdateRadio({
  showEdit,
  setShowEdit,
  loadRadios,
  editPayload,
}) {
  const [uploadProgress, setUploadProgress] = useState();
  const [values, setValue] = useState();
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
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailure, setUpdateFailure] = useState(false);
  const [errors, setErrors] = useState();
  const [categories, setCategories] = useState([]);
  const podcast = useSelector(getPodCasts);
  const category = useSelector(getCategoryDetails);

  const RadioData = useSelector(getRadios);
  const { updateData, createFailed } = RadioData;

  useEffect(() => {
    if (editPayload) {
      let cats = [];
      editPayload?.categories.map(cat => {
        cats.push({
          label: cat.displayName,
          value: cat._id,
          category_id: cat.category_id
        })
      })
      setPicture(editPayload.artwork);
      setValue({
        ...values,
        name: editPayload?.name,
        station: editPayload?.station,
        artwork: editPayload?.artwork,
        mediaUrl: editPayload?.mediaUrl,
        location: editPayload?.location,
        category_id: cats
      });
    }
  }, [editPayload]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateData) {
      //handle success here
      setUpdateSuccess(true);
    }
    if (createFailed) {
      setUpdateFailure(true);
    }
  }, [updateData, createFailed]);

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

    let data = {
      name: values?.name,
      categories: [...values.category_id.map(item => item.value)].toString(),
      artwork: picture,
      mediaUrl: values.mediaUrl,
      station: values?.station
    }

    dispatch(
      updateRadio({
        data: {
          ...data
        },
        id: editPayload?._id,
        onUploadProgress,
      })
    );
  };

  const handle = file => {
    reader?.readAsDataURL(file)

    reader.onload = () => {
      image.src = reader?.result;
      image.onload = () => {
        if (image.height > 700 || image.width > 700) {
          setErrors({
            ...errors,
            picture:
              "Upload an image below or 700 by 700 pixels.",
          });
          return;
        }


        setUploadPicture(reader?.result);
        setPicture(reader?.result);
        setErrors({ ...errors, picture: undefined });
      }
    };
  }

  const validateInput = () => {
    dispatch(resetData());

    if (values?.category_id.length == 0) {
      setErrors({ ...errors, category_id: "Please select at least one category" });
      return false;
    }

    if (!values?.name) {
      setErrors({ ...errors, name: "Please enter station name" });
      return false;
    }

    if (!urlRegex.test(values?.mediaUrl)) {
      setErrors({ ...errors, mediaUrl: "Please enter media url" });
      return false;
    }

    if (!values?.station || isNaN(parseFloat(values?.station))) {
      setErrors({ ...errors, station: "Please enter artwork" });
      return false;
    }

    return true;
  };

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

  const closeModal = () => {
    setShowEdit(false);
    loadRadios();
    dispatch(resetData());
  };
  return (
    <Modal
      show={showEdit}
      onHide={() => {
        closeModal();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#00678F', color: 'white', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Update Radio</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {updateSuccess ? (
          <>
            <Alert show={updateSuccess} variant="success">
              <Alert.Heading>SUCCESS</Alert.Heading>
              <p>Radio updated successfully</p>
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
                            <label>Radio name</label>
                            <input
                              className="form-control pod-input"
                              onChange={handleValue}
                              name="name"
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
                            <label>Station</label>
                            <input
                              className="form-control pod-input"
                              onChange={handleValue}
                              name="station"
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
                            <label>Media URL</label>
                            <input
                              className="form-control pod-input"
                              onChange={handleValue}
                              name="mediaUrl"
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
                        <Col>

                          <div className="d-flex flex-row">
                            <div>
                              <label className="pod-label">Picture</label>
                              <img
                                src={
                                  picture ||
                                  editPayload?.artwork ||
                                  "https://via.placeholder.com/700"
                                }
                                alt="album"
                                className="mr-3 radio-upload-preview"
                                height="300"
                                width="300"
                              />
                            </div>

                            <div className="w-100">
                              <div className="recommendation pod-label mb-2">
                                Artwork
                              </div>
                              <MyDropzone handler={handle} />
                            </div>
                          </div>
                          {errors?.picture && (
                            <div className="text-danger px-3">
                              {errors?.picture}
                            </div>
                          )}
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="warning" type="submit">
                          <span className="button-label">
                            {RadioData?.creating ? (
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
    </Modal >
  );
}
