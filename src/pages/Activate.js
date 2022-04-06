import React, { useEffect } from "react";
import Success from "../assets/svg/success.svg";
import { activateAccount, getAuthDetails } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";

export default function Activate() {
    const dispatch = useDispatch();
    const auth = useSelector(getAuthDetails);
    const { token } = useParams();
    const { loading, details } = auth;

    useEffect(() => {
        toast.dismiss()
    }, [])

    useEffect(() => {
        toast.success(details)
    }, [details])

    useEffect(() => {
        if (token) {
            dispatch(activateAccount(token));
        }
    }, [token, dispatch])

    return (
        <div className="d-flex flex-row">
            <ToastContainer />
            <div className="d-flex flex-column flex-grow-1 page-container">
                <div className="d-flex justify-content-center  align-items-center"   style={{ minHeight: "92vh" }}>
                    <div>
                        <div className="text-center">
                            <div>
                                <img src={Success} alt="icon" />
                                <div className="confirm-title my-3">Email Confirmed Successfully</div>
                                <div className="confirm-body my-4" style={{ width: 350, color: "black" }}>
                                    {loading ? "Please wait..." : ""}
                                </div>
                            </div>
                            <span className="link-switch">Back to  <Link to="/login" className="link-auth">Log in</Link></span>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}