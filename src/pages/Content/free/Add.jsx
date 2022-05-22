import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
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
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getrole, getroleDetails } from "../../../store/roles";
import { createUsers, getUsers, resetCreation, resetData } from "../../../store/users";
import { contents, getCategories, resetUpdateData } from "../../../store/content";
import { difficultyLevels } from "../misc";


const animatedComponents = makeAnimated();

export default function Add({ showAdd, setShowAdd, load, popRoleAdd, progressValue, setProgressValue }) {
  const [values, setValue] = useState();

  const allRoles = useSelector(getroleDetails);
  const content = useSelector(contents);

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();


  const dispatch = useDispatch();
  const { creating, createData, createFailed, categories } = content;

  console.log(categories)

  const getAllCategories = () => {
    dispatch(getCategories());
  }


  useEffect(() => {
    getAllCategories()
  }, [])

  useEffect(() => {
    if (progressValue) setValue(progressValue);
  }, [progressValue])


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

    if (validateInput()) handleCreate();
  };

  const handleCreate = () => {
    const rolesToSubmit = values?.role_Id
      .map(r => r?.value)

    delete values.role_Id

    dispatch(
      createUsers({
        data: { ...values, roles: rolesToSubmit },
      })
    );
  };

  const validateInput = () => {
    dispatch(resetData());

    if (!values?.category) {
      setErrors({ ...errors, category: "Choose a category" });
      return false;
    }

    if (!values?.difficultyLevel) {
      setErrors({ ...errors, difficultyLevel: "Choose a category" });
      return false;
    }

    return true;
  };

  const closeModal = () => {
    setShowAdd(false);
    setProgressValue(null);
    load();
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
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', color: 'Black', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Upload Questions</Container>
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
                    {createFailed && (
                      <Alert variant="danger">{createFailed}</Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                      <Row>
                        {/* <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Round Type<span style={{ color: "red" }}>*</span></label>
                            <select className="form-control pod-input" value={values?.roundType}>
                              <option value="">Please select a round type</option>
                              <option value="normal">Normal Round</option>
                              <option value="special">Special Round</option>
                            </select>
                            {errors?.roundType && (
                              <div className="text-danger px-3">
                                {errors?.roundType}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Select Round<span style={{ color: "red" }}>*</span></label>
                            <select className="form-control pod-input" values={values?.round}>
                              <option value="">Please select a round</option>
                              <option value="round_one">Round One</option>
                              <option value="round_two">Round Two</option>
                              <option value="round_three">Round Three</option>
                              <option value="round_four">Round Four</option>
                              <option value="round_five">Round Five</option>
                            </select>
                            {errors?.round && (
                              <div className="text-danger px-3">
                                {errors?.round}
                              </div>
                            )}
                          </div>
                        </Col> */}
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Select Difficulty level<span style={{ color: "red" }}>*</span></label>
                            <select className="form-control pod-input" value={values?.difficultyLevel}>
                              <option value="">Choose a difficulty level</option>
                              <option value={difficultyLevels.EASY}>Easy</option>
                              <option value={difficultyLevels.NORMAL}>Normal</option>
                              <option value={difficultyLevels.HARD}>Hard</option>
                              <option value={difficultyLevels.VERY_HARD}>Very Hard</option>
                            </select>
                            {errors?.difficultyLevel && (
                              <div className="text-danger px-3">
                                {errors?.difficultyLevel}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Select File<span style={{ color: "red" }}>*</span></label>
                            <input
                              name="file"
                              type="file"
                              className="form-control pod-input"
                              onChange={(e) => handleValue(e)}
                              value={values?.file}
                            />
                            {errors?.file && (
                              <div className="text-danger px-3">
                                {errors?.file}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Select Category<span style={{ color: "red" }}>*</span></label>
                            <select className="form-control pod-input" value={values?.category}>
                              <option value="">Choose a category</option>
                              {categories?.map((c, i) => {
                                return <option key={i} value={c?.id}>{c?.name}</option>
                              })}
                            </select>
                            {errors?.category && (
                              <div className="text-danger px-3">
                                {errors?.category}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="dark" type="submit">
                          <span className="button-label">
                            {creating ? (
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
