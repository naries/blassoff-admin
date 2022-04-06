import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRadio, getRadios, resetData } from "../../store/radio";
import CloudIcon from "../../assets/svg/cloud-icon.svg";
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

let uplaodPictureElement = null;
let formData = new FormData();
const reader = new FileReader();
const image = new Image();

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
  const podcast = useSelector(getPodCasts);

  const RadioData = useSelector(getRadios);
  const { updateData, createFailed } = RadioData;

  useEffect(() => {
    if (editPayload) {
      setValue({
        ...values,
        showRadio: editPayload?.show,
        show_id: editPayload?.podCast?._id,
        position: editPayload?.position,
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
    //get all values
    formData.set("position", values?.position);
    formData.set("podCast", values.show_id);
    formData.set("artwork", upload_picture);

    dispatch(
      updateRadio({
        data: {
          formData,
        },
        id: editPayload?._id,
        onUploadProgress,
      })
    );
  };

  const handleFile = (e, type) => {
    reader?.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      image.src = reader?.result;
      image.onload = () => {
        if (type === "image_url") {
          if (image.width < 388) {
            setErrors({
              ...errors,
              picture:
                "Upload an image with width between 400 pixels and 3000 pixels.",
            });
            return;
          }
          if (image.height < 199) {
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

  const validateInput = () => {
    dispatch(resetData());

    if (!values?.show_id) {
      setErrors({ ...errors, show_id: "Please select a podcast" });
      return false;
    }

    if (!values?.position) {
      setErrors({ ...errors, position: "Please select a position" });
      return false;
    }

    // if (!picture) {
    //   setErrors({ ...errors, picture: "Please select an image" });
    //   return false;
    // }

    return true;
  };

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
      <Modal.Header closeButton className="modal-header">
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
                                <option
                                  selected={
                                    editPayload?.podCast?._id === data?._id
                                  }
                                  key={id}
                                  value={data._id}
                                >
                                  {data.title}
                                </option>
                              ))}
                            </select>
                            {errors?.show_id && (
                              <div className="text-danger px-3">
                                {errors?.show_id}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label>Position</label>
                            <select
                              className="form-control"
                              name="position"
                              onChange={(e) => handleValue(e)}
                              required
                            >
                              <option selected>Select Position</option>
                              {sectionPos.map((data, id) => (
                                <option
                                  selected={
                                    editPayload?.position ===
                                    parseInt(data?.value)
                                  }
                                  key={id}
                                  value={data.value}
                                >
                                  {data.label}
                                </option>
                              ))}
                            </select>
                            {errors?.position && (
                              <div className="text-danger px-3">
                                {errors?.position}
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
                                  editPayload?.imageUrl ||
                                  "https://via.placeholder.com/400"
                                }
                                alt="album"
                                className="mr-3 Radio-upload-preview"
                                height="300"
                                width="300"
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
                                    .Jpeg or .Png up to 15MB in size. 388px x
                                    199px high resolution recommended
                                  </div>
                                </div>
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
    </Modal>
  );
}
