import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Spinner } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css";
import { Table } from "../../components/AdminTable";
import moment from "moment";
import AddUser from "./Add";
import EditCustomer from "./Edit";
import UpdatePassword from "./UpdatePassword";
import AddRole from "./AddRole";
import { getCustomerBySearch, getCustomers, resetCustomerBySearch } from "../../store/customers";

// Props on table
// const allProps = [
//   {
//     name: 'Username',
//     type: 'text',
//     prop: 'username'
//   },
//   {
//     name: 'Email',
//     type: 'text',
//     prop: 'email'
//   },
//   {
//     name: 'Phone Number',
//     type: 'text',
//     prop: 'phoneNumber',
//   },
//   {
//     name: 'Location',
//     type: 'text',
//     prop: 'location'
//   },
// ]

const Customers = () => {
  const customerData = useSelector(getCustomers);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // save user progress in this state
  const [progressValue, setProgressValue] = useState(null)
  const [showChangePw, setShowChangePw] = useState(false);
  const [modalUpWhileAddRole, setModalUpWhileAddRole] = useState(null);

  const [editPayload, setEditPayload] = useState();
  const [confirm, setConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");

  const { loadingBySearch, fetchBySearchData, fetchBySearchFailed } = customerData;

  const dispatch = useDispatch();

  // const load = (rows = 50, offset = 0) => {
  //   dispatch(getUserF());
  // };

  const loadSearch = () => {
    dispatch(getCustomerBySearch(search))
  }

  // const handleConfirm = () => {
  //   dispatch(
  //     deactivate({
  //       userId: itemToDelete.id,
  //       isActive: !itemToDelete.isActive
  //     })
  //   );
  // }

  const handleConfirm = () => {
    loadSearch();
  }

  const resetAll = () => {
    // dispatch(resetCreation())
    dispatch(resetCustomerBySearch(search))
    // dispatch(resetPassword())
  }

  // const _openShowAddRole = () => {
  //   let currentModal = 'add'
  //   if (showAdd) {
  //     setShowAdd(false)
  //   }
  //   if (showEdit) {
  //     currentModal = 'edit'
  //     setShowEdit(false)
  //   }
  //   setShowAddRole(true);
  //   setModalUpWhileAddRole(currentModal);
  // }

  // const _closeShowAddRole = () => {
  //   switch (modalUpWhileAddRole) {
  //     case 'add':
  //       setShowAdd(true);
  //       break;
  //     case 'edit':
  //       setShowEdit(true);
  //     default:
  //       break;
  //   }
  //   setShowAddRole(false);
  // }

  // useEffect(() => {
  //   resetAll()
  //   dispatch(resetActivateDeactivate())
  // }, [])

  useEffect(() => {
    resetAll();
  }, [])

  const cancelConfirmBox = () => {
    setConfirm(false)
    resetAll()
  }

  useEffect(() => {
    if (fetchBySearchData) {
      setEditPayload(fetchBySearchData)
      setShowEdit(true);
      return
    }
    if(fetchBySearchFailed) setConfirm(true)
  }, [fetchBySearchData, fetchBySearchFailed])

  // actions on table
  // const actions = [
  //   {
  //     name: 'Change Password',
  //     type: 'text',
  //     fn: d => {
  //       setEditPayload(d)
  //       setShowChangePw(true)
  //     }
  //   },
  //   {
  //     name: 'Edit',
  //     type: 'text',
  //     fn: d => {
  //       setEditPayload(d)
  //       setShowEdit(true)
  //     }
  //   },
  //   {
  //     type: 'status',
  //     prop: 'isActive',
  //     trueValue: 'Deactivate',
  //     falseValue: 'Activate',
  //     fn: d => {
  //       setItemToDelete(d)
  //       setConfirm(true)
  //     }
  //   }
  // ]

  const submit = e => {
    e.preventDefault();

    if (search) handleConfirm();
  }
  let addButton = <Button style={{ borderRadius: 100, padding: '5px 20px', backgroundColor: '#00678F' }} onClick={() => setShowAdd(true)}>
    <span className="button-label" style={{ color: 'white' }}>ADD NEW &nbsp; +</span>
  </Button>

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Customers</span>
      </div>
      <form onSubmit={submit}>
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
              {loadingBySearch ? (
                <Spinner variant="secondary" />
              ) : (
                'Check for Customer'
              )}
            </span>
          </Button>
        </div>
      </form>
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
        <EditCustomer
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editPayload={editPayload}
        // load={load}
        />
      )}

      {confirm && (
        <ConfirmBox
          hideConfirm={true}
          // hideConfirm={changing || changeSuccess || changeFailed}
          showConfirm={confirm}
          // onConfirm={handleConfirm}
          onCancel={cancelConfirmBox}
          confirmTitle="Error"
          confirmMsg="Something went wrong or customer not found. Click anywhere outside this box to continue."
          is_request_processing={false}
        />
      )}
    </div>
  );
};

export default Customers;