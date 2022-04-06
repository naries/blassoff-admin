import React, { useState, useEffect } from "react";
import { EpisodeTable } from "./EpisodeTable";
import { useSelector } from "react-redux";
import { RecordEpisode, AddEpisode } from "../../components";
import { UpdateEpisode } from "./Edit";
import Record from "../../assets/svg/record-black.svg";
import { Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getEpisodes } from "../../store/episodes";
import { useHistory } from "react-router";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { GridItem } from "../Dashboard/GridItem";

export default function FlaggedEpisodes() {
  const history = useHistory();
  const epData = useSelector(getEpisodes);
  const episodes = epData && epData.fetchFlaggedData ? epData.fetchFlaggedData.episodes : [];

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [recordEpisode, setRecordEpisode] = useState(false);
  const [ep, setEp] = useState();

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }  

  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center py-4">
          <span className="page-title">Flagged Episodes</span>
          <div>
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
              title="EPISODES"
              value={epData?.fetchFlaggedData?.totalCounts?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            <GridItem
              title="EXCLUSIVE"
              value={epData?.fetchFlaggedData?.totalExclusiveEpisodes?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            <GridItem
              title="DOWNLOAD"
              value={epData?.fetchFlaggedData?.totalDownloads?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            <GridItem
              title="LIKES"
              value={epData?.fetchFlaggedData?.totalLikes?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            <GridItem
              title="COMMENTS"
              value={epData?.fetchFlaggedData?.totalComments?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
          </Row>
        </div>


        {!update && (
          <div className="py-4 content">
            <div className="d-flex flex-row flex-wrap justify-content-between">
              <EpisodeTable
                episodes={episodes}
                setEp={setEp}
                setUpdate={setUpdate}
                dateState={dateState}
              />
            </div>
          </div>
        )}
      </div>

      <RecordEpisode open={recordEpisode} setOpen={setRecordEpisode} />
      {open && <AddEpisode open={open} setOpen={setOpen} />}

      {update && (
        <UpdateEpisode
          open={update}
          setOpen={setUpdate}
          selected={ep}
          setUpdate={setUpdate}
        // loadEpisodes={loadEpisodes}
        />
      )}
    </div>
  );
}
