import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BannerTable from "./BannerTable";
import AddBanner from "./Add";
import EditBanner from "./Edit";
import {
  getBanners,
  getBanner
} from "../../store/banners";
import { Button } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";
import "./style.css"

const Banners = () => {
  const bannerData = useSelector(getBanners);

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

  const loadBanners = () => {
    dispatch(
      getBanner({
        limit: pageSize,
        offset: getOffSet(),
      })
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page?.selected + 1);
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Banners</span>

        <div>
          <Button variant="warning" onClick={() => setShowAdd(true)}>
            <span className="button-label">+ Add Banner</span>
          </Button>
        </div>
      </div>
      <div className="py-4 content">
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <BannerTable
            setConfirmDelete={setConfirmDelete}
            setItemToDelete={setItemToDelete}
            setEditPayload={setEditPayload}
            setShowEdit={setShowEdit}
            loadBanners={loadBanners}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            pageSize={pageSize}
            confirmDelete={confirmDelete}
            itemToDelete={itemToDelete}
          />
        </div>
      </div>
      {showAdd && (
        <AddBanner
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          loadBanners={loadBanners}
        />
      )}
      {showEdit && (
        <EditBanner
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editPayload={editPayload}
          loadBanners={loadBanners}
        />
      )}
     
    </div>
  );
};

export default Banners;
