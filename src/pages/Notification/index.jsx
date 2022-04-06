import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNotification from "./Add";
import EditRadio from "./Edit";
import { getRadios, getRadio, toggleActivation } from "../../store/radio";
import { Button, Row } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import { GridItem } from "../Dashboard/GridItem";
import moment from "moment";
import { deleteNotification, getNotification, getNotificationSelector, resetDownload } from "../../store/notification";
import EditBlack from "../../assets/svg/edit-black.svg";
import Delete from "../../assets/svg/delete-episode.svg";
// types can be text, date

const allProps = [
  {
    name: 'Notification Title',
    type: 'text',
    prop: 'title'
  },
  {
    name: 'Notification Message',
    type: 'longText',
    prop: 'message',
  },
  {
    name: 'Type',
    type: 'text',
    prop: 'type'
  },
  {
    name: 'Start Date',
    type: 'date',
    prop: 'startDate'
  },
  {
    name: 'End Date',
    type: 'date',
    prop: 'endDate'
  },
  {
    name: 'Status',
    type: 'text',
    prop: 'status'
  },
]

const Notification = () => {
  const notificationData = useSelector(getNotificationSelector);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editPayload, setEditPayload] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });

  const { loading, fetchData, deleting } = notificationData;

  const dispatch = useDispatch();

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const loadNotifications = (rows = 10, offset = 0, type = "normal") => {
    dispatch(
      getNotification({
        limit: rows,
        offset: offset,
        // status: ""
      }, type)
    );
  };

  const actions = [
    {
      name: 'Edit',
      type: 'text',
      icon: EditBlack,
      fn: d => {
        setShowEdit(true);
        setEditPayload(d);
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

  const handleConfirm = () => {
    dispatch(
      deleteNotification({
        _id: itemToDelete?._id,
      })
    );
    setConfirmDelete(false);
  }

  const resetDown = () => {
    dispatch(resetDownload())
  }

  useEffect(() => {
    loadNotifications();
  }, [deleting])

  const addButton = <Button style={{ borderRadius: 100, padding: '5px 20px', backgroundColor: '#00678F' }} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Notifications</span>

        {/* <div>
          <Button variant="warning" onClick={() => setShowAdd(true)}>
            <span className="button-label">+ Add Radio</span>
          </Button>
        </div> */}
      </div>

      <div className="d-card-container mt-2">
        <Row>
          <GridItem
            title="TOTAL NOTIFICATION"
            value={fetchData?.totalCounts?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
        </Row>
      </div>

      <Table
        extraHeaders={addButton}
        selector={notificationData}
        load={loadNotifications}
        allProps={allProps}
        actions={actions}
        pick={notificationData?.fetchData?.adminNotifications}
        dateState={dateState}
        tableName="Notifications"
        totalCounts={notificationData?.fetchData?.totalCounts}
        resetDownload={resetDown}
      />


      {
        showAdd && (
          <AddNotification
            showAdd={showAdd}
            setShowAdd={setShowAdd}
            loadNotifications={loadNotifications}
          />
        )
      }


      {
        showEdit && (
          <EditRadio
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            editPayload={editPayload}
            loadNotifications={loadNotifications}
          />
        )
      }

      {confirmDelete && (
        <ConfirmBox
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle="Are you sure?"
          confirmMsg="You are about to delete. Please confirm or press cancel to return"
          is_request_processing={deleting}
        />
      )}
    </div >
  );
};

export default Notification;