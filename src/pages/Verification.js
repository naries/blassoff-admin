import React, { useEffect, useState } from "react";
import Success from "../assets/svg/success.svg";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import {
  verifyAccount,
  getAuthDetails,
  resetPassword,
  resetData,
} from "../store/auth";
import { Button, Spinner } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Instruction() {
  const resetEmail = sessionStorage.getItem("resetEmail");
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(getAuthDetails);
  const [values, setValue] = useState();

  const { loading, details } = auth;

  useEffect(() => {
    setValue({
      ...values,
      emailMobile: resetEmail,
    });
  }, []);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyAccount(values));
  };

  useEffect(() => {
    if (auth && auth.validated) {
      history.push("/reset");
    }
  }, [auth, history]);

  console.log("auth", auth);

  const handleResend = () => {
    dispatch(resetPassword(resetEmail));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row">
          <ToastContainer />
          <div className="d-flex flex-column flex-grow-1 page-container">
            <div className="d-flex justify-content-center  align-tems-center">
              <div>
                <div style={{ marginTop: "200px" }}>
                  <div>
                    <div className="text-center">
                      <img src={Success} alt="icon" />
                    </div>
                    <div className="confirm-title my-3 text-center">
                      Account Verification!
                    </div>
                    <div
                      className="confirm-body my-4 text-left"
                      style={{ width: 350 }}
                    >
                      We have sent a short code to your provided email address,
                      <br /> Please enter your code in the form below.
                      <div className="confirm-body mt-3">
                        <div>
                          Didn't get it?
                          {loading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              className="ml-4"
                            />
                          ) : (
                            <span
                              className="text-primary ml-4 cursor-pointer"
                              onClick={handleResend}
                            >
                              Resend token
                            </span>
                          )}
                        </div>
                      </div>
                      <div>Check your spam folder, too.</div>
                    </div>
                    <div className="my-3`">
                      <div className="form-group">
                        <input
                          name="emailMobile"
                          type="email"
                          className="form-control"
                          placeholder="email"
                          onChange={(e) => handleValue(e)}
                          required
                          disabled
                          value={values?.emailMobile}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="token"
                          type="number"
                          className="form-control"
                          placeholder="enter 5-digit code"
                          onChange={(e) => handleValue(e)}
                          required
                        />
                      </div>
                      <Button
                        variant="warning"
                        type="submit"
                        style={{ width: "100%" }}
                        className="my-3"
                        disabled={loading}
                      >
                        <span
                          className="button-label"
                          style={{ fontSize: "16px" }}
                        >
                          Submit
                        </span>
                      </Button>
                    </div>
                    <div className="text-center mb-3">
                      <span className="link-switch">
                        Back to{" "}
                        <Link to="/login" className="link-auth">
                          Log in
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>

        {details && (
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
                    dispatch(resetData());
                  }}
                >
                  Close
                </button>
              </React.Fragment>
            }
          >
            The reset link has been resent to {resetEmail}
          </SweetAlert>
        )}
      </form>
    </>
  );
}
