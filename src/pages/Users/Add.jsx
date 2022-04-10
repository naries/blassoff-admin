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
import { removeDuplicates } from "../../modules/removeArrDuplicates";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getrole, getroleDetails } from "../../store/roles";
import { createUsers, getUsers, resetCreation } from "../../store/users";


const animatedComponents = makeAnimated();

export default function AddUser({ showAdd, setShowAdd, load, popRoleAdd, progressValue, setProgressValue }) {
  const [values, setValue] = useState();

  const allRoles = useSelector(getroleDetails);
  const users = useSelector(getUsers);
  const [roles, setRoles] = useState([]);

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();
  const [type, setType] = useState(false);


  const dispatch = useDispatch();
  const { creating, createData, createFailed } = users;

  const getAllRoles = () => {
    dispatch(getrole());
  }

  const reset = () => {
    dispatch(resetCreation())
  }

  useEffect(() => {
    getAllRoles()
    reset()
  }, [])

  useEffect(() => {
    if (progressValue) setValue(progressValue);
  }, [progressValue])


  useEffect(() => {
    if (allRoles?.data?.length) {
      let filteredroles = removeDuplicates(
        allRoles?.data,
        "roleName"
      );

      const roles = filteredroles.map((r) => {
        return {
          label: r?.roleName,
          value: r?.id,
          role_Id: r?.id,
        };
      });

      setRoles(roles);
    }
  }, [allRoles?.data]);

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

    if (!values?.email) {
      setErrors({ ...errors, email: "Please enter an email address" });
      return false;
    }

    if (!values?.phonenumber) {
      setErrors({ ...errors, phonenumber: "Please enter a phone number" });
      return false;
    }

    if (!values?.password) {
      setErrors({ ...errors, password: "Enter a password" });
      return false;
    } else {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(values?.password)) {
        setErrors({ ...errors, password: "Password must contain at least 1 uppercase, 1 special character and a special character" })
        return false;
      }
    }

    if (!values?.location) {
      setErrors({ ...errors, artwork: "Please enter a location" });
      return false;
    }

    if (!values?.role_Id) {
      setErrors({
        ...errors,
        role_id: "Please select at least one role",
      });
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
          <Container>Create User</Container>
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
                        <Col xs={12}>
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
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Phone Number</label>
                            <input
                              name="phonenumber"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Phone Number"
                              onChange={(e) => handleValue(e)}
                              value={values?.phonenumber}
                            />
                            {errors?.phonenumber && (
                              <div className="text-danger px-3">
                                {errors?.phonenumber}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Password</label>
                            <div style={{ position: "relative" }}>
                              <input
                                name="password"
                                type={!type ? "password" : "text"}
                                className="form-control pod-input"
                                placeholder="password"
                                onChange={(e) => handleValue(e)}
                                value={values?.password}
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
                            <label className="pod-label">Location</label>
                            <input
                              name="location"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Location"
                              onChange={(e) => handleValue(e)}
                              value={values?.location}
                            />
                            {errors?.location && (
                              <div className="text-danger px-3">
                                {errors?.location}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Roles</label>
                            <Select
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              options={roles}
                              defaultValue={values?.role_Id}
                              value={values?.role_Id}
                              onChange={(value) => {
                                setValue({
                                  ...values,
                                  role_Id: value,
                                });
                              }}
                            />

                            {errors?.role_Id && (
                              <div className="text-danger px-3">
                                {errors?.role_Id}
                              </div>
                            )}
                            <div className="text-right">
                              <Button className="btn btn-small" variant="link" onClick={() => {
                                setProgressValue(values);
                                popRoleAdd()
                              }}>
                                <span className="button-label">
                                  + Create Role
                                </span>
                              </Button>
                            </div>

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
