import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import { getListener, getListeners, resetAllToggles, resetExclusivityToggle, toggleExclusive, toggleActivate } from "../../store/listeners";
import { GridItem } from "../Dashboard/GridItem";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { formatDate } from "../../helpers/date";
import { resetDownload } from "../../store/listeners";

// types can be text, date

const allProps = [
  {
    name: 'Username',
    type: 'text',
    prop: 'username'
  },
  {
    name: 'Email Address',
    type: 'text',
    prop: 'email',
    // prepend: 'FM',
    // append: 'MHZ'
  },
  {
    name: 'Phone Number',
    type: 'text',
    prop: 'mobile'
  },
  {
    name: 'Signup Date',
    type: 'date',
    prop: 'createdAt'
  },
  {
    name: 'Status',
    type: 'decorated',
    prop: 'status'
  },
]

const Listeners = () => {
  const listenersData = useSelector(getListeners);
  const [workItem, setWorkItem] = useState();
  const [confirm, setConfirm] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState('exclusive')

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });


  const {
    fetchData,
    toggling,
    toggleSuccess,
    toggleFailed,
    activating,
    activateFailed,
    activateSuccess
  } = listenersData;

  const dispatch = useDispatch();


  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const handleConfirm = () => {
    if (type === "exclusive")
      return dispatch(toggleExclusive(workItem));
    if (type === "activate")
      return dispatch(toggleActivate(workItem))
  }

  const resetDown = () => {
    dispatch(resetDownload())
  }

  useEffect(() => {
    loadCreators();
  }, [search])

  useEffect(() => {
    if (toggleSuccess || toggleFailed || activateSuccess || activateFailed) {
      setTimeout(() => {
        dispatch(resetAllToggles());
        setConfirm(false);
        loadCreators();
      }, 5000)
    }
  }, [toggleSuccess, toggleFailed, activateSuccess, activateFailed])

  const loadCreators = (rows = 10, offset = 0, type = "normal") => {
    dispatch(
      getListener({
        limit: rows,
        offset: offset,
        startDate: formatDate(dateState?.start),
        endDate: formatDate(dateState?.end),
        search
        // status: ""
      }, type)
    );
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Listeners</span>

        <div className="listener-activities-date-range-picker">
          <DateRangePicker
            initialSettings={{
              startDate: dateState?.start.toDate(),
              endDate: dateState?.end.toDate()
            }}
            onCallback={handleCallback}>
            <input type="text" className="form-control" />
          </DateRangePicker>
        </div>

        {/* <div>
          <Button variant="warning" onClick={() => setShowAdd(true)}>
            <span className="button-label">+ Add Radio</span>
          </Button>
        </div> */}
      </div>

      <div className="d-card-container mt-2">
        <Row>

          <GridItem
            title="LISTENERS"
            value={fetchData?.totalNumberOfListeners.toLocaleString("en-US")}
            // loading={loading}
            // icon={Download}
            className="col-md-2 mr-2 mb-2"
          // handleClick={() => setShowDownloadsDialog(true)}
          />
          <GridItem
            title="SUSPENDED"
            value={fetchData?.suspendedListenerTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="PENDING"
            value={fetchData?.pendingListenerTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="ACTIVE"
            value={fetchData?.activeListenerTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="INACTIVE"
            value={fetchData?.inactiveListenerTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
        </Row>
      </div>

      <Table
        selector={listenersData}
        load={loadCreators}
        allProps={allProps}
        isSearchable
        searchString={search}
        setSearchString={setSearch}
        pick={listenersData?.fetchSlim}
        totalCounts={listenersData?.fetchData?.totalNumberOfListeners}
        dateState={dateState}
        tableName="Listeners"
        resetDownload={resetDown}
      />

      {confirm && (
        <ConfirmBox
          showConfirm={confirm}
          onConfirm={handleConfirm}
          onCancel={() => {
            setConfirm(false);
            dispatch(resetExclusivityToggle());
            loadCreators();
          }}
          hideConfirm
          confirmTitle={toggleFailed || activateFailed ? "Failed" : toggleSuccess || activateSuccess ? "Successful" : "Loading..."}
          confirmMsg={toggleFailed || activateFailed ? "That action was not successful." : toggleSuccess || activateSuccess ? "Action was successful." : "Please wait..."}
          is_request_processing={toggling || activating}
        />
      )}
    </div >
  );
};

export default Listeners;