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
import { getCustomers, getOneCustomer, resetEdit, update, } from "../../store/customers";


export default function EditCustomer({ showEdit, setShowEdit, load, editPayload }) {
  const [values, setValue] = useState();
  const customers = useSelector(getCustomers);

  //success and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();


  const dispatch = useDispatch();
  const { updating, updateSuccess, updateFailed, fetchOneData, loadingOne, fetchOneFailed } = customers;

  // get all users
  const getCustomerFn = d => {
    dispatch(getOneCustomer(d));
  }

  // reset update 
  const reset = () => {
    dispatch(resetEdit())
  }

  // fetch user with id provided
  useEffect(() => {
    getCustomerFn(editPayload)
    reset()
  }, [editPayload])

  useEffect(() => {
    if (fetchOneData) setValue({ ...fetchOneData });
  }, [fetchOneData])


  // after update, show if successful or failed
  useEffect(() => {
    if (updateSuccess) {
      setAddSuccess(true);
    }
    if (updateFailed) {
      setAddFailure(true);
    }
  }, [updateSuccess, updateFailed]);

  // update value of input
  const handleValue = e => {
    setErrors();
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  // function executed on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) handleCreate();
  };

  const handleCreate = () => {
    dispatch(
      update({
        data: { ...values, id: editPayload.id },
      })
    );
  };

  // validate input
  const validateInput = () => {

    if (!values?.email) {
      setErrors({ ...errors, email: "Please enter an email address" });
      return false;
    }
    if (!values?.firstName) {
      setErrors({ ...errors, firstName: "Please enter first name" });
      return false;
    }
    if (!values?.lastName) {
      setErrors({ ...errors, lastName: "Please enter lastName" });
      return false;
    }
    if (!values?.hint) {
      setErrors({ ...errors, hint: "Please enter hint" });
      return false;
    }
    if (!values?.coin) {
      setErrors({ ...errors, coint: "Please enter coin" });
      return false;
    }
    if (!values?.correctDuo) {
      setErrors({ ...errors, email: "Please enter correct duo" });
      return false;
    }
    if (!values?.cashBalance) {
      setErrors({ ...errors, cashBalance: "Please enter a cash balance" });
      return false;
    }
    if (!values?.cashSymbol) {
      setErrors({ ...errors, cashSymbol: "Please enter cash symbol" });
      return false;
    }
    if (!values?.rounds) {
      setErrors({ ...errors, rounds: "Please enter rounds" });
      return false;
    }
    if (!values?.questionCancel) {
      setErrors({ ...errors, questionCancel: "Please enter questions cancelled" });
      return false;
    }
    if (!values?.questionPass) {
      setErrors({ ...errors, questionPass: "Please enter questions passed" });
      return false;
    }
    if (!values?.points) {
      setErrors({ ...errors, points: "Please enter points" });
      return false;
    }
    if (!values?.imageLink) {
      setErrors({ ...errors, imageLink: "Please enter link" });
      return false;
    }
    if (!values?.currentGamePoints) {
      setErrors({ ...errors, currentGamePoints: "Please enter current game points" });
      return false;
    }
    if (!values?.currentGems) {
      setErrors({ ...errors, currentGems: "Please enter current gems" });
      return false;
    }

    if (!values?.phone) {
      setErrors({ ...errors, phone: "Please enter a phone number" });
      return false;
    }


    return true;
  };

  // function to execute when modal is closed.
  const closeModal = () => {
    setShowEdit(false);
    load();
    reset();
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
          <Container>Edit Customer Details</Container>
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
        ) : loadingOne ? (<>
          <Alert show={addSuccess} variant="success">
            <Alert.Heading>Loading</Alert.Heading>
            <p>Fetching customer details... Please wait.</p>
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
        </>)
          : fetchOneFailed ? (<>
            <Alert show={addSuccess} variant="success">
              <Alert.Heading>Sorry!</Alert.Heading>
              <p>Something went wrong... Try again.</p>
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
          </>) : (
            <>
              <div className="p-4">
                <Container>
                  <Row>
                    <Col xs={12}>
                      {updateFailed && (
                        <><Alert variant="danger">Something went wrong... Try again</Alert></>
                      )}
                      <form onSubmit={handleSubmit}>
                        <Row>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Email</label>
                              <input
                                name="email"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Email"
                                onChange={(e) => handleValue(e)}
                                value={values?.email}
                              />
                              {errors?.email && (
                                <div className="text-danger px-3">
                                  {errors?.email}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Username</label>
                              <input
                                name="userName"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Username"
                                onChange={(e) => handleValue(e)}
                                value={values?.userName}
                              />
                              {errors?.userName && (
                                <div className="text-danger px-3">
                                  {errors?.userName}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">First name</label>
                              <input
                                name="firstName"
                                type="text"
                                className="form-control pod-input"
                                placeholder="First name"
                                onChange={(e) => handleValue(e)}
                                value={values?.firstName}
                              />
                              {errors?.firstName && (
                                <div className="text-danger px-3">
                                  {errors?.firstName}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Last name</label>
                              <input
                                name="lastName"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Last name"
                                onChange={(e) => handleValue(e)}
                                value={values?.lastName}
                              />
                              {errors?.lastName && (
                                <div className="text-danger px-3">
                                  {errors?.lastName}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Phone Number</label>
                              <input
                                name="phone"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Phone Number"
                                onChange={(e) => handleValue(e)}
                                value={values?.phone}
                              />
                              {errors?.phone && (
                                <div className="text-danger px-3">
                                  {errors?.phone}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Hint</label>
                              <input
                                name="hint"
                                type="text"
                                className="form-control pod-input"
                                placeholder="hint"
                                onChange={(e) => handleValue(e)}
                                value={values?.hint}
                              />
                              {errors?.firstName && (
                                <div className="text-danger px-3">
                                  {errors?.firstName}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Coin</label>
                              <input
                                name="coin"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Coin"
                                onChange={(e) => handleValue(e)}
                                value={values?.coin}
                              />
                              {errors?.coin && (
                                <div className="text-danger px-3">
                                  {errors?.coin}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Correct Duo</label>
                              <input
                                name="correctDuo"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Correct Duo"
                                onChange={(e) => handleValue(e)}
                                value={values?.correctDuo}
                              />
                              {errors?.correctDuo && (
                                <div className="text-danger px-3">
                                  {errors?.correctDuo}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Cash Balance</label>
                              <input
                                name="cashBalance"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Cash balance"
                                onChange={(e) => handleValue(e)}
                                value={values?.cashBalance}
                              />
                              {errors?.cashBalance && (
                                <div className="text-danger px-3">
                                  {errors?.cashBalance}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Cash Symbol</label>
                              <input
                                name="cashSymbol"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Cash Symbol"
                                onChange={(e) => handleValue(e)}
                                value={values?.cashSymbol}
                              />
                              {errors?.cashSymbol && (
                                <div className="text-danger px-3">
                                  {errors?.cashSymbol}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Rounds</label>
                              <input
                                name="rounds"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Rounds"
                                onChange={(e) => handleValue(e)}
                                value={values?.rounds}
                              />
                              {errors?.rounds && (
                                <div className="text-danger px-3">
                                  {errors?.rounds}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Question Cancel</label>
                              <input
                                name="questionCancel"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Questions Cancelled"
                                onChange={(e) => handleValue(e)}
                                value={values?.questionCancel}
                              />
                              {errors?.questionCancel && (
                                <div className="text-danger px-3">
                                  {errors?.questionCancel}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Question Pass</label>
                              <input
                                name="questionPass"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Questions passed"
                                onChange={(e) => handleValue(e)}
                                value={values?.questionPass}
                              />
                              {errors?.questionPass && (
                                <div className="text-danger px-3">
                                  {errors?.questionPass}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Points</label>
                              <input
                                name="rounds"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Last name"
                                onChange={(e) => handleValue(e)}
                                value={values?.points}
                              />
                              {errors?.points && (
                                <div className="text-danger px-3">
                                  {errors?.points}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Image Link</label>
                              <input
                                name="imageLink"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Image link"
                                onChange={(e) => handleValue(e)}
                                value={values?.imageLink}
                              />
                              {errors?.imageLink && (
                                <div className="text-danger px-3">
                                  {errors?.imageLink}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Current Game Points</label>
                              <input
                                name="currentGamePoints"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Current Game Points"
                                onChange={(e) => handleValue(e)}
                                value={values?.currentGamePoints}
                              />
                              {errors?.currentGamePoints && (
                                <div className="text-danger px-3">
                                  {errors?.currentGamePoints}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div className="form-group">
                              <label className="pod-label">Current Gems</label>
                              <input
                                name="currentGems"
                                type="text"
                                className="form-control pod-input"
                                placeholder="Current Gems"
                                onChange={(e) => handleValue(e)}
                                value={values?.currentGems}
                              />
                              {errors?.currentGems && (
                                <div className="text-danger px-3">
                                  {errors?.currentGems}
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end mt-4">
                          <Button variant="primary" type="submit">
                            <span className="button-label">
                              {updating ? (
                                <Spinner variant="secondary" />
                              ) : (
                                "Update customer details"
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
