import React from "react";
import { Button, Modal } from "react-bootstrap";
import Facebook from "../../assets/svg/facebook-app.svg";
import Linkedin from "../../assets/svg/linkedin-app.svg";
import Twitter from "../../assets/svg/twitter-app.svg";
import Copy from "../../assets/svg/copy-icon.svg";
import "./style.css";
import { SharableLink } from "./SharableLink";
import { CopyLink } from "./CopyLink";

export const SharingDialog = (props) => {
  let { show_id, sharingUrl } =
    props?.isSharing;

  return (
    <Modal
      show={props.isSharing}
      onHide={() => props.setIsSharing()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Share Episode
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show_id && (
          <div className="d-flex justify-content-center align-items-center">
            <SharableLink
              name="Facebook"
              logo={Facebook}
              sharingUrl={sharingUrl}
            />

            <SharableLink
              name="LinkedIn"
              logo={Linkedin}
              sharingUrl={sharingUrl}
            />

            <SharableLink
              name="Twitter"
              logo={Twitter}
              sharingUrl={sharingUrl}
            />

            <CopyLink episodeUrl={sharingUrl} name="Copy" logo={Copy} />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
