import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSection, getSections, resetData } from "../../store/sections";

import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { sectionPos } from "../../data";
import { useSelector } from "react-redux";

export default function AddSection({ showAdd, setShowAdd, loadSection }) {
  const [values, setValue] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);

  const sectionData = useSelector(getSections);
  const { createData, createFailed } = sectionData;

  useEffect(() => {
    setValue({
      ...values,
      audAppSpecific: false,
    });
  }, []);

  const dispatch = useDispatch();

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
    dispatch(resetData())
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetData())
    setIsSubmitting(() => true);

    dispatch(
      createSection({
        data: {
          title: values.title,
          position: values.position,
          audAppSpecific: values.audAppSpecific,
        },
      })
    );
  };

  const closeModal = () => {
    setShowAdd(false);
    loadSection();
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
          <Container>Create Section</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addSuccess ? (
          <>
            <Alert show={addSuccess} variant="success">
              <Alert.Heading>SUCCESS</Alert.Heading>
              <p>Section added successfully</p>
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
                    <Card style={{ padding: "1rem" }}>
                      {createFailed && (
                        <Alert variant="danger">{createFailed}</Alert>
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
                                className="form-control"
                                placeholder="episode title."
                                onChange={(e) => handleValue(e)}
                                required
                              />
                            </div>
                          </Col>
                          <Col xs={12} md={6}>
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
                                  <option key={id} value={data.value}>
                                    {data.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>

                          <Col xs={12} md={6}>
                            <div class="custom-checkbox1">
                              <input
                                name="audAppSpecific"
                                type="checkbox"
                                value="NO"
                                id="audAppSpecific"
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
                              <label for="audAppSpecific">
                                Audapp Specific?
                              </label>
                            </div>
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-end">
                          <Button variant="warning" type="submit">
                            <span className="button-label">
                              {sectionData?.creating ? (
                                <Spinner variant="secondary" />
                              ) : (
                                "Save"
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
