import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { ConfirmBox } from "../../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../../components/AdminTable";
import AddUser from "./Add";
import EditUser from "./Edit";
import { deactivate, getUser, getUsers, resetCreation, resetActivateDeactivate, resetOneUser, resetPassword } from "../../../store/users";
import { contents, getLiveContents } from "../../../store/content";

// Props on table
const allProps = [
  {
    name: 'Question',
    type: 'longText',
    prop: 'quizQuestion'
  },
  {
    name: 'Hint',
    type: 'longText',
    prop: 'questionHint'
  },
]

const LiveContent = () => {
  const liveDataContent = useSelector(contents);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // save user progress in this state
  const [progressValue, setProgressValue] = useState(null)

  const [editPayload, setEditPayload] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");

  const { loadingLive, liveData, fetchLiveFailed } = liveDataContent;

  const dispatch = useDispatch();

  const load = (rows = 10, offset = 0) => {
    dispatch(getLiveContents({ limit: rows, offset, search }));
  };

  const handleConfirm = () => {
    dispatch(
      deactivate({
        userId: itemToDelete.id,
        isActive: !itemToDelete.isActive
      })
    );
  }

  useEffect(() => load(), [search]);


  // actions on table
  const actions = [
    {
      name: 'Edit',
      type: 'text',
      fn: d => {
        setEditPayload(d)
        setShowEdit(true)
      }
    },
  ]
  let addButton = <Button variant="dark" style={{ borderRadius: 100, padding: '5px 20px' }} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Live Rounds</span>
      </div>
      <Table
        noSelect
        disableDownload
        extraHeaders={addButton}
        selector={liveDataContent}
        load={load}
        loading={loadingLive}
        allProps={allProps}
        actions={actions}
        pick={liveData?.model}
        tableName="Live Rounds"
        totalCounts={liveData?.totalCount || liveData?.model?.length}
        searchString={search}
        isSearchable
        setSearchString={setSearch}
      />


      {showAdd && (
        <AddUser
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          progressValue={progressValue}
          setProgressValue={setProgressValue}
          load={load}
        />
      )}

      {showEdit && (
        <EditUser
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editPayload={editPayload}
          progressValue={progressValue}
          setProgressValue={setProgressValue}
          load={load}
        />
      )}

      {/* {confirmDelete && (
        <ConfirmBox
          hideConfirm={changing || changeSuccess || changeFailed}
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle={changing ? "Please wait..." : changeSuccess ? "Success" : changeFailed ? "Failed" : "Confirm"}
          confirmMsg={changing ? "Updating status... Please wait." : changeSuccess ? "Status updated successfully." : changeFailed ? "Something went wrong... Try again" : "Please confirm to continue or press cancel to return"}
          is_request_processing={changing}
        />
      )} */}
    </div>
  );
};

export default LiveContent;