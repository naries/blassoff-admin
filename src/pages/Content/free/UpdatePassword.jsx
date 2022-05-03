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
import { removeDuplicates } from "../../modules/removeArrDuplicates";
import { getrole, getroleDetails } from "../../store/roles";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changePwd, getOneUser, getUsers, resetEdit, resetPassword, update } from "../../store/users";


export default function UpdatePassword({ showChangePw, setShowChangePw, load, editPayload }) {
  const [values, setValue] = useState();

  const allRoles = useSelector(getroleDetails);
  const users = useSelector(getUsers);
  const [roles, setRoles] = useState([]);

  // toggle password visibility
  const [type, setType] = useState(false);


  //success and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();


  const dispatch = useDispatch();
  const { changingPw, changePwSuccess, changePwFailed } = users;

  // reset update 
  const reset = () => {
    dispatch(resetPassword())
  }

  // after update, show if successful or failed
  useEffect(() => {
    if (changePwSuccess) {
      setAddSuccess(true);
    }
    if (changePwFailed) {
      setAddFailure(true);
    }
  }, [changePwSuccess, changePwFailed]);

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
      changePwd({ password: values.password, id: editPayload.id })
    );
  };

  // validate input
  const validateInput = () => {
    if (!values?.password) {
      setErrors({ ...errors, password: "Enter a password" });
      return false;
    }

    if (values?.password !== values.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return false
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(values?.password)) {
      setErrors({ ...errors, password: "Password must contain at least 1 uppercase, 1 special character and a special character" })
      return false;
    }

    return true;
  };

  // function to execute when modal is closed.
  const closeModal = () => {
    setShowChangePw(false);
    load();
    reset();
  };


  return (
    <Modal
      show={showChangePw}
      onHide={() => {
        closeModal();
      }}
      size={addSuccess || addFailure ? "md" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', color: 'Black', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Change Password</Container>
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
                    {changePwFailed && (
                      <Alert variant="danger">{changePwFailed}</Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Enter new password</label>
                            <div style={{ position: "relative" }}>
                              <input
                                name="password"
                                type={!type ? "password" : "text"}
                                className="form-control pod-input"
                                placeholder="Password"
                                onChange={(e) => handleValue(e)}
                                required
                              />
                              <FontAwesomeIcon
                                icon={!type ? faEye : faEyeSlash}
                                size="sm"
                                style={{
                                  position: "absolute",
                                  top: 15,
                                  right: 10,
                                  cursor: "pointer",
                                }}
                                onClick={() => setType(!type)}
                              />
                            </div>
                            {errors?.password && (
                              <div className="text-danger px-3">
                                {errors?.password}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Confirm password</label>
                            <div style={{ position: "relative" }}>
                              <input
                                name="confirmPassword"
                                type={!type ? "password" : "text"}
                                className="form-control pod-input"
                                placeholder="Password"
                                onChange={(e) => handleValue(e)}
                                required
                              />
                              <FontAwesomeIcon
                                icon={!type ? faEye : faEyeSlash}
                                size="sm"
                                style={{
                                  position: "absolute",
                                  top: 15,
                                  right: 10,
                                  cursor: "pointer",
                                }}
                                onClick={() => setType(!type)}
                              />
                            </div>
                            {errors?.confirmPassword && (
                              <div className="text-danger px-3">
                                {errors?.confirmPassword}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="dark" type="submit">
                          <span className="button-label">
                            {changingPw ? (
                              <Spinner variant="secondary" />
                            ) : (
                              "Change Password"
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
