import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateSection,
  getSections,
  resetData,
  deleteSection,
  getSectionPodcasts,
  updateSectionPodcasts,
} from "../../store/sections";

import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { sectionPos } from "../../data";
import Skeleton from "react-loading-skeleton";
import "./style.css";

export default function UpdateSectionPodcasts({
  showEdit,
  setShowEdit,
  editPayload,
  loadSection,
}) {
  const [values, setValue] = useState();

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);

  const sectionData = useSelector(getSections);
  const { updateData, updateFailed, deleteData, updatePodData } =
    sectionData;

  const dispatch = useDispatch();

  const handleClose = () => {
    setShowEdit(false);
    loadSection();
    dispatch(resetData());
  };

  useEffect(() => {
    if (editPayload) {
      setValue({
        ...values,
        title: editPayload?.title,
        position: editPayload?.position,
        audAppSpecific: editPayload?.audAppSpecific,
        show: editPayload?.show
      });
    }
  }, [editPayload]);

  useEffect(() => {
    if (updateData) {
      //handle success here
      setAddSuccess(true);
    }
    if (updateFailed) {
      setAddFailure(true);
    }
    if (deleteData) {
      handleClose();
    }
  }, [updateData, updateFailed, deleteData]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetData());

    dispatch(
      updateSection({
        data: {
          title: values?.title,
          audAppSpecific: values?.audAppSpecific,
          show: values?.show
        },
        id: editPayload?._id,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteSection(editPayload?._id));
  };

  return (
    <Modal
      show={showEdit}
      onHide={() => {
        handleClose();
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Update Section</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addSuccess ? (
          <Alert show={addSuccess} variant="success">
            <Alert.Heading>SUCCESS</Alert.Heading>
            <p>Section updaded successfully</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={handleClose}
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
                          <Col xs={12}>
                            <div className="form-group">
                              <label>Title</label>
                              <input
                                name="title"
                                type="text"
                                value={values?.title}
                                maxLength={30}
                                className="form-control"
                                placeholder="episode title."
                                onChange={(e) => handleValue(e)}
                                required
                              />
                            </div>
                          </Col>
                          <Col xs={12} className="d-flex justify-content-start">
                            <div class="custom-control custom-checkbox d-flex align-items-center">
                              <input
                                checked={values?.show}
                                type="checkbox"
                                class="custom-control-input"
                                id="sectionStatus"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setValue({
                                      ...values,
                                      show: true,
                                    });
                                  } else {
                                    setValue({
                                      ...values,
                                      show: false,
                                    });
                                  }
                                }}
                              />
                              <label
                                class="custom-control-label mt-3 p-1"
                                htmlFor="sectionStatus"
                              >
                                Status <small className="tx-12">(Will show on the mobile if active)</small>
                              </label>
                            </div>
                          </Col>

                          <Col xs={12} className="d-flex justify-content-start">
                            <div class="custom-control custom-checkbox d-flex align-items-center">
                              <input
                                checked={values?.audAppSpecific}
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck1"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setValue({
                                      ...values,
                                      audAppSpecific: true,
                                    });
                                  } else {
                                    setValue({
                                      ...values,
                                      audAppSpecific: false,
                                    });
                                  }
                                }}
                              />
                              <label
                                class="custom-control-label mt-3 p-1"
                                htmlFor="customCheck1"
                              >
                                Audapp Specific?
                              </label>
                            </div>
                          </Col>
                        </Row>

                        
                       
                        <div className="d-flex justify-content-end mt-4">
                        

                          <Button variant="warning" type="submit">
                            <span className="button-label">
                              {sectionData?.creating ? (
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
