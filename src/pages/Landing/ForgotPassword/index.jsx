import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, getAuthDetails } from "../../../store/auth";
import "./style.css";
import { Header } from "../Header";
import { AuthFooter } from "../AuthFooter";

export const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuthDetails);
  const history = useHistory();
  const [values, setValue] = useState();

  const { loading } = auth;

  useEffect(() => {
    if (auth && auth.reset) {
      history.push("/verification");
    }
  }, [auth, history]);

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = values;
    sessionStorage.setItem("resetEmail", email)
    dispatch(resetPassword(email));
  };



  return (
    <div className="login-container">
      <Header />
      <div className="login-content">
        <div className="login-content--left">&nbsp;</div>
        <div className="login-content--right">
          <div className="login-content--login-form">
            <form onSubmit={handleSubmit}>
              <div className="container-auth">
                <div className="d-flex flex-column align-items-center">
                  <span className="title-auth">Forgot Password</span>
                  <div className="info-auth mb-3 mt-1 text-center">
                    Forgotten your password? Enter your email address below to
                    begin the reset process.
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    onChange={(e) => handleValue(e)}
                    required
                  />
                </div>

                <div className="d-flex flex-column align-items-center">
                  <Button
                    type="submit"
                    variant="warning"
                    style={{ width: "100%" }}
                    disabled={loading}
                    className="pwd-reset--button"
                  >
                    Send reset token
                  </Button>
                  <div className="mt-2">
                    <span className="link-switch">
                      Back to{" "}
                      <Link to="/login" className="link-auth">
                        Log in
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};
