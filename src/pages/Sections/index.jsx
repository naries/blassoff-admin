import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTable from "./SectionTable";
import AddSection from "./Add";
import EditSection from "./Edit";
import {
  deleteSection,
  getSections,
  getSection
} from "../../store/sections";
import { Button } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css"

const Sections = () => {
  const sectionData = useSelector(getSections);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editPayload, setEditPayload] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const pageSize = 10;

  const getOffSet = () => {
    if (currentPage > 1) {
      return (currentPage - 1) * pageSize;
    } else {
      return 0;
    }
  };

  const loadSection = () => {
    dispatch(
      getSection({
        limit: pageSize,
        offset: getOffSet(),
      })
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page?.selected + 1);
  };

  const handleConfirm = () => {
    //delete here
    dispatch(deleteSection(itemToDelete));
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Section</span>

        <div>
          <Button variant="warning" onClick={() => setShowAdd(true)}>
            <span className="button-label">+ Add Section</span>
          </Button>
        </div>
      </div>
      <div className="py-4 content">
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <SectionTable
            setConfirmDelete={setConfirmDelete}
            setItemToDelete={setItemToDelete}
            setEditPayload={setEditPayload}
            setShowEdit={setShowEdit}
            loadSection={loadSection}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
      </div>
      {showAdd && (
        <AddSection
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          loadSection={loadSection}
        />
      )}
      {showEdit && (
        <EditSection
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editPayload={editPayload}
          loadSection={loadSection}
        />
      )}
      {confirmDelete && (
        <ConfirmBox
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle="Are you sure?"
          confirmMsg="You are about to delete selected Section. Please confirm or press cancel to return"
          is_request_processing={sectionData?.deleting}
        />
      )}
    </div>
  );
};

export default Sections;
