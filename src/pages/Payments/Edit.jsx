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
import { removeDuplicates } from "../../modules/removeArrDuplicates";
import { getrole, getroleDetails } from "../../store/roles";
import { getOneUser, getUsers, resetEdit, update } from "../../store/users";


const animatedComponents = makeAnimated();

export default function EditUser({ showEdit, setShowEdit, load, editPayload, popRoleAdd, progressValue, setProgressValue }) {
  const [values, setValue] = useState();

  const allRoles = useSelector(getroleDetails);
  const users = useSelector(getUsers);
  const [roles, setRoles] = useState([]);

  //success and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();


  const dispatch = useDispatch();
  const { updating, updateSuccess, updateFailed, fetchOneData } = users;

  // get all roles
  const getAllRoles = () => {
    dispatch(getrole());
  }

  // get all users
  const getuserFn = d => {
    dispatch(getOneUser(d));
  }

  // reset update 
  const reset = () => {
    dispatch(resetEdit())
  }

  // load roles on page load
  useEffect(() => {
    getAllRoles();
  }, [])

  // fetch user with id provided
  useEffect(() => {
    getuserFn(editPayload)
    reset()
  }, [editPayload])
  
  // reconstruct values when edit data and roles are loaded
  useEffect(() => {
    if(progressValue) {
      setValue(progressValue)
      return;
    }
    if (fetchOneData && allRoles) {
      let rolesx = fetchOneData?.userRoles.map(d => roles.filter(f => d.id === f.role_Id)[0]);
      console.log(rolesx);
      setValue({ ...fetchOneData, roles: rolesx })
    }
  }, [fetchOneData, allRoles, progressValue])

  // reorganize roles when loaded
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
    const rolesToSubmit = values?.roles
      .map(r => r?.value)

    delete values.roles
    console.log('HERE');

    dispatch(
      update({
        data: { ...values, roles: rolesToSubmit },
      })
    );
  };

  // validate input
  const validateInput = () => {

    if (!values?.email) {
      setErrors({ ...errors, email: "Please enter an email address" });
      return false;
    }

    if (!values?.phoneNumber) {
      setErrors({ ...errors, phoneNumber: "Please enter a phone number" });
      return false;
    }

    if (!values?.location) {
      setErrors({ ...errors, artwork: "Please enter a location" });
      return false;
    }

    if (!values?.roles) {
      setErrors({
        ...errors,
        roles: "Please select at least one role",
      });
      return false;
    }

    return true;
  };

  // function to execute when modal is closed.
  const closeModal = () => {
    setShowEdit(false);
    setProgressValue(null);
    load();
    reset();
  };


  return (
    <Modal
      show={showEdit}
      onHide={() => {
        closeModal();
      }}
      size={addSuccess || addFailure ? "md" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', color: 'Black', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Edit User</Container>
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
                    {updateFailed && (
                      <Alert variant="danger">{updateFailed}</Alert>
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
                              name="phoneNumber"
                              type="text"
                              className="form-control pod-input"
                              placeholder="Phone Number"
                              onChange={(e) => handleValue(e)}
                              value={values?.phoneNumber}
                            />
                            {errors?.phoneNumber && (
                              <div className="text-danger px-3">
                                {errors?.phoneNumber}
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
                              defaultValue={values?.roles}
                              value={values?.roles}
                              onChange={(value) => {
                                setValue({
                                  ...values,
                                  roles: value,
                                });
                              }}
                            />

                            <div className="text-right">
                              <Button variant="link" onClick={() => {
                                setProgressValue(values);
                                popRoleAdd()
                              }}>
                                <span className="button-label">
                                  + Create Role
                                </span>
                              </Button>
                            </div>
                            {errors?.roles && (
                              <div className="text-danger px-3">
                                {errors?.roles}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="dark" type="submit">
                          <span className="button-label">
                            {updating ? (
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
