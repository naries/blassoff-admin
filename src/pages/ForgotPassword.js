import React, { useState, useEffect } from "react";
import Bg from "../assets/svg/signup-bg.svg";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, getAuthDetails } from "../store/auth";
import { ToastContainer } from "react-toastify";

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const auth = useSelector(getAuthDetails);
    const history = useHistory();
    const [values, setValue] = useState();

    const { loading } = auth;

    useEffect(() => {
        if (auth && auth.reset) {
            history.push("/verification");
        }
    }, [auth, history])

    const handleValue = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email } = values;
        dispatch(resetPassword(email));
    }

    return (
        <div className="d-flex flex-row">
            <div className="d-flex flex-column flex-grow-1 page-container">
                <div className="d-flex justify-content-center ">
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                        <div className="container-auth">
                            <span className="title-auth">Forgot Password</span>
                            <div className="info-auth mb-3 mt-1" style={{ width: 450 }}>
                                Forgotten your password? Enter your email address below to begin the reset process.
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
                            <Button
                                type="submit"
                                variant="warning"
                                style={{ width: "100%" }}
                                disabled={loading}
                                className="my-3">
                                <span className="button-label" style={{ fontSize: "16px" }}>Send reset token</span>
                            </Button>
                            <div className="mt-2">
                                <span className="link-switch">Back to <Link to="/login" className="link-auth">Log in</Link></span>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="d-flex justify-content footer" style={{ marginTop: "auto" }} >
                    <div className="copyright">
                        © 2021 | Legal information
                    </div>
                </div>
            </div>

            <div className="col-lg-4 login-bg page-container">
                <img src={Bg} alt="bg-img" style={{ position: "absolute", left: 0, top: 250 }} />
            </div>
        </div>
    )
}