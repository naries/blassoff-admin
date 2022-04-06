import { Header } from "../Header";
import { AuthFooter } from "../AuthFooter";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Col, OverlayTrigger } from "react-bootstrap";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PasswordGuide from "../../../helpers/password_guides";
import GoogleIcon from "../../../assets/landing/assets/images/google-icon.svg";
import {
  registerUser,
  getAuthDetails,
  loginUser,
  resetData,
} from "../../../store/auth";
import { isEmpty } from "lodash";
import { saveState } from "../../../helpers/local_storage";
import "./style.css";
import LoginHooks from "../../../components/GoogleLogin";

export const Signup = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuthDetails);
  const history = useHistory();
  const [type, setType] = useState(false);
  const [values, setValue] = useState();
  const [confirmPassword, setConfirm] = useState("");
  const [tandc, setTandc] = useState(false);
  const [tandcErr, setTandcErr] = useState();

  const { loading, details, newUserData, lastFetch } = auth;

  useEffect(() => {
    if (auth && newUserData && values?.email && values?.password) {
      dispatch(resetData());

      dispatch(
        loginUser({
          usernameOrEmailOrMobile: values?.email,
          password: values?.password,
        })
      );
    }
  }, [newUserData]);

  useEffect(() => {
    if (auth && !isEmpty(details)) {
      if (details && details.token) {
        saveState({ ...details, lastFetch });
        dispatch(resetData());
        history.push("/dashboard");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const handleValue = (e) => {
    setTandcErr();
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password } = values;

    if (tandc) {
      dispatch(registerUser(values));
    } else {
      setTandcErr("you must accept terms to continue");
    }
  };

  return (
    <div className="signup-container">
      <Header />
      <div className="signup-content">
        <div className="signup-content--left">&nbsp;</div>
        <div className="signup-content--right">
          <div className="signup-content--signup-form">
            <form onSubmit={handleSubmit}>
              <div className="signup-content--form-content">
                <span className="signup-content--signup-form-title">
                  Sign up as a Podcaster
                </span>
                <div className="text-danger mt-2">
                  {auth.signupFailed && auth.signupFailed}
                </div>
                {/* <div className="signup--info text-center">Continue with</div> */}
                {/* <button type="button" className="signup--google-btn">
                  <img src={GoogleIcon} alt="google icon" /> Google
                </button> */}
                {/* <LoginHooks /> */}

                {/* <div className="signup--or">
                  <div className="signup--or-line">&nbsp;</div>
                  Or
                  <div className="signup--or-line">&nbsp;</div>
                </div> */}
                <Row className="mt-3">
                  <Col xs={12}>
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
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>Firstname</label>
                    
                        <input
                          name="firstname"
                          type="text"
                          minLength="6"
                          className="form-control"
                          placeholder="Enter Firstname"
                          onChange={(e) => handleValue(e)}
                          required
                        />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <label>Lastname</label>
                      <input
                        name="lastname"
                        type="text"
                        minLength="6"
                        className="form-control"
                        placeholder="Enter Lastname"
                        onChange={(e) => handleValue(e)}
                        required
                      />
                    </div>
                  </Col>

                  <Col xs={12}>
                    <div className="form-group">
                      <label>Create Password</label>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={PasswordGuide(
                          "Please choose a password that is easy for you to remember but difficult for others."
                        )}
                      >
                        <div style={{ position: "relative" }}>
                          <input
                            name="password"
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
                  </Col>
                </Row>
                <div class="custom-control custom-checkbox p-0">
                  <input
                    checked={tandc}
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                    onChange={(e) => {
                      setTandcErr();
                      setTandc(e.target.checked);
                    }}
                  />
                  <label class="custom-control-label pl-2" htmlFor="customCheck1">
                    By continuing, you agree to our&nbsp;
                    <NavLink className="terms-link" to="/terms">
                      Terms of Service and Privacy
                    </NavLink>
                    &nbsp; Policy
                  </label>
                  {tandcErr && (
                    <div className="text-danger text-12 mb-2">{tandcErr}</div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="warning"
                  style={{ width: "100%" }}
                  disabled={loading}
                  className="signup--button"
                >
                  Sign Up
                </Button>

                <span className="link-switch my-3">
                  Already have an account?{" "}
                  <Link to="/login" className="link-auth">
                    Log in
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};
