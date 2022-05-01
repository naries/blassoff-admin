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
import customers, { getCustomer, getCustomerBySearch, getCustomers, resetCustomerBySearch, resetData } from "../../store/customers"
import UpdatePassword from "./UpdatePassword";
import AddRole from "./AddRole";
import { CashoutModal } from "./CashoutModal";

// Props on table
const allProps = [
  {
    name: 'Username',
    type: 'text',
    prop: 'userName'
  },
  {
    name: 'Name',
    type: 'concat',
    nests: ['firstName', 'lastName']
  },
  {
    name: 'Email',
    type: 'text',
    prop: 'email'
  },
  {
    name: 'Balance',
    type: 'concat',
    nests: ['cashSymbol', 'cashBalance'],
  },
  {
    name: 'Coin',
    type: 'text',
    prop: 'coin',
  },
  {
    name: 'gem',
    type: 'text',
    prop: 'currentGems',
  },
]

const Customers = () => {
  const customersData = useSelector(getCustomers);
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
  const [viewCashoutModal, setViewCashoutModal] = useState(false);

  const { loading, fetchData, changing, changeSuccess, changeFailed } = customersData;
  console.log(customersData);

  const dispatch = useDispatch();

  const load = (limit = 10, offset = 0) => {
    if (search) {
      dispatch(getCustomer({
        limit,
        offset,
        search
      }));
    }
  };

  const handleConfirm = () => {
    dispatch(
      deactivate({
        userId: itemToDelete.id,
        isActive: !itemToDelete.isActive
      })
    );
  }

  const resetAll = () => {
    dispatch(resetData())
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
  }, [])

  useEffect(() => {
    load();
  }, [search])

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
    // {
    //   name: 'Change Password',
    //   type: 'text',
    //   fn: d => {
    //     setEditPayload(d)
    //     setShowChangePw(true)
    //   }
    // },
    {
      name: 'Edit',
      type: 'text',
      fn: d => {
        setEditPayload(d)
        setShowEdit(true)
      }
    },
    {
      name: 'Cashouts',
      type: 'text',
      fn: d => {
        setEditPayload(d)
        setViewCashoutModal(true)
      }
    },
    // {
    //   type: 'status',
    //   prop: 'isActive',
    //   trueValue: 'Deactivate',
    //   falseValue: 'Activate',
    //   fn: d => {
    //     setItemToDelete(d)
    //     setConfirmDelete(true)
    //   }
    // }
  ]

  let addButton = <Button className="btn btn-dark" style={{ borderRadius: 100, padding: '5px 20px'}} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Customers</span>
      </div>
      <Table
        noSelect
        disableDownload
        // extraHeaders={addButton}
        selector={customersData}
        load={load}
        loading={loading}
        allProps={allProps}
        actions={actions}
        pick={customersData?.fetchData?.model}
        tableName="Customers"
        isSearchable
        totalCounts={fetchData?.totalCount || fetchData?.model?.length}
        searchString={search}
        setSearchString={setSearch}
      />


      {showAdd && (
        <AddUser
          showAdd={showAdd}
          popRoleAdd={_openShowAddRole}
          setShowAdd={setShowAdd}
          progressValue={progressValue}
          setProgressValue={setProgressValue}
          load={load}
        />
      )}

      {showAddRole && (
        <AddRole
          showAddRole={showAddRole}
          setShowAddRole={setShowAddRole}
          closeShowAddRole={_closeShowAddRole}
          load={load}
        />
      )}

      {showChangePw && (
        <UpdatePassword
          showChangePw={showChangePw}
          setShowChangePw={setShowChangePw}
          editPayload={editPayload}
          load={load}
        />
      )}


      {showEdit && (
        <EditUser
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editPayload={editPayload}
          load={load}
        />
      )}

      {viewCashoutModal && (
        <CashoutModal
          showCashoutModal={viewCashoutModal}
          setShowCashoutModal={setViewCashoutModal}
          payload={editPayload}
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

export default Customers