import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPodCasts } from "../../store/podcast";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import { getCategoryDetails } from "../../store/category";
import { removeDuplicates } from "../../modules/removeArrDuplicates";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from 'moment';
import './style.css';
import { getSection, getSections } from "../../store/sections";
import { PodcastSearchModal } from "../Banners/PodcastSearchModal";
import { createNotification, getNotificationSelector, resetData } from "../../store/notification";



let formData = new FormData();
const reader = new FileReader();
const image = new Image();
const animatedComponents = makeAnimated();

export default function AddNotification({ showAdd, setShowAdd, loadNotifications }) {
  const [values, setValue] = useState();
  const sectionData = useSelector(getSections);

  //succes and failure
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailure, setAddFailure] = useState(false);
  const types = ["one-time", "recurring"]
  const [type, setType] = useState();
  const [errors, setErrors] = useState();
  const [selected, setSelected] = useState({});
  const [showPodcastSearchModal, setShowPodcastSearchModal] = useState(false);
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())
  const [dateToSend, setDateToSend] = useState(moment())


  const dispatch = useDispatch();
  const notificationData = useSelector(getNotificationSelector);

  const { createData, createFailed } = notificationData;

  useEffect(() => {
    if (createData) {
      //handle success here
      setAddSuccess(true);
    }
    if (createFailed) {
      setAddFailure(true);
    }
  }, [createData, createFailed]);

  const handleCallback = (start, whichDate) => {
    if (whichDate === "startDate") {
      setStartDate(start);
      return;
    }

    if (whichDate === "endDate") {
      setEndDate(start);
      return;
    }

    if (whichDate === "dateToSend") {
      setDateToSend(start);
      return;
    }
  }

  useEffect(() => {
    dispatch(getSection({
      limit: 100,
      offset: 0
    }))
  }, [])

  const handleValue = (e) => {
    setErrors();
    dispatch(resetData());
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validate the inputs
    if (validateInput()) {
      //   create the podcast
      handleCreate();
    }
  };

  const handleCreate = () => {
    dispatch(
      createNotification({
        title: values.title,
        time: values.time,
        message: values.message,
        type: type,
        podCast: selected._id,
        startDate,
        dateToSend,
        endDate
      })
    );
  };

  const validateInput = () => {
    dispatch(resetData());

    if (!type) {
      setErrors({ ...errors, type: "Please choose a notification type" });
      return false;
    }

    if (!values?.title) {
      setErrors({ ...errors, title: "Please enter notification title" });
      return false;
    }

    if (!values?.time) {
      setErrors({ ...errors, time: "Please choose a time" });
      return false;
    }

    if (!values?.message) {
      setErrors({ ...errors, message: "Please enter a notification message" });
      return false;
    }

    return true;
  };


  const closeModal = () => {
    setShowAdd(false);
    loadNotifications();
    dispatch(resetData());
  };
  return (<>
    <Modal
      show={showAdd}
      onHide={() => {
        closeModal();
      }}
      className="modal-daterangepicker"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#00678F', color: 'white', fontSize: '24px!important' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <Container >Add New Notification</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addSuccess ? (
          <>
            <Alert show={addSuccess} variant="success">
              <Alert.Heading>SUCCESS</Alert.Heading>
              <p>Notification added successfully</p>
            </Alert>
            <div className="d-flex justify-content-end p-2">
              <Button
                style={{ color: 'white' }}
                onClick={() => {
                  closeModal();
                }}
                variant="outline-success"
              >
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="p-4">
              <Container>
                <Row>
                  <Col xs={12}>
                    {createFailed && (
                      <Alert variant="danger">{createFailed}</Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Title<span style={{ color: 'red' }}>*</span></label>
                            <input
                              name="title"
                              type="text"
                              maxLength={30}
                              className="form-control pod-input"
                              placeholder="Enter Notification Title"
                              onChange={(e) => handleValue(e)}
                              value={values?.title}
                            />
                            {errors?.title && (
                              <div className="text-danger px-3">
                                {errors?.title}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">
                              Notification Message<span style={{ color: 'red' }}>*</span>
                            </label>
                            <textarea
                              name="message"
                              onChange={(e) => handleValue(e)}
                              type="text"
                              className="form-control pod-input pod-textarea"
                              rows="4"
                              style={{ resize: "none" }}
                              placeholder="Enter Notification Message"
                            />
                            {errors?.message && (
                              <div className="text-danger px-3">
                                {errors?.message}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={12}>
                          <div className="form-group">
                            <label className="pod-label">Podcast</label>

                            <div
                              className="form-control pod-input"
                              name="show_id"
                              onClick={() => setShowPodcastSearchModal(true)}
                            >
                              {selected?.title}
                            </div>
                            {errors?.show_id && (
                              <div className="text-danger px-3">
                                {errors?.show_id}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={type === "recurring" ? 12 : 6}>
                          <div className="form-group">
                            <label className="pod-label">Time</label>
                            <input type="time" name="time" onChange={handleValue} required className="form-control pod-input" />
                            {errors?.time && (
                              <div className="text-danger px-3">
                                {errors?.time}
                              </div>
                            )}
                          </div>
                        </Col>

                        {type === "recurring" && <Col xs={6}>
                          <div className="form-group">
                            <label className="pod-label">Start Date</label>
                            <DateRangePicker
                              initialSettings={{
                                singleDatePicker: true,
                                timePicker: true,
                                showDropdowns: true,
                                parentEl: ".modal-daterangepicker",
                                minYear: parseInt(moment().format('YYYY'), 10),
                                // maxYear: 1901,
                              }}
                              onCallback={(start) => handleCallback(start, "startDate")}
                            >
                              <input type="text" className="form-control pod-input" />
                            </DateRangePicker>

                            {errors?.station && (
                              <div className="text-danger px-3">
                                {errors?.station}
                              </div>
                            )}
                          </div>
                        </Col>}
                        {type === "recurring" && <Col xs={6}>
                          <div className="form-group">
                            <label className="pod-label">End Date</label>
                            <DateRangePicker
                              initialSettings={{
                                singleDatePicker: true,
                                parentEl: ".modal-daterangepicker",
                                showDropdowns: true,
                                minYear: parseInt(moment().format('YYYY'), 10),
                              }}
                              onCallback={(start) => handleCallback(start, "endDate")}
                            >
                              <input type="text" className="form-control pod-input" />
                            </DateRangePicker>

                            {errors?.station && (
                              <div className="text-danger px-3">
                                {errors?.station}
                              </div>
                            )}
                          </div>
                        </Col>}
                        {type === "one-time" && <Col xs={6}>
                          <div className="form-group">
                            <label className="pod-label">Date</label>
                            <DateRangePicker
                              initialSettings={{
                                singleDatePicker: true,
                                parentEl: ".modal-daterangepicker",
                                showDropdowns: true,
                                minYear: parseInt(moment().format('YYYY'), 10),
                              }}
                              onCallback={(start) => handleCallback(start, "dateToSend")}
                            >
                              <input type="text" className="form-control pod-input" />
                            </DateRangePicker>

                            {errors?.station && (
                              <div className="text-danger px-3">
                                {errors?.station}
                              </div>
                            )}
                          </div>
                        </Col>}
                        <Col xs={6}>
                          <div className="form-group">
                            <label className="pod-label">Section</label>
                            <select
                              className="form-control pod-input"
                              name="section"
                              onChange={(e) => handleValue(e)}
                              required
                            >
                              <option selected>Select app Section</option>
                              {sectionData?.fetchData?.sections?.map((data, id) => (
                                <option key={id} value={data._id}>
                                  {data.title}
                                </option>
                              ))}
                            </select>
                            {errors?.position && (
                              <div className="text-danger px-3">
                                {errors?.position}
                              </div>
                            )}
                          </div>
                        </Col>

                        <Col xs={6}>
                          <div className="form-group">
                            <label className="pod-label">Type</label>
                            <select
                              className="form-control pod-input"
                              name="type"
                              onChange={(e) => setType(e.target.value)}
                              required
                            >
                              <option selected>Select Type</option>
                              {types.map((data, id) => (
                                <option key={id} value={data}>
                                  {data}
                                </option>
                              ))}
                            </select>
                            {errors?.type && (
                              <div className="text-danger px-3">
                                {errors?.type}
                              </div>
                            )}
                          </div>
                        </Col>


                      </Row>
                      <div className="d-flex justify-content-end mt-4">
                        <Button variant="warning" type="submit">
                          <span className="button-label">
                            {notificationData?.creating ? (
                              <Spinner variant="secondary" />
                            ) : (
                              "Save"
                            )}
                          </span>
                        </Button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
    <PodcastSearchModal
      setShowPodcastSearchModal={setShowPodcastSearchModal}
      showPodcastSearchModal={showPodcastSearchModal}
      setSelected={setSelected}
      setValue={setValue}
      values={values}
    // selected={selected}
    />
  </>);
}
