import React from "react";
import { Modal, Button, Container } from "react-bootstrap";

const DeleteConfirmation = ({ id, open, setOpen, deleteSelected }) => {

    return (
        <div>
            <Modal
                show={open}
                onHide={() => setOpen(false)}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Container>Delete episode</Container>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="d-flex justify-content-center mb-3">
                            <div className="text-center">
                                <span className="warning-info">Do you really want to delete this episiode?</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around mb-2">
                            <Button variant="light" className="button-label" style={{ width: "70px" }} onClick={() => {
                                setOpen(false)
                            }}>
                                No
                            </Button>
                            <Button variant="warning" style={{ width: "70px" }} onClick={() => {
                                deleteSelected(id)
                                setOpen(false)
                            }}>
                                Yes
                            </Button>
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DeleteConfirmation;
