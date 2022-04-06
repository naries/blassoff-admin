import React, { useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import './style.scss'

export const ConfirmBox = ({
  showConfirm,
  onConfirm,
  onCancel,
  confirmTitle,
  confirmMsg,
  is_request_processing,
  hideConfirm
}) => {

  useEffect(() => {
    if (hideConfirm) {
      onConfirm();
    }
  }, [hideConfirm])
  return (
    <Modal
      show={showConfirm}
      onHide={() => onCancel()}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ border: "none" }}>
        <Modal.Title>
          <h5>{confirmTitle}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "0" }}>
        <p className="p-3 text-center">
          {is_request_processing ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            confirmMsg
          )}
        </p>
        {!hideConfirm && <div className="action-btns">
          <div className="left">
            <button onClick={() => onCancel()}>Cancel</button>
          </div>
          <div className="right">
            <button onClick={() => onConfirm()}>Confirm</button>
          </div>
        </div>}
      </Modal.Body>
    </Modal>
  );
};
