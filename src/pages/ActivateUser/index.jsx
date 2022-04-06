import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAuthDetails,
  resendActivationToken,
  resetData,
} from "../../store/auth";
import { loadState } from "../../helpers/local_storage";

import { Modal, Spinner } from "react-bootstrap";
import AlmostDone from "../../assets/svg/almost-done.svg";
import "./style.css";
import { useHistory } from "react-router";

export default function ActivateUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(getAuthDetails);

  const userEmail = loadState() && loadState()?.user?.email;

  useEffect(() => {
    dispatch(resetData());
    toast.dismiss();
  }, []);

  const handleResend = () => {
    dispatch(resendActivationToken({ email: userEmail }));
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        history.push("/login");
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header"></Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center w-100 px-5 pb-5">
          <img src={AlmostDone} alt="almost" />

          <h3 className="almost-done mt-3">Almost Done!</h3>

          <div className="mt-3">
            Please activate your account by clicking on the link sent to the
            email you provided.
          </div>

          <div className="mt-4">
            Didn’t get verification email?
            {auth?.resendingActivationCode ? (
              <Spinner
                style={{ marginLeft: "1rem" }}
                variant="primary"
                animation="border"
                size="sm"
              />
            ) : (
              <span className="resend-now ml-2" onClick={handleResend}>
                Resend Now!
              </span>
            )}
          </div>
          {auth?.resendActivationCodeSuccess && (
            <div className="text-success text-center mt-4">
              Activation token has been resent successfully, <br /> please check
              your mail
            </div>
          )}
          {auth?.resendActivationCodeFailed && (
            <div className="text-success text-center mt-4">
              resendActivationCodeFailed
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
