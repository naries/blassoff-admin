import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import makeAnimated from "react-select/animated";
import { removeDuplicates } from "../../modules/removeArrDuplicates";
import { getCustomers, resetCustomerBySearch, resetEdit } from "../../store/customers";


const animatedComponents = makeAnimated();

export default function EditCustomer({ showEdit, setShowEdit, editPayload }) {
  const customerData = useSelector(getCustomers);  
  const { updating, updateSuccess, updateFailed } = customerData;
  
  const [values, setValue] = useState();
  //success and failure
  const [success, setAddSuccess] = useState(false);
  const [failure, setAddFailure] = useState(false);
  const [errors, setErrors] = useState();


  const dispatch = useDispatch();

  // fetch user with id provided
  useEffect(() => {
  }, [editPayload])

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
    // dispatch(
    //   update({
    //     data: { ...values },
    //   })
    // );
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

    return true;
  };

  // function to execute when modal is closed.
  const closeModal = () => {
    setShowEdit(false);
    resetEdit();
    resetCustomerBySearch();
  };


  return (
    <Modal
      show={showEdit}
      onHide={() => {
        closeModal();
      }}
      size={success || failure ? "md" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', color: 'Black', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>Edit Customer</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <>
            <Alert show={success} variant="success">
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
                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="primary" type="submit">
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
