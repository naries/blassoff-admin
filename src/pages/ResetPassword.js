import React, { useState, useEffect } from "react";
import Bg from "../assets/svg/signup-bg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PasswordGuide from "../helpers/password_guides";
import { resetUserPassword, getAuthDetails, resetData } from "../store/auth";
import { ToastContainer, toast } from "react-toastify";
import { saveState } from "../helpers/local_storage";
import SweetAlert from "react-bootstrap-sweetalert";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(getAuthDetails);
  const [type, setType] = useState(false);
  const [values, setValue] = useState();
  const [confirmPassword, setConfirm] = useState("");

  const { loading, details, lastFetch } = auth;

  useEffect(() => {
    saveState({ ...details, lastFetch });
  }, [auth, details, lastFetch]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password } = values;

    if (confirmPassword === password) {
      dispatch(
        resetUserPassword({
          data: {
            password,
            userId: details && details.userId,
          },
          token: details && details.token,
        })
      );
    } else {
      toast.error(
        "Oops! The provided passwords do not match the confirmed password."
      );
    }
  };

  return (
    <>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column flex-grow-1 page-container">
          <div className="d-flex justify-content-center ">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
              <div style={{ paddingTop: 100 }}>
                <span className="title-auth">Forgot Password</span>
                <div className="info-auth mb-3 mt-1" style={{ width: 450 }}>
                  Forgotten your password? Enter your email address below to
                  begin the reset process.
                </div>
                <div className="form-group">
                  <label>Create Password</label>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={PasswordGuide(
                      "Password must contain an uppercase letter, a lowercase letter, a special character, a number and must have a minimum length of 8."
                    )}
                  >
                    <div style={{ position: "relative" }}>
                      <input
                        name="password"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+!@#\\$%\\^&\\*\\._\\-\\\\/()])(.{8,})$"
                        type={!type ? "password" : "text"}
                        className="form-control"
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
                  </OverlayTrigger>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={!type ? "password" : "text"}
                      name="newPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirm(e.target.value)}
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
                </div>
                <Button
                  type="submit"
                  variant="warning"
                  style={{ width: "100%" }}
                  disabled={loading}
                  className="my-3"
                >
                  <span className="button-label" style={{ fontSize: "16px" }}>
                    Submit
                  </span>
                </Button>
                <div className="mb-2">
                  <span className="link-switch">
                    By signing up, you agree to our
                    <Link to="/terms" className="link-auth">
                      Terms of Service
                    </Link>
                    and
                    <Link to="/" className="link-auth">
                      Privacy Policy.
                    </Link>
                  </span>
                </div>
                <span className="link-switch">
                  Already have an account?
                  <Link to="/" className="link-auth">
                    Log in
                  </Link>
                </span>
              </div>
            </form>
          </div>

          <div
            className="d-flex justify-content footer"
            style={{ marginTop: "auto" }}
          >
            <div className="copyright">© 2021 | Legal information</div>
          </div>
        </div>

        <div className="col-lg-4 login-bg page-container">
          <img
            src={Bg}
            alt="bg-img"
            style={{ position: "absolute", left: 0, top: 250 }}
          />
        </div>
      </div>

      {auth && auth.passwordReset && (
        <SweetAlert
          success
          title="Success!"
          onConfirm={() => {
            dispatch(resetData());
            history.push("/episodes");
          }}
          customButtons={
            <React.Fragment>
              <button
                className="pod-button"
                onClick={() => (window.location = "/#/login")}
              >
                Close
              </button>
            </React.Fragment>
          }
        >
          Password Reset Successfully
        </SweetAlert>
      )}
    </>
  );
}
