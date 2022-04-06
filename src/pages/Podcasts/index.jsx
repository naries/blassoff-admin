import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import { GridItem } from "../Dashboard/GridItem";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { getAllPodcasts, getPodCasts, resetDownload, resetSuspend, suspend } from "../../store/podcast";
import { formatDate } from "../../helpers/date";

// types can be text, date

const allProps = [
  {
    name: 'Podcast Title',
    type: 'text',
    prop: 'title'
  },
  {
    name: 'Exclusive?',
    type: 'boolean',
    prop: 'exclusive',
    trueValue: 'Yes',
    falseValue: 'No'
  },
  {
    name: 'Followers',
    type: 'text',
    prop: 'followers'
  },
  {
    name: 'Flag Count',
    type: 'text',
    prop: 'flagCount'
  },
  {
    name: 'Creator',
    type: 'concat',
    prop: 'userId',
    nests: ["firstname", "lastname"]
  },
  {
    name: 'Category',
    type: 'array',
    prop: 'categories',
    nestName: 'displayName'
  },
  {
    name: 'Status',
    type: 'text-decorated',
    prop: 'visibility',
  },
]

const Podcasts = () => {
  const podsData = useSelector(getPodCasts);
  const [workItem, setWorkItem] = useState();
  const [action, setAction] = useState('suspend')
  const [confirm, setConfirm] = useState(false);
  const [search, setSearch] = useState("");

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });

  const { fetchAllAdminData, suspendFailed, suspended } = podsData;

  const dispatch = useDispatch();

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const loadPodcasts = (rows = 10, offset = 0, type="normal") => {
    dispatch(
      getAllPodcasts({
        limit: rows,
        offset: offset,
        startDate: formatDate(dateState?.start),
        endDate: formatDate(dateState?.end),
        search
      }, type)
    );
  };

  useEffect(() => {
    if (suspendFailed || suspended) {
      setTimeout(() => {
        dispatch(resetSuspend());
        setConfirm(false);
        loadPodcasts();
      }, 5000)
    }
  }, [suspendFailed, suspended])

  useEffect(() => {
    loadPodcasts();
  }, [search])

  const resetDown = () => {
    dispatch(resetDownload())
  }

  const handleConfirm = () => {
    dispatch(resetSuspend());
    let param2;
    if (action && action === 'suspend') {
      param2 = workItem?.visibility !== 'SUSPENDED' ? 'SUSPENDED' : 'PUBLIC'
    } else {
      param2 = workItem?.visibility !== 'FLAGGED' ? 'FLAGGED' : 'PUBLIC'
    }
    dispatch(suspend(workItem, param2))
  }

  const actions = [
    {
      values: [, , , , "FLAGGED"],
      options: [
        {
          value: "PUBLIC",
          trueValue: "",
          falseValue: "",
          fn: () => { }
        },
        {
          value: "LIMITED",
          trueValue: "",
          falseValue: "",
          fn: () => { }
        },
        {
          value: "PRIVATE",
          trueValue: "",
          falseValue: "",
          fn: () => { }
        },
        {
          value: "SUSPENDED",
          trueValue: "Suspend",
          falseValue: "Unsuspend",
          show: true,
          fn: d => {
            setAction('suspend')
            setConfirm(true)
            setWorkItem(d)
          }
        },
        {
          value: "FLAGGED",
          trueValue: "Flag",
          falseValue: "Unflag",
          show: false,
          fn: d => {
            setAction('flag')
            setConfirm(true)
            setWorkItem(d)
          }
        },
      ],
      prop: "visibility",
      type: "singlePropMultiFunctions"
    }
  ]

  const totalCounts = podsData && podsData?.fetchAllAdminData ? podsData.fetchAllAdminData.totalCounts : 0;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Podcasts</span>

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
            title="PODCASTS"
            value={fetchAllAdminData?.totalCounts?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="FOLLOWING"
            value={fetchAllAdminData?.followings?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="SUSPENDED"
            value={fetchAllAdminData?.suspended?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="ACTIVE"
            value={fetchAllAdminData?.actives?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="INACTIVE"
            value={fetchAllAdminData?.inactives?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
        </Row>
      </div>

      <Table
        selector={podsData}
        load={loadPodcasts}
        loading={podsData?.loadingAllAdmin}
        allProps={allProps}
        actions={actions}
        pick={podsData?.fetchAllAdminData?.podcasts}
        dateState={dateState}
        tableName="Podcasts"
        totalCounts={totalCounts}
        isSearchable
        searchString={search}
        setSearchString={setSearch}
        resetDownload={resetDown}
      />

      {confirm && (
        <ConfirmBox
          showConfirm={confirm}
          onConfirm={handleConfirm}
          onCancel={() => {
            loadPodcasts();
            setConfirm(false);
            dispatch(resetSuspend());
          }}
          hideConfirm
          confirmTitle={suspendFailed ? "Failed" : suspended ? "Successful" : "Loading..."}
          confirmMsg={suspendFailed ? "That action was not successful." : suspended ? "Action was successful." : "Please wait..."}
          is_request_processing={podsData?.suspending}
        />
      )}
    </div >
  );
};

export default Podcasts;