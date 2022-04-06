import React, { useState, useEffect } from "react";
import Bg from "../assets/svg/bg.svg";
import { Button } from "react-bootstrap";
import { loadState } from "../helpers/local_storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getAuthDetails, resetData } from "../store/auth";
import { saveState } from "../helpers/local_storage";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import { isEmpty } from "lodash";

export default function Login(props) {
    const dispatch = useDispatch();
    const user = loadState() && loadState().user;
    const auth = useSelector(getAuthDetails);
    const [type, setType] = useState(false);
    const [values, setValue] = useState();

    const { loading, details, lastFetch } = auth;

    useEffect(() => {
        if (auth && !isEmpty(details)) {
            if (details && details.token) {
                saveState({ ...details, lastFetch });
                dispatch(resetData())
                window.location = props && props.location ? `/#${props.location.pathname}` : "/#/";
            } else {
                dispatch(resetData())
                window.location = "/#/activate-user";
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details])

    const handleValue = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(values));
    }

    if (user) return <Redirect to="/dashboard" />

    return (
        <div className="d-flex flex-row">
            <ToastContainer />
            <div className="d-flex flex-column flex-grow-1 page-container">
                <div className="d-flex justify-content-center ">

                    <form onSubmit={handleSubmit}>
                        <div className="container-auth">
                            <span className="title-auth">Login to myPodcast</span>
                            <div style={{ width: 450 }} className="mt-4">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        name="usernameOrEmailOrMobile"
                                        type="text"
                                        className="form-control"
                                        placeholder="username"
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
                                            style={{ position: "absolute", top: 15, right: 10, cursor: "pointer" }}
                                            onClick={() => setType(!type)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="warning"
                                type="submit"
                                style={{ width: "100%" }}
                                className="my-3"
                                disabled={loading}
                            >
                                <span className="button-label" style={{ fontSize: "16px" }}>Login</span>
                            </Button>
                            <div className="mb-2">
                                <span className="link-switch">No account? <Link to="/signup" className="link-auth">Signup</Link> for Free</span>
                            </div>
                            <span className="link-switch"><Link to="/forgot" className="link-auth">Forgot Password?</Link></span>
                        </div>
                    </form>
                </div>

                <Footer />
            </div>

            <div className="col-lg-4 login-bg page-container">
                <img src={Bg} alt="bg-img" style={{ position: "absolute", left: 0, top: 250 }} />
            </div>
        </div>
    )
}