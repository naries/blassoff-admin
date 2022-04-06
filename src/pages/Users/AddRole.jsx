import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { createRole, getrole, getroleDetails, resetData } from "../../store/roles";


const animatedComponents = makeAnimated();

export default function AddRole({ showAddRole, setShowAddRole, load, closeShowAddRole }) {
  const [values, setValue] = useState();
  const [roles, setRoles] = useState([]);

  // succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();

  // selectors
  const allRoles = useSelector(getroleDetails);

  const dispatch = useDispatch();
  const { creating, created, createFailed } = allRoles;

  const getAllRoles = () => {
    dispatch(getrole());
  }

  const reset = () => {
    dispatch(resetData())
  }

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    if (created) {
      setAddSuccess(true);
    }
    if (createFailed) {
      setAddFailure(true);
    }
  }, [created, createFailed]);

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
    dispatch(
      createRole({...values})
    );
  };

  const validateInput = () => {
    dispatch(resetData());

    if (!values?.roleName) {
      setErrors({ ...errors, roleName: "Please enter a role" });
      return false;
    }

    if (values?.roleName.length <= 3) {
      setErrors({ ...errors, roleName: "Role name should be more than 3 characters" });
      return false;
    }

    return true;
  };

  const closeModal = () => {
    closeShowAddRole();
    reset();
  };


  return (
    <Modal
      show={showAddRole}
      onHide={() => {
        closeModal();
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', color: 'Black', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Create Role</Container>
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
                            <label className="pod-label">Role name</label>
                            <input
                              name="roleName"
                              type="text"
                              className="form-control pod-input"
                              placeholder="role"
                              onChange={(e) => handleValue(e)}
                              value={values?.roleName}
                            />
                            {errors?.roleName && (
                              <div className="text-danger px-3">
                                {errors?.roleName}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="primary" type="submit">
                          <span className="button-label">
                            {creating ? (
                              <Spinner variant="secondary" />
                            ) : (
                              "Add Role"
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
