import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBanner, getBanners, resetData } from "../../store/banners";
import CloudIcon from "../../assets/svg/cloud-icon.svg";
import { getAllPods, getPodCasts } from "../../store/podcast";
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
import { toDataURL } from "../../helpers/imgToBase64";
import { PodcastSearchModal } from "./PodcastSearchModal";


let uplaodPictureElement = null;
let formData = new FormData();
const reader = new FileReader();
const image = new Image();

export default function UpdateBanner({
  showEdit,
  setShowEdit,
  loadBanners,
  editPayload,
}) {
  const [uploadProgress, setUploadProgress] = useState();
  const [values, setValue] = useState();
  const [picture, setPicture] = useState(null);
  const [upload_picture, setUploadPicture] = useState(null);
  const [convertedImage, setConvertedImage] = useState("");

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
  const [showPodcastSearchModal, setShowPodcastSearchModal] = useState(false);

  const bannerData = useSelector(getBanners);
  const { updateData, createFailed } = bannerData;

  const [selected, setSelected] = useState({});

  useEffect(() => {
    setSelected(editPayload?.podCast);

    if (editPayload) {
      setValue({
        ...values,
        showBanner: editPayload?.show,
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
    if (!convertedImage) {
      toDataURL(editPayload?.artwork, function (dataUrl) {
        dispatch(
          updateBanner({
            data: {
              artwork: dataUrl,
              position: values?.position,
              podCast: selected?._id,
            },
            id: editPayload?._id,
            onUploadProgress,
          })
        );
      });
    } else {
      dispatch(
        updateBanner({
          data: {
            artwork: convertedImage,
            position: values?.position,
            podCast: values?.show_id,
          },
          id: editPayload?._id,
          onUploadProgress,
        })
      );
    }
  };

  const handleFile = (e, type) => {
    let file = e.target.files[0]

    if (!file) return;

    if (file?.size > 512000) {
      setErrors({
        ...errors,
        picture:
          "We recommend uploading an image with maximum size of 512KB.",
      });
      return;
    }
    reader?.readAsDataURL(file);

    reader.onload = (fileLoadedEvent) => {
      const converted_image = fileLoadedEvent.target.result;

      image.src = reader?.result;
      image.onload = () => {
        if (type === "image_url") {
          if (image.height < 388 || image.width < 199) {
            setErrors({
              ...errors,
              picture:
                "Upload an image with resolution at least 388px by 199px.",
            });
            return;
          }

          setUploadPicture(e.target.files[0]);
          setConvertedImage(converted_image)
          setPicture(reader?.result);
          setErrors({ ...errors, picture: undefined });
        }
      };
    };
  };

  const validateInput = () => {
    dispatch(resetData());

    if (!selected?.show_id) {
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
    loadBanners();
    dispatch(resetData());
  };
  return (<>
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
          <Container>Update Banner</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {updateSuccess ? (
          <>
            <Alert show={updateSuccess} variant="success">
              <Alert.Heading>SUCCESS</Alert.Heading>
              <p>Banner updated successfully</p>
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

                            <div
                              className="form-control pod-input"
                              name="show_id"
                              onClick={() => setShowPodcastSearchModal(true)}
                            >
                              {selected?.title}
                            </div>
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
                          <div className="d-flex flex-row mb-3">
                            <div>
                              <label className="pod-label">Picture</label>
                              <img
                                src={
                                  picture ||
                                  editPayload?.artwork ||
                                  "https://via.placeholder.com/400"
                                }
                                alt="album"
                                className="mr-3 banner-upload-preview"
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
                                    .Jpeg or .Png up to 512KB in size. 388px x
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
                            {bannerData?.updating ? (
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
    <PodcastSearchModal
      setShowPodcastSearchModal={setShowPodcastSearchModal}
      showPodcastSearchModal={showPodcastSearchModal}
      setSelected={setSelected}
      setValue={setValue}
      values={values}
    // selected={selected}
    />
  </>);
}
