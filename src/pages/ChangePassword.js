import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, getAuthDetails, resetData } from "../store/auth";
import { saveState, loadState } from "../helpers/local_storage";
import PasswordGuide from "../helpers/password_guides";
import { isEmpty } from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
import { useHistory } from "react-router";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(getAuthDetails);
  const [values, setValue] = useState();
  const [type, setType] = useState({
    field_1: false,
    field_2: false,
    field_3: false,
  });

  const [err, setErr] = useState("");

  const [confirmPassword, setConfirm] = useState("");
  const { loading, details } = auth;

  useEffect(() => {
    if (!isEmpty(details)) {
      const data = { ...loadState(), user: details };
      saveState(data);
      window.location.reload();
    }
  }, [details]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newPassword } = values;
    if (confirmPassword === newPassword) {
      dispatch(changePassword(values));
    } else {
      setErr("Oops! The password does not match the confirm password field.");
    }
  };

  return (
    <>
      <div style={{ background: "white", height: "100%" }}>
        <div className="d-flex flex-row">
          <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex justify-content-center">
             
              <form onSubmit={handleSubmit} tyle={{ width: 450 }}>
                <div style={{ paddingTop: 100 }}>
                  <span className="title-auth">Change Password</span>
                  <div className="info-auth my-3" style={{ width: 450 }} />
                  {err && (
                    <div className="text-danger info-auth mb-3 mt-3">{err}</div>
                  )}

                  <div className="form-group">
                    <label>Existing Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={!type.field_1 ? "password" : "text"}
                        name="password"
                        className="form-control"
                        placeholder="Existing Password"
                        onChange={(e) => handleValue(e)}
                        value={values?.password}
                        required
                      />
                      <FontAwesomeIcon
                        icon={!type.field_1 ? faEye : faEyeSlash}
                        size="sm"
                        style={{
                          position: "absolute",
                          top: 15,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setType({ ...type, field_1: !type.field_1 })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>New Password</label>

                    <div style={{ position: "relative" }}>
                      <input
                        name="newPassword"
                        type={!type.field_2 ? "password" : "text"}
                        className="form-control"
                        placeholder="New Password"
                        onChange={(e) => handleValue(e)}
                        required
                        value={values?.newPassword}

                      />
                      <FontAwesomeIcon
                        icon={!type.field_2 ? faEye : faEyeSlash}
                        size="sm"
                        style={{
                          position: "absolute",
                          top: 15,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setType({ ...type, field_2: !type.field_2 })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={!type.field_3 ? "password" : "text"}
                        name="confirm_password"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        value={values?.confirm_password}

                      />
                      <FontAwesomeIcon
                        icon={!type.field_3 ? faEye : faEyeSlash}
                        size="sm"
                        style={{
                          position: "absolute",
                          top: 15,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setType({ ...type, field_3: !type.field_3 })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="warning"
                    style={{ width: "100%" }}
                    className="my-3"
                  >
                    {auth?.changingPwd ? (
                      <Spinner variant="primary" animation="border" size="sm" />
                    ) : (
                      <span
                        className="button-label"
                        style={{ fontSize: "16px" }}
                      >
                        Save Changes
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {auth?.changePwdSuccess && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => {
            dispatch(resetData());
          }}
          customButtons={
            <React.Fragment>
              <button
                className="pod-button"
                onClick={() => {
                    history.goBack()
                  dispatch(resetData());
                }}
              >
                Close
              </button>
            </React.Fragment>
          }
        >
          Password updated successfully
        </SweetAlert>
      )}

      {auth?.changePwdFailed && (
        <SweetAlert
          error
          title="Operation Failed!"
          onConfirm={() => {
            dispatch(resetData());
          }}
          customButtons={
            <React.Fragment>
              <button
                className="pod-button"
                onClick={() => {
                  dispatch(resetData());
                }}
              >
                Close
              </button>
            </React.Fragment>
          }
        >
          {auth?.changePwdFailed}
        </SweetAlert>
      )}
    </>
  );
}
