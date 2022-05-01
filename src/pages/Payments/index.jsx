import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Table } from "../../components/AdminTable";
import AddUser from "./Add";
import EditUser from "./Edit";
import { deactivate, getUser, getUsers, resetCreation, resetActivateDeactivate, resetOneUser, resetPassword } from "../../store/users";
import UpdatePassword from "./UpdatePassword";
import AddRole from "./AddRole";
import { getpayment, getpaymentDetails } from "../../store/payments";

// Props on table
const allProps = [
  {
    name: 'Username',
    type: 'text',
    prop: 'username'
  },
  {
    name: 'Plan',
    type: 'text',
    prop: 'planName'
  },
  {
    name: 'Amount',
    type: 'text',
    prop: 'planAmount',
  },
]

const Payments = () => {
  const payments = useSelector(getpaymentDetails);

  const { loading, data } = payments;

  const dispatch = useDispatch();

  const load = (rows = 50, offset = 0) => {
    dispatch(getpayment({ limit: rows, offset }));
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Payments</span>
      </div>
      <Table
        noSelect
        disableDownload
        selector={payments}
        load={load}
        loading={loading}
        allProps={allProps}
        pick={payments?.data?.model}
        tableName="Users"
        totalCounts={data?.totalCount || data?.length}
      />
      {/* 
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
      )} */}
    </div>
  );
};

export default Payments;