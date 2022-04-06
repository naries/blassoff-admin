import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { loadState } from "../../../helpers/local_storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getAuthDetails, resetData } from "../../../store/auth";
import { saveState } from "../../../helpers/local_storage";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";
import "./style.css";
import { lockedMsg } from "../../../data";

export const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = loadState() && loadState().user;
  const auth = useSelector(getAuthDetails);
  const [type, setType] = useState(false);
  const [values, setValue] = useState();

  const { loading, details, lastFetch } = auth;

  useEffect(() => {
    dispatch(resetData());
  }, []);

  console.log(auth);

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
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetData());
    dispatch(loginUser(values));
  };

  if (auth?.loginFailed === lockedMsg) return <Redirect to="/locked-account" />;

  if (user && user.activated) return <Redirect to="/dashboard" />;

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-content--login-form">
          <form onSubmit={handleSubmit}>
            <div className="container-auth">
              <h4 className="title-auth">Blast Off Admin</h4>

              <div className="mt-4">
                {auth?.loginFailed && (
                  <div className="text-danger text-center">
                    {auth?.loginFailed}
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => handleValue(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      name="password"
                      type={!type ? "password" : "text"}
                      className="form-control"
                      placeholder="password"
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
                </div>
              {/* <div className="text-right mb-2">
                <span className="link-switch">
                  <Link to="/forgot" className="link-auth">
                    Forgot Password?
                  </Link>
                </span>
              </div> */}
              </div>
              <div className="d-flex flex-column align-items-center">
                <Button
                  // variant="warning"
                  type="submit"
                  style={{ width: "100%" }}
                  className="signup--button"
                  disabled={loading}
                >
                  <span style={{ fontSize: "16px" }}>
                    {loading ? (
                      <Spinner
                        variant="primary"
                        animation="border"
                        size="sm"
                      />
                    ) : (
                      "Login"
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
