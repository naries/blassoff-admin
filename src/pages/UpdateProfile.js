import React, { useState, useEffect, useMemo } from "react";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getAuthDetails, resetData, viewUser } from "../store/auth";
import { saveState, loadState } from "../helpers/local_storage";
import { ToastContainer, toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import { isEmpty } from "lodash";
import { countries, getAllStates, getStates } from "../helpers/countries";
import PhoneInput from "react-phone-input-2";

let formData = new FormData();

export default function UpdateProfile() {
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
    country,
    state,
    mobile,
    username,
    _id: authUserId,
  } = userData?.user;
  const [states, setStates] = useState([]);

  const { loading, details, updating } = auth;

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
      username,
    });

    //get user details
    dispatch(viewUser({ authUserId }));
    let allStates = getAllStates();
    setStates(allStates);
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
        ...userData,
        user: {
          ...auth?.updateData,
        },
      };
      saveState(data);
      setShowSuccess(true);

      //set the details back to localstorage
    }

    if (auth.updateFailed) {
      setShowFailure(true);
    }
  }, [auth]);

  const handleValue = (e) => {
    setErrors({ ...errors, [e.target.name]: undefined });
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    if (!values?.firstname) {
      setErrors({ ...errors, firstname: "Please enter firstname" });
      return false;
    }

    if (!values?.lastname) {
      setErrors({ ...errors, lastname: "Please enter lastname" });
      return false;
    }

    if (!values?.mobile) {
      setErrors({ ...errors, mobile: "Please enter mobile" });
      return false;
    } else {
      const validNum = /^\d+$/.test(values.mobile);
      if (!validNum) {
        setErrors({ ...errors, mobile: "mobile must be a number" });
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (values?.country) {
      let countryStates = getStates(values?.country);
      setStates(countryStates);
    }
  }, [values?.country]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate the inputs
    if (validateInput()) {
      dispatch(updateUser({ ...values }));
    }
  };

  return (
    <div style={{ background: "white", height: "100%" }}>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex justify-content-center">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="pod-form">
              <div style={{ paddingTop: 40 }}>
                <span className="title-auth">Update Your Account</span>
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
                        onChange={(e) => handleValue(e)}
                        defaultValue={userData?.user?.firstname}
                      />
                      {errors?.firstname && (
                        <div className="text-danger px-3">
                          {errors?.firstname}
                        </div>
                      )}
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
                        onChange={(e) => handleValue(e)}
                        defaultValue={userData?.user?.lastname}
                      />
                      {errors?.lastname && (
                        <div className="text-danger px-3">
                          {errors?.lastname}
                        </div>
                      )}
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
                        onChange={(e) => handleValue(e)}
                        defaultValue={userData?.user?.username}
                      />
                      {errors?.username && (
                        <div className="text-danger px-3">
                          {errors?.username}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>mobile</label>

                      <PhoneInput
                        country={"ng"}
                        countryCodeEditable={false}
                        value={values?.mobile}
                        inputClass="form-control pod-input w-100"
                        onChange={(mobile) => {
                          setValue({
                            ...values,
                            mobile,
                          });
                        }}
                      />
                      {errors?.mobile && (
                        <div className="text-danger px-3">{errors?.mobile}</div>
                      )}
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
                        onChange={(e) => handleValue(e)}
                        defaultValue={userData?.user?.email}
                        disabled={userData?.user?.email !== "creator@clairvoyant.com.ng"}
                      />
                      {errors?.email && (
                        <div className="text-danger px-3">{errors?.email}</div>
                      )}
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
                      >
                        <option>Choose a Country</option>
                        {countries.map((data, id) => (
                          <option
                            selected={data?.name === userData?.user?.country}
                            key={id}
                          >
                            {data?.name}
                          </option>
                        ))}
                      </select>
                      {errors?.country && (
                        <div className="text-danger px-3">
                          {errors?.country}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>State</label>
                      <select
                        className="form-control pod-input"
                        name="state"
                        onChange={(e) => handleValue(e)}
                        value={values?.state || userData?.state}
                      >
                        <option value="">Choose a State</option>
                        {states.map((data, id) => (
                          <option selected={values?.state} key={id}>
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
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    variant="warning"
                    disabled={isEmpty(values) || loading}
                    className="my-3 pod-button"
                  >
                    {updating ? (
                      <Spinner variant="primary" animation="border" size="sm" />
                      ) : (
                      <span
                        className="button-label"
                        style={{ fontSize: "16px" }}
                      >
                        Update Account
                      </span>
                    )}
                  </Button>
                </div>
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
