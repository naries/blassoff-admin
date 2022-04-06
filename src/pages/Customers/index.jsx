import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import moment from "moment";
import AddUser from "./Add";
import EditUser from "./Edit";
import { deactivate, getUser, getUsers, resetCreation, resetActivateDeactivate, resetOneUser, resetPassword } from "../../store/users";
import UpdatePassword from "./UpdatePassword";
import AddRole from "./AddRole";

// Props on table
const allProps = [
  {
    name: 'Username',
    type: 'text',
    prop: 'username'
  },
  {
    name: 'Email',
    type: 'text',
    prop: 'email'
  },
  {
    name: 'Phone Number',
    type: 'text',
    prop: 'phoneNumber',
  },
  {
    name: 'Location',
    type: 'text',
    prop: 'location'
  },
]

const Customers = () => {
  const usersData = useSelector(getUsers);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // save user progress in this state
  const [progressValue, setProgressValue] = useState(null)
  const [showChangePw, setShowChangePw] = useState(false);
  const [modalUpWhileAddRole, setModalUpWhileAddRole] = useState(null);

  const [editPayload, setEditPayload] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");

  const { loading, fetchData, changing, changeSuccess, changeFailed } = usersData;

  const dispatch = useDispatch();

  const load = (rows = 50, offset = 0) => {
    dispatch(getUser());
  };

  const handleConfirm = () => {
    dispatch(
      deactivate({
        userId: itemToDelete.id,
        isActive: !itemToDelete.isActive
      })
    );
  }

  console.log(showAddRole);

  const resetAll = () => {
    dispatch(resetCreation())
    dispatch(resetOneUser())
    dispatch(resetPassword())
  }

  const _openShowAddRole = () => {
    let currentModal = 'add'
    if (showAdd) {
      setShowAdd(false)
    }
    if (showEdit) {
      currentModal = 'edit'
      setShowEdit(false)
    }
    setShowAddRole(true);
    setModalUpWhileAddRole(currentModal);
  }

  const _closeShowAddRole = () => {
    switch (modalUpWhileAddRole) {
      case 'add':
        setShowAdd(true);
        break;
      case 'edit':
        setShowEdit(true);
      default:
        break;
    }
    setShowAddRole(false);
  }

  useEffect(() => {
    resetAll()
    dispatch(resetActivateDeactivate())
  }, [])

  useEffect(() => {
    if (changeSuccess || changeFailed) {
      setTimeout(() => {
        setConfirmDelete(false);
        dispatch(resetActivateDeactivate());
      }, 3000)
      load()
    }
  }, [changeSuccess, changeFailed])

  // actions on table
  const actions = [
    {
      name: 'Change Password',
      type: 'text',
      fn: d => {
        setEditPayload(d)
        setShowChangePw(true)
      }
    },
    {
      name: 'Edit',
      type: 'text',
      fn: d => {
        setEditPayload(d)
        setShowEdit(true)
      }
    },
    {
      type: 'status',
      prop: 'isActive',
      trueValue: 'Deactivate',
      falseValue: 'Activate',
      fn: d => {
        setItemToDelete(d)
        setConfirmDelete(true)
      }
    }
  ]
  let addButton = <Button style={{ borderRadius: 100, padding: '5px 20px', backgroundColor: '#00678F' }} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Customers</span>
      </div>
      <div className=" align-items-center py-4">
        <span className="">Enter Customer email here:</span>
        <input
          type="search"
          className="ml-4"
          style={{ minWidth: 300, padding: 6, borderRadius: 4 }}
          placeholder="customer@example.com"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="primary" type="submit">
          <span className="button-label">
            {/* {updating ? (
              <Spinner variant="secondary" />
            ) : ( */}
              Check for Customer
            {/* )} */}
          </span>
        </Button>
      </div>
      {/* <Table
        noDisplay
        noSelect
        disableDownload
        extraHeaders={addButton}
        selector={usersData}
        load={load}
        loading={loading}
        allProps={allProps}
        actions={actions}
        pick={usersData?.fetchData}
        tableName="Users"
        totalCounts={fetchData?.totalCounts || fetchData?.length}
        searchString={search}
        setSearchString={setSearch}
      /> */}


      {/* {showAdd && (
        <AddUser
          showAdd={showAdd}
          popRoleAdd={_openShowAddRole}
          setShowAdd={setShowAdd}
          progressValue={progressValue}
          setProgressValue={setProgressValue}
          load={load}
        />
      )} */}

      {/* {showAddRole && (
        <AddRole
          showAddRole={showAddRole}
          setShowAddRole={setShowAddRole}
          closeShowAddRole={_closeShowAddRole}
          load={load}
        />
      )} */}

      {/* {showChangePw && (
        <UpdatePassword
          showChangePw={showChangePw}
          setShowChangePw={setShowChangePw}
          editPayload={editPayload}
          load={load}
        />
      )} */}


      {showEdit && (
        <EditUser
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          popRoleAdd={_openShowAddRole}
          editPayload={editPayload}
          progressValue={progressValue}
          setProgressValue={setProgressValue}
          load={load}
        />
      )}

      {confirmDelete && (
        <ConfirmBox
          hideConfirm={changing || changeSuccess || changeFailed}
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle={changing ? "Please wait..." : changeSuccess ? "Success" : changeFailed ? "Failed" : "Confirm"}
          confirmMsg={changing ? "Updating status... Please wait." : changeSuccess ? "Status updated successfully." : changeFailed ? "Something went wrong... Try again" : "Please confirm to continue or press cancel to return"}
          is_request_processing={changing}
        />
      )}
    </div>
  );
};

export default Customers;