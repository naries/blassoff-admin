import React, { useEffect } from "react";
import { store } from "../RecordingContext";
import { renderRecording } from "../../../modules/renderRecording";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import PlayIcon from "../../../assets/svg/play-circle.svg";
import DragIcon from "../../../assets/svg/drag-icon.svg";
import EditIcon from "../../../assets/svg/edit-white.svg";
import AddCircleBlack from "../../../assets/svg/add-circle-black.svg";
import OptionsHorizontal from "../../../assets/svg/options-horizontal.svg";
import UploadBlack from "../../../assets/svg/upload-black.svg";
import "./style.css";

export const Library = () => {
  const globalState = React.useContext(store);
  const { state } = globalState;
  const { recordings } = state;
  const list = document.getElementById("recordings");

  // useEffect(() => {
  //   if (recordings) {
  //     renderRecording(recordings, list);
  //   }
  // }, [recordings]);

  return (
    <div className="bg-grey-100">
      <div className="bg-yellow p-1 d-flex align-items-center justify-content-center text-white">
        Reuse your previously uploaded or recorded audio
      </div>

      <div className="bg-white-smoke new-pod-container d-flex">
        <div className="uploaded-files-container">
          <div className="d-flex justify-content-between">
            <button className="podcasts-upload-btn">
              <img className="mr-2" src={UploadBlack} alt="upload-black" />
              Upload Audio files
            </button>
            <div className="search-files">
              <img src={SearchIcon} alt="search icon" />
              <input placeholder="Search recorded and uploaded audio files" />
            </div>
          </div>

          <div className="mt-3">
            <ul className="podcast-file-list">
              {recordings.length > 0 ? (
                <>
                  {recordings.map((rec, index) => (
                    <li key={index} className="podcast-file-list-item">
                      <div className="d-flex align-items-center justify-content-center .date">
                        <img alt="drag-icon" src={DragIcon} />
                        <img className="ml-3" alt="drag-icon" src={PlayIcon} />
                        <div className="ml-3">
                          <div className="date">19/05/2021</div>
                          <div className="time">03:23</div>
                        </div>
                        <img className="ml-4" alt="edit-icon" src={EditIcon} />
                      </div>
                      <div>
                        <img src={AddCircleBlack} alt="add-circle-black" />
                        <img
                          className="ml-3"
                          src={OptionsHorizontal}
                          alt="options-horizontal"
                        />
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <li className="podcast-file-list-item no-items">No recording has been added. You can add new recordings by switching to the record tab.</li>
              )}
              <li>
                <ul id="recordings"></ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="file-edit-container">
          <div className="edit-box h-100">
            <div className="bg-white-smoke smoke-bg h-100">
              <div className="title">Edited Episodes</div>

              <div className="white-spacer">&nbsp;</div>

              <div className="edit-box-empty">
                <div className="no-episode">No Episode</div>
                <div className="select-file">Select Audio file to edit</div>
              </div>

              <div className="bottom-player">
                <div className="edit-player-bg">
                  <div className="d-flex">
                    <img alt="play-icon" src={PlayIcon} />
                    <div className="edit-preview-txt">Preview</div>
                  </div>

                  <div className="edit-play-time">
                    <span className="total-length">Total Length: </span>
                    <span className="play-time"> &nbsp; 00:00</span>
                  </div>
                </div>
                <button className="submit-edited-episode">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
