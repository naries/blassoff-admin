import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRadios, getRadio } from "../../store/radio";
import { Button, Row } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import { getCreator, getCreators, resetAllToggles, resetExclusivityToggle, toggleExclusive, toggleActivate, resetDownload } from "../../store/creators";
import { GridItem } from "../Dashboard/GridItem";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { formatDate } from "../../helpers/date";

// types can be text, date

const allProps = [
  {
    name: 'Creator Name',
    type: 'text',
    prop: 'lastname'
  },
  {
    name: 'Email Address',
    type: 'text',
    prop: 'email',
    // prepend: 'FM',
    // append: 'MHZ'
  },
  {
    name: 'Number of Podcasts',
    type: 'text',
    prop: 'totalNumberOfPodCasts'
  },
  {
    name: 'Exclusive',
    type: 'boolean',
    prop: 'isExclusive',
    trueValue: 'Yes',
    falseValue: 'No'
  },
  {
    name: 'Number of Episodes',
    type: 'text',
    prop: 'totalNumberOfEpisodes'
  },
  {
    name: 'Status',
    type: 'decorated',
    prop: 'status'
  },
]

const Creators = () => {
  const creatorsData = useSelector(getCreators);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editPayload, setEditPayload] = useState();
  const [workItem, setWorkItem] = useState();
  const [confirm, setConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
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
  } = creatorsData;

  const dispatch = useDispatch();

  const getOffSet = () => {
    if (currentPage > 1) {
      return (currentPage - 1) * rowPerPage;
    } else {
      return 0;
    }
  };

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const handleConfirm = () => {
    if (type === "exclusive")
      return dispatch(toggleExclusive(workItem));
    if (type === "activate")
      return dispatch(toggleActivate(workItem))
  }

  console.log(creatorsData);


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
      getCreator({
        limit: rows,
        offset: offset,
        startDate: formatDate(dateState?.start),
        endDate: formatDate(dateState?.end),
        search
        // status: ""
      }, type)
    );
  };

  const resetDown = () => {
    dispatch(resetDownload())
  }

  const actions = [
    {
      type: 'status',
      prop: "isExclusive",
      trueValue: "Make Exclusive",
      falseValue: 'Make Non-exclusive',
      fn: d => {
        setWorkItem(d);
        setType('exclusive')
        setConfirm(true);
      }
    },
    {
      type: 'compare2Values',
      prop: "status",
      compareValue1: "active",
      compareValue2: "suspended",
      trueValue: "Suspend",
      falseValue: 'Unsuspend',
      fn: d => {
        setWorkItem(d);
        setType('activate')
        setConfirm(true);
      }
    }
  ]

  let addButton = () => <Button style={{ borderRadius: 100, padding: '5px 20px', backgroundColor: '#00678F' }} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Creators</span>

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
            title="CREATORS"
            value={fetchData?.totalNumberOfCreator.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="PODCASTS"
            value={fetchData?.podcastTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="EPISODES"
            value={fetchData?.episodeTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="ACTIVE"
            value={fetchData?.activeCreatorTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="PENDING"
            value={fetchData?.pendingCreatorTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="INACTIVE"
            value={fetchData?.inactiveCreatorTotal.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
        </Row>
      </div>

      <Table
        extraHeaders={addButton}
        actions={actions}
        selector={creatorsData}
        load={loadCreators}
        allProps={allProps}
        isSearchable
        searchString={search}
        setSearchString={setSearch}
        pick={creatorsData?.fetchSlim}
        totalCounts={creatorsData?.fetchData?.totalNumberOfCreator}
        dateState={dateState}
        tableName="Creators"
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

export default Creators;