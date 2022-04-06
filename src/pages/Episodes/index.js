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

export default function Episodes() {
  const history = useHistory();
  const epData = useSelector(getEpisodes);
  const episodes = epData && epData.fetchData ? epData.fetchData.episodes : [];

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
          <span className="page-title">Episodes</span>
          <div>
            <DateRangePicker
              initialSettings={{
                startDate: dateState?.start.toDate(),
                endDate: dateState?.end.toDate()
              }}
              onCallback={handleCallback}>
              <input type="text" className="form-control" />
            </DateRangePicker>
            {/* <Button
              variant="warning"
              onClick={() => setRecordEpisode(true)}
              className="mr-2"
            >
              <span className="button-label">
                <img src={Record} alt="record" /> Record Episode
              </span>
            </Button> */}
            {/* <Button
              variant="warning"
              onClick={() => history.push("/episodes/new")}
            >
              <span className="button-label">+ Add Episodes</span>
            </Button> */}
          </div>
        </div>

        <div className="d-card-container mt-2">
          <Row>

            <GridItem
              title="EPISODES"
              value={epData?.fetchData?.totalCounts?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            <GridItem
              title="EXCLUSIVE"
              value={epData?.fetchData?.totalExclusiveEpisodes?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            <GridItem
              title="DOWNLOAD"
              value={epData?.fetchData?.totalDownloads?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            {/* <GridItem
              title="SHARES"
              value={epData?.fetchData?.activeCreatorTotal?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            /> */}
            <GridItem
              title="LIKES"
              value={epData?.fetchData?.totalLikes?.toLocaleString("en-US")}
              className="col-md-2 mr-2 mb-2"
            />
            <GridItem
              title="COMMENTS"
              value={epData?.fetchData?.totalComments?.toLocaleString("en-US")}
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
