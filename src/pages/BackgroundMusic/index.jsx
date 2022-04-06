import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MusicTable from "./MusicTable";
import AddBackgroundMusic from "./Add";
import EditBackgroundMusic from "./Edit";
import {
  deletebgMusic,
  getBgMusic,
  getbgMusics,
} from "../../store/bgMusic";
import { Button } from "react-bootstrap";
import { ConfirmBox } from "../../components/ConfirmBox";

const BackgroundMusic = () => {
  const bgMusicData = useSelector(getbgMusics);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editPayload, setEditPayload] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const dispatch = useDispatch();
  const pageSize = 10;

  const handleConfirm = () => {
    //delete here
    dispatch(deletebgMusic(itemToDelete));
  };

  const loadBgMusic = () => {
    dispatch(
      getBgMusic({
        limit: pageSize,
        offset: 0,
      })
    );
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <span className="page-title">Background Music</span>

        <div>
          <Button variant="warning" onClick={() => setShowAdd(true)}>
            <span className="button-label">+ Add</span>
          </Button>
        </div>
      </div>
      <div className="py-4 content">
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <MusicTable
            setConfirmDelete={setConfirmDelete}
            setItemToDelete={setItemToDelete}
            setEditPayload={setEditPayload}
            setShowEdit={setShowEdit}
            loadBgMusic={loadBgMusic}
          />
        </div>
      </div>
      {showAdd && (
        <AddBackgroundMusic
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          loadBgMusic={loadBgMusic}
        />
      )}
      {showEdit && (
        <EditBackgroundMusic
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editPayload={editPayload}
          loadBgMusic={loadBgMusic}
        />
      )}
      {confirmDelete && (
        <ConfirmBox
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle="Are you sure?"
          confirmMsg="You are about to delete selected background music. Please confirm or press cancel to return"
          is_request_processing={bgMusicData?.deleting}
        />
      )}
    </div>
  );
};

export default BackgroundMusic;
