import React, { useEffect } from "react";
import Success from "../assets/svg/success.svg";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { resetData } from "../store/auth";

export default function ConfirmEmail() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetData());
        toast.dismiss()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="d-flex flex-row">
            <ToastContainer />
            <div className="d-flex flex-column flex-grow-1 page-container">
                <div className="d-flex justify-content-center  align-tems-center">
                    <div>
                        <div className="text-center" style={{ marginTop: "250px" }}>
                            <div>
                                <img src={Success} alt="icon" />
                                <div className="confirm-title my-3">Success</div>
                                <div className="confirm-body my-4" style={{ width: 350 }}>
                                    Account created. Please check your email for the verification link to activate your account.
                            </div>
                            </div>
                        </div>
                        <div>
                            <span className="link-switch">Back to  <Link to="/login" className="link-auth">Log in</Link></span>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </div >
    )
}