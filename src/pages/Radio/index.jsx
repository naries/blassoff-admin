import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RadioTable from "./RadioTable";
import AddRadio from "./Add";
import EditRadio from "./Edit";
import { getRadios, getRadio, toggleActivation, deleteRadio, resetDownload } from "../../store/radio";
import { Button, Row } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import EditBlack from "../../assets/svg/edit-black.svg";
import Delete from "../../assets/svg/delete-episode.svg";
import { GridItem } from "../Dashboard/GridItem";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { formatDate } from "../../helpers/date";


const allProps = [
  {
    name: 'Station Name',
    type: 'text',
    prop: 'name'
  },
  {
    name: 'Frequency',
    type: 'text',
    prop: 'station',
    prepend: 'FM',
    append: 'MHZ'
  },
  {
    name: 'Media URL',
    type: 'longText',
    prop: 'mediaUrl'
  },
  {
    name: 'Unique Impressions',
    type: 'text',
    prop: 'uniqueImpressions'
  },
  {
    name: 'Unique Listeners',
    type: 'text',
    prop: 'uniqueListenersCounts'
  },
  {
    name: 'Total Plays',
    type: 'text',
    prop: 'impressionsCounts'
  },
  {
    name: 'Date Uploaded',
    type: 'date',
    prop: 'createdAt'
  },
]

const OnlineRadio = () => {
  const RadioData = useSelector(getRadios);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editPayload, setEditPayload] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");

  const { deleting, fetchData } = RadioData;

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const dispatch = useDispatch();

  const loadRadios = (rows = 5, offset = 0, type = "normal") => {
    dispatch(
      getRadio({
        limit: rows,
        offset: offset,
        startDate: formatDate(dateState?.start),
        endDate: formatDate(dateState?.end),
        search
      }, type)
    );
  };

  const handleConfirm = () => {
    dispatch(
      deleteRadio({
        radioId: itemToDelete?._id,
      })
    );
    setConfirmDelete(false);
  }

  useEffect(() => {
    loadRadios();
  }, [search])

  const actions = [
    {
      name: 'Edit',
      type: 'text',
      icon: EditBlack,
      fn: d => {
        setEditPayload(d)
        setShowEdit(true)
      }
    },
    {
      name: 'Delete',
      type: 'text',
      icon: Delete,
      fn: d => {
        setItemToDelete(d)
        setConfirmDelete(true)
      }
    }
  ]

  const resetDown = () => {
    dispatch(resetDownload())
  }

  useEffect(() => {
    loadRadios();
  }, [deleting])

  let addButton = <Button style={{ borderRadius: 100, padding: '5px 20px', backgroundColor: '#00678F' }} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Radio Stations</span>
        <div className="listener-activities-date-range-picker">
          <DateRangePicker
            initialSettings={{
              startDate: dateState?.start.toDate(),
              endDate: dateState?.end.toDate()
            }}
            onCallback={handleCallback}>
            <input type="text" className="form-control" style={{minWidth: 200}}/>
          </DateRangePicker>
        </div>
      </div>

      <div className="d-card-container mt-2">
        <Row>
          <GridItem
            title="RADIO STATIONS"
            value={fetchData?.totalCounts?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="TOTAL RADIOS PLAYED"
            value={fetchData?.totalRadioPlayed?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
          <GridItem
            title="TOTAL LISTENERS"
            value={fetchData?.totalImpressions?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
        </Row>
      </div>

      <Table
        extraHeaders={addButton}
        selector={RadioData}
        load={loadRadios}
        allProps={allProps}
        actions={actions}
        pick={RadioData?.fetchData?.value}
        tableName="Radios"
        totalCounts={RadioData?.fetchData?.totalCounts}
        isSearchable
        searchString={search}
        setSearchString={setSearch}
        resetDownload={resetDown}
      />


      {showAdd && (
        <AddRadio
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          loadRadios={loadRadios}
        />
      )}


      {showEdit && (
        <EditRadio
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editPayload={editPayload}
          loadRadios={loadRadios}
        />
      )}

      {confirmDelete && (
        <ConfirmBox
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle="Are you sure?"
          confirmMsg="You are about to delete. Please confirm or press cancel to return"
          is_request_processing={RadioData?.deleting}
        />
      )}
    </div>
  );
};

export default OnlineRadio;