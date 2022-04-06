import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import { GridItem } from "../Dashboard/GridItem";
import moment from "moment";
import Delete from "../../assets/svg/delete-episode.svg";
import { deactivateUserCommenting, deleteComment, getComments, getCommentSelector, resetBasics, resetDownload } from "../../store/comments";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { formatDate } from "../../helpers/date";

const allProps = [
  {
    name: 'Sender Username',
    type: 'text',
    prop: 'username'
  },
  {
    name: 'Comments',
    type: 'longText',
    prop: 'comment',
  },
  {
    name: 'Podcast Name',
    type: 'longText',
    prop: 'podcastName',
  },
  {
    name: 'Episode Name',
    type: 'longText',
    prop: 'episodeName',
  },
  {
    name: 'Submitted on',
    type: 'date',
    prop: 'createdAt'
  },
]

const Comments = () => {
  const commentData = useSelector(getCommentSelector);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editPayload, setEditPayload] = useState();
  const [confirm, setConfirm] = useState(false);
  const [workItem, setWorkItem] = useState();
  const [action, setAction] = useState("");

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });

  const { fetchData, deleted, deleting, deleteFailed, deactivated, deactivating, deactivationFailed } = commentData;

  const dispatch = useDispatch();

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const loadComments = (rows = 10, offset = 0, type = "normal") => {
    dispatch(
      getComments({
        limit: rows,
        offset: offset,
        startDate: formatDate(dateState?.start),
        endDate: formatDate(dateState?.end),
      }, type)
    );
  };

  const resetDown = () => {
    dispatch(resetDownload())
  }

  useEffect(() => {
    if (deleteFailed || deleted || deactivated || deactivationFailed) {
      setTimeout(() => {
        dispatch(resetBasics())
        setConfirm(false);
        loadComments();
      }, 5000)
    }
  }, [deleteFailed, deleted, deactivated, deactivationFailed])

  const handleConfirm = () => {
    if (action === 'delete')
      return dispatch(deleteComment(workItem))
    if (action === 'disable_user') {
      return dispatch(deactivateUserCommenting(workItem))
    }
  }
  // table actions
  const actions = [
    {
      name: 'Delete',
      type: 'text',
      icon: Delete,
      fn: d => {
        setAction('delete')
        setConfirm(true)
        setWorkItem(d)
      }
    },
    {
      prop: 'userId',
      main: 'commenting',
      trueValue: 'Ban/restrict user',
      falseValue: 'Unban/Unrestrict user',
      type: 'check',
      show: true,
      fn: d => {
        setAction('disable_user')
        setConfirm(true)
        setWorkItem(d)
      }
    }
  ]

  const addButton = <Button style={{ borderRadius: 100, padding: '5px 20px', backgroundColor: '#00678F' }} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Comments</span>
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
      </div>

      <div className="d-card-container mt-2">
        <Row>
          <GridItem
            title="COMMENTS"
            value={fetchData?.totalCounts?.toLocaleString("en-US")}
            className="col-md-2 mr-2 mb-2"
          />
        </Row>
      </div>

      <Table
        selector={commentData}
        load={loadComments}
        allProps={allProps}
        loading={commentData?.loading}
        actions={actions}
        pick={commentData?.fetchData?.value}
        dateState={dateState}
        tableName="Comments"
        totalCounts={commentData?.fetchData?.totalCounts}
        resetDownload={resetDown}
      />

      {confirm && (
        <ConfirmBox
          showConfirm={confirm}
          onConfirm={() => {
            !deactivating && handleConfirm()
          }}
          onCancel={() => {
            loadComments();
            setConfirm(false);
            dispatch(resetBasics());
          }}
          hideConfirm={deleteFailed || deleted || deactivationFailed || deactivated || deactivating || deleting}
          confirmTitle={deleteFailed || deactivationFailed ? "Failed" : deleted || deactivated ? "Successful" : "Confirm"}
          confirmMsg={deleteFailed || deactivationFailed ? "That action was not successful." : deleted || deactivated ? "Action was successful." : "You're about to take an action. Click confirm to continue."}
          is_request_processing={deleting || deactivating}
        />
      )}
    </div >
  );
};

export default Comments;