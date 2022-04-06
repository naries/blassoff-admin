import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAuthDetails, unlockUser, resetData } from "../../../store/auth";
import { AuthFooter } from "../AuthFooter";
import { Header } from "../Header";

const LockedAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValue] = useState();
  const auth = useSelector(getAuthDetails);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);

  useEffect(() => {
    if (auth?.unblockUserData) {
      setShowSuccess(true);
    }

    if (auth.unblockUserFailed) {
      setShowFailure(true);
    }
  }, [auth]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(unlockUser(values));
  };

  return (
    <>
      <div className="login-container">
        <Header />
        <div className="login-content">
          <div className="login-content--left">&nbsp;</div>
          <div className="login-content--right">
            <div className="login-content--login-form">
              <form onSubmit={handleSubmit}>
                <div className="container-auth">
                  <div className="d-flex flex-column align-items-center">
                    <span className="title-auth">Unlock Account</span>
                    <div className="info-auth mb-3 mt-1 text-center">
                      Your account has been locked. Please enter the OTP that
                      was sent to your email to unlock.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>OTP</label>
                    <input
                      name="otp"
                      type="text"
                      className="form-control"
                      placeholder="enter otp"
                      onChange={(e) => handleValue(e)}
                      required
                    />
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    <Button
                      type="submit"
                      variant="warning"
                      style={{ width: "100%" }}
                      className="pwd-reset--button"
                    >
                      {auth?.unblockingUser ? (
                        <Spinner
                          variant="primary"
                          animation="border"
                          size="sm"
                        />
                      ) : (
                        "Unlock Account"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <AuthFooter />
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
                  history.push("/login");
                }}
              >
                Proceed to login
              </button>
            </React.Fragment>
          }
        >
          Your account has been unlocked
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
          {auth?.unblockUserFailed}
        </SweetAlert>
      )}
    </>
  );
};

export default LockedAccount;
