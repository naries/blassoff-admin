import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import {
    Modal,
    Button,
    Row,
    Col,
    Container,
    Card,
    Alert,
    Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllPodsBySearchParam, getPodCasts } from "../../store/podcast";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const PodcastSearchModal = ({ showPodcastSearchModal, setShowPodcastSearchModal, setSelected, setValue, values }) => {
    const dispatch = useDispatch();

    const podcast = useSelector(getPodCasts);

    const closeModal = () => {
        setShowPodcastSearchModal(false);
    };

    const fetchPodcasts = param => {
        sleep(1000);
        dispatch(
            getAllPodsBySearchParam({
                limit: 100,
                search: param
            })
        )
    }

    return (
        <Modal
            show={showPodcastSearchModal}
            onHide={() => {
                closeModal();
            }}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title id="contained-modal-title-vcenter">
                    <Container>Select a Podcast</Container>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="py-4">
                    <Row>
                        <Col xs={12}>
                            <input
                                className="form-control pod-input"
                                name="show_id"
                                onChange={(e) => fetchPodcasts(e.target.value)}
                            />
                        </Col>
                        <Col xs={12} classNme="pt-4">
                            {podcast?.isSearching && <span className="p-2">Loading...</span>}
                            {podcast?.searchData?.podCast.map((s, i) => {
                                return <div className="pod--select" onClick={() => {
                                    setSelected(s);
                                    setValue({ ...values, show_id: s.id })
                                    closeModal();
                                }} key={i}>{s.title}</div>
                            })}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
