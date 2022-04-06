import React from "react";
import { Modal } from "react-bootstrap";
import CloseIcon from "../../assets/svg/close-icon.svg";
import "./style.css";

export const PodDialog = ({ show, onHide, children }) => {
  return (
    <Modal show={show} onHide={() => onHide()} size="lg" centered>
      <Modal.Body>
        <img
          className="pod-dialog-close"
          src={CloseIcon}
          alt="close icon"
          onClick={() => onHide()}
        />
        <div className="pod-dialog-content">{children}</div>
      </Modal.Body>
    </Modal>
  );
};
