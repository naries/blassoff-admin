import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAuthDetails, resetData, viewUser } from "../store/auth";
import { saveState, loadState } from "../helpers/local_storage";
import { ToastContainer, toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import { isEmpty } from "lodash";
import { countries, getStates } from "../helpers/countries";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const auth = useSelector(getAuthDetails);
  const [values, setValue] = useState();
  const [errors, setErrors] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const userData = loadState();
  const {
    firstname,
    lastname,
    state,
    _id: authUserId,
    country,
    mobile,
  } = userData?.user;
  const [states, setStates] = useState([]);

  const { loading, details } = auth;

  useEffect(() => {
    //remove any toasts if exist
    toast.dismiss();

    //initialize form values
    setValue({
      ...values,
      firstname,
      lastname,
      state,
      country,
      mobile,
    });

    //get user details
    dispatch(viewUser({ authUserId }));
  }, []);

  useEffect(() => {
    if (!isEmpty(details)) {
      const data = { ...loadState(), user: details };
      saveState(data);
      window.location.reload();
    }
  }, [details]);

  useEffect(() => {
    if (auth?.updateData) {
      const data = {
        ...loadState(),
        user: {
          ...userData?.user,
          firstname: values?.firstname,
          lastname: values?.lastname,
        },
      };
      saveState(data);
      setShowSuccess(true);
    }

    if (auth.updateFailed) {
      setShowFailure(true);
    }
  }, [auth]);

  const handleValue = (e) => {
    setErrors({ ...errors, [e.target.name]: undefined });
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (values?.country) {
      let countryStates = getStates(values?.country);
      setStates(countryStates);
    }
  }, [values?.country]);

  return (
    <div style={{ background: "white", height: "100%" }}>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex justify-content-center">
            <ToastContainer />
            <form className="pod-form">
              <div style={{ paddingTop: 40 }}>
                <span className="title-auth">Account Details</span>
                <div className="info-auth mb-5 mt-1" style={{ width: 600 }} />
                <Row>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        value={values?.firstname}
                        name="firstname"
                        type="text"
                        minLength={2}
                        className="form-control pod-input"
                        placeholder="First Name"
                        defaultValue={userData?.user?.firstname}
                        disabled
                      />
                    </div>
                  </Col>

                  <Col xs={12}>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        value={values?.lastname}
                        name="lastname"
                        type="text"
                        minLength={2}
                        className="form-control pod-input"
                        placeholder="Last Name"
                        defaultValue={userData?.user?.lastname}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        value={values?.username}
                        name="username"
                        type="text"
                        minLength={2}
                        className="form-control pod-input"
                        placeholder="Username"
                        defaultValue={userData?.user?.username}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        value={values?.mobile}
                        name="phone"
                        type="number"
                        minLength={2}
                        maxLength={13}
                        className="form-control pod-input"
                        placeholder="Phone.."
                        defaultValue={userData?.user?.mobile}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={values?.email}
                        name="email"
                        type="email"
                        className="form-control pod-input"
                        placeholder="Email.."
                        defaultValue={userData?.user?.email}
                        disabled
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        className="form-control pod-input"
                        name="country"
                        onChange={(e) => handleValue(e)}
                        value={values && values.country}
                        disabled
                      >
                        <option>&nbsp;</option>
                        {countries.map((data, id) => (
                          <option
                            selected={data === userData?.user?.country}
                            key={id}
                          >
                            {data?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>State</label>
                      <select
                        className="form-control pod-input"
                        name="state"
                        onChange={(e) => handleValue(e)}
                        value={values && values.state}
                        disabled
                      >
                        <option>&nbsp;</option>
                        {states.map((data, id) => (
                          <option
                            selected={data === userData?.user?.state}
                            key={id}
                          >
                            {data?.name}
                          </option>
                        ))}
                      </select>
                      {errors?.state && (
                        <div className="text-danger px-3">{errors?.state}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSuccess && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => {
            dispatch(resetData());
            setShowSuccess(false);
          }}
          customButtons={
            <React.Fragment>
              <button
                className="pod-button"
                onClick={() => {
                  dispatch(resetData());
                  setShowSuccess(false);
                }}
              >
                Close
              </button>
            </React.Fragment>
          }
        >
          Profile updated successfully
        </SweetAlert>
      )}

      {showFailure && (
        <SweetAlert
          error
          title="Operation Failed!"
          onConfirm={() => {
            setShowFailure(false);
            dispatch(resetData());
          }}
          customButtons={
            <React.Fragment>
              <button
                className="pod-button"
                onClick={() => {
                  setShowFailure(false);
                  dispatch(resetData());
                }}
              >
                Close
              </button>
            </React.Fragment>
          }
        >
          {auth?.updateFailed}
        </SweetAlert>
      )}
    </div>
  );
}
