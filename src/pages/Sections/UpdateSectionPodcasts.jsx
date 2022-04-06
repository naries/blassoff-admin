import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import {
  updateSection,
  getSections,
  resetData,
  updateSectionPodcasts,
  getSectionPodcasts,
} from "../../store/sections";
import PodDeleteIcon from "../../assets/svg/pod-delete-icon.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAudioDuration } from "../../modules/getAudioDuration";
import { getAllPods, getPodCasts } from "../../store/podcast";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { loadState } from "../../helpers/local_storage";

const animatedComponents = makeAnimated();

export default function UpdateSectionPodcasts({
  showEdit,
  setShowEdit,
  editPayload,
  loadSection,
}) {
  const [upload_audio, setUploadAudio] = useState(null);
  const [values, setValue] = useState();
  const [audioDuration, setAudioDuration] = useState();
  const state = loadState() && loadState().user && loadState();

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);

  const sectionData = useSelector(getSections);
  const { updatePodData, updateFailed, sectionPodData } = sectionData;
  const [podcasts, setPodcasts] = useState();
  const dispatch = useDispatch();

  const podcast = useSelector(getPodCasts);

  useEffect(() => {
    dispatch(resetData());
    dispatch(getAllPods());
    reloadPods();
  }, []);

  useEffect(() => {
    if (updatePodData) {
      reloadPods();
    }
  }, [updatePodData]);

  const reloadPods = () => {
    dispatch(getSectionPodcasts(editPayload?._id));
  };

  useEffect(() => {
    if (podcast?.fetchAllData) {
      const pods = podcast?.fetchAllData?.podCast.map((p) => {
        return {
          label: p.title,
          value: p._id,
        };
      });
      setPodcasts(pods);
    }
  }, [podcast]);

  useEffect(() => {
    if (updatePodData) {
      //handle success here
      setAddSuccess(true);
    }
    if (updateFailed) {
      setAddFailure(true);
    }
  }, [updatePodData, updateFailed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetData());

    const podsToSubmit = values?.sectionPods.map((pod) => {
      return pod?._id;
    });

    dispatch(
      updateSectionPodcasts({
        section: editPayload?._id,
        podcasts: podsToSubmit,
        type: "add",
      })
    );
  };

  useEffect(() => {
    async function getDuration() {
      let duration = await getAudioDuration(upload_audio);
      setAudioDuration(duration);
    }
    if (upload_audio) {
      getDuration();
    }
  }, [upload_audio]);

  const handlePodRemove = (podcastId) => {
    let podArr = [`${podcastId}`];
    dispatch(
      updateSectionPodcasts({
        section: editPayload?._id,
        podcasts: podArr,
        type: "remove",
      })
    );
  };

  const handleClose = () => {
    setShowEdit(false);
    loadSection();
    dispatch(resetData());
  };

  const searchPods = async (input) => {
    if (input && input.trim().length < 3) {
      return [];
    } else {
      const response = await axios.request({
        baseURL: process.env.REACT_APP_API_SPEAKER_URL,
        url: `https://spreakerdev.clairvoyant.com.ng/v1/podcasts?podcastSearch=${input}`,
        method: "get",
        headers: { Authorization: `${state && `Bearer ${state.token}`}` },
      });

      return response?.data?.podCast;
    }
  };

  return (
    <Modal
      show={showEdit}
      onHide={() => {
        handleClose();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <Container>
            Update <b>{editPayload?.title}</b> with Podcasts
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addSuccess ? (
          <>
            <Alert show={addSuccess} variant="success">
              <Alert.Heading>SUCCESS</Alert.Heading>
              <p>
                The selected podcasts have been successfully added to{" "}
                <b>{editPayload?.title}</b>{" "}
              </p>
            </Alert>
            <div className="d-flex justify-content-end p-2">
              <Button
                onClick={() => {
                  loadSection();
                  dispatch(resetData());
                  setAddSuccess(false);
                }}
                variant="outline-success"
              >
                OK
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="p-4">
              <Container>
                <Row>
                  <Col xs={12}>
                    <Card style={{ padding: "1rem" }}>
                      {addFailure && (
                        <Alert variant="danger">
                          Unable to complete update, please try again
                        </Alert>
                      )}
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12}>
                            <h2 className="text-center">
                              {editPayload?.title}
                            </h2>
                          </Col>
                          <Col xs={12}>
                            <div className="form-group">
                              <label>Podcasts<small>&nbsp;(type at least 3 characters to search)</small></label>

                              <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={searchPods}
                                getOptionLabel={(option) => option?.title}
                                getOptionValue={(option) => option?._id}
                                onChange={(value) => {
                                  setValue({
                                    ...values,
                                    sectionPods: value,
                                  });
                                }}
                                placeholder="Type to search"

                              />
                            </div>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                          <Button variant="warning" type="submit">
                            <span className="button-label">
                              {sectionData?.updatingPods ? (
                                <Spinner variant="secondary" />
                              ) : (
                                "Update"
                              )}
                            </span>
                          </Button>
                        </div>
                      </form>

                      <Card className="mt-3">
                        <Card.Header className="text-center text-bold">
                          Section Podcasts
                        </Card.Header>
                        <ListGroup variant="flush">
                          {sectionData?.loadingSectionPods ? (
                            <Skeleton count={3} className="p-2 m-1" />
                          ) : (
                            <>
                              {sectionPodData?.podCastsUnderSection?.length ? (
                                <>
                                  {sectionPodData?.podCastsUnderSection.map(
                                    (pod) => (
                                      <ListGroup.Item className="d-flex justify-content-between section-pod-item">
                                        <span>{pod?.title}</span>
                                        <img
                                          onClick={() =>
                                            handlePodRemove(pod?._id)
                                          }
                                          src={PodDeleteIcon}
                                          alt="edit icon"
                                          className="hidden-delete"
                                        />
                                      </ListGroup.Item>
                                    )
                                  )}
                                </>
                              ) : (
                                <ListGroup.Item>
                                  No podcasts under this section
                                </ListGroup.Item>
                              )}
                            </>
                          )}
                        </ListGroup>
                      </Card>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
