import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { contents, resetUpdateData, updateLiveQuestion } from "../../../store/content";


const animatedComponents = makeAnimated();

export default function EditUser({ showEdit, setShowEdit, load, editPayload }) {
  const [values, setValue] = useState();
  const contentsData = useSelector(contents);
  const [roles, setRoles] = useState([]);

  //success and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();


  const dispatch = useDispatch();
  const { updatingLive, updateLiveSuccess, updateLiveFailed } = contentsData;

  const reset = () => {
    dispatch(resetUpdateData())
  }

  // fetch user with id provided
  useEffect(() => {
    reset();
    setValue(editPayload);
  }, [])

  // after update, show if successful or failed
  useEffect(() => {
    if (updateLiveSuccess) {
      setAddSuccess(true);
    }
    if (updateLiveFailed) {
      setAddFailure(true);
    }
  }, [updateLiveSuccess, updateLiveFailed]);

  // update value of input
  const handleValue = e => {
    setErrors();
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  // function executed on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetUpdateData());
    if (validateInput()) handleCreate();
  };

  const handleCreate = () => {
    dispatch(
      updateLiveQuestion({
        data: { ...values },
      })
    );
  };

  // validate input
  const validateInput = () => {

    if (!values?.quizQuestion) {
      setErrors({ ...errors, quizQuestion: "Enter a quiz question" });
      return false;
    }
    if (!values?.quizQuestion) {
      setErrors({ ...errors, quizQuestion: "Enter a quiz question" });
      return false;
    }

    if (!values?.optionA) {
      setErrors({ ...errors, optionA: "Enter this option" });
      return false;
    }

    if (!values?.optionB) {
      setErrors({ ...errors, optionB: "Enter this option" });
      return false;
    }

    if (!values?.optionC) {
      setErrors({ ...errors, optionC: "Enter this option" });
      return false;
    }

    if (!values?.optionD) {
      setErrors({ ...errors, optionD: "Enter this option" });
      return false;
    }

    if (!values?.answer) {
      setErrors({ ...errors, optionD: "Please enter an answer" });
      return false;
    }

    if (!values?.questionHint) {
      setErrors({ ...errors, questionHint: "enter a hint" });
      return false;
    }

    return true;
  };

  // function to execute when modal is closed.
  const closeModal = () => {
    setShowEdit(false);
    reset();
    load();
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
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', color: 'Black', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Edit Question</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addSuccess ? (
          <>
            <Alert show={addSuccess} variant="success">
              <Alert.Heading>SUCCESS</Alert.Heading>
              <p>successfull</p>
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
                    {updateLiveFailed && (
                      <Alert variant="danger">Something went wrong. Try again!</Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Question</label>
                            <input
                              name="quizQuestion"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Quiz Question"
                              onChange={(e) => handleValue(e)}
                              value={values?.quizQuestion}
                            />
                            {errors?.quizQuestion && (
                              <div className="text-danger px-3">
                                {errors?.quizQuestion}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Option A</label>
                            <input
                              name="optionA"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Option A"
                              onChange={(e) => handleValue(e)}
                              value={values?.optionA}
                            />
                            {errors?.optionA && (
                              <div className="text-danger px-3">
                                {errors?.optionA}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Option B</label>
                            <input
                              name="optionB"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Option B"
                              onChange={(e) => handleValue(e)}
                              value={values?.optionB}
                            />
                            {errors?.optionB && (
                              <div className="text-danger px-3">
                                {errors?.optionB}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Option C</label>
                            <input
                              name="optionC"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Option C"
                              onChange={(e) => handleValue(e)}
                              value={values?.optionC}
                            />
                            {errors?.optionC && (
                              <div className="text-danger px-3">
                                {errors?.optionC}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Option D</label>
                            <input
                              name="optionD"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Option D"
                              onChange={(e) => handleValue(e)}
                              value={values?.optionD}
                            />
                            {errors?.optionD && (
                              <div className="text-danger px-3">
                                {errors?.optionD}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Answer</label>
                            <select
                              name="answer"
                              // type="text"
                              className="form-control pod-input"
                              placeholder="Answer"
                              onChange={(e) => handleValue(e)}
                              value={values?.answer}
                            >
                              <option value={values?.optionA}>{values?.optionA}</option>
                              <option value={values?.optionB}>{values?.optionB}</option>
                              <option value={values?.optionC}>{values?.optionC}</option>
                              <option value={values?.optionD}>{values?.optionD}</option>
                            </select>
                            {errors?.answer && (
                              <div className="text-danger px-3">
                                {errors?.answer}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Hint</label>
                            <input
                              name="questionHint"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Question Hint"
                              onChange={(e) => handleValue(e)}
                              value={values?.questionHint}
                            />
                            {errors?.questionHint && (
                              <div className="text-danger px-3">
                                {errors?.questionHint}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="dark" type="submit">
                          <span className="button-label">
                            {updatingLive ? (
                              <Spinner variant="secondary" />
                            ) : (
                              "Update"
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
