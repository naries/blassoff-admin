import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Download from "../../assets/svg/2.svg";
import Hour from "../../assets/svg/1.svg";
import Like from "../../assets/svg/3.svg";
import PublishedIcon from "../../assets/svg/4.svg";
import { getDashboardInfo, getDashboardSelector } from "../../store/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { GridItem } from "./GridItem";
import PodcastsTable from "./PodcastsTable";
import { loadState } from "../../helpers/local_storage";
import "./style.css";
import { getPodCasts } from "../../store/podcast";
import { getAuthDetails } from "../../store/auth";
import { generateGreetings } from '../../helpers/Greetings'
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { formatDate } from "../../helpers/date";


export default function Dashboard() {
  const userId = loadState() && loadState().userId;
  const [showFollowingsDialog, setShowFollowingsDialog] = useState(false);
  const [showListeningDialog, setShowListeningDialog] = useState(false);
  const [showDownloadsDialog, setShowDownloadsDialog] = useState(false);
  const [showLikesDialog, setShowLikesDialog] = useState(false);
  const podcasts = useSelector(getPodCasts);
  const dispatch = useDispatch();
  const dashboardData = useSelector(getDashboardSelector);
  const { fetchData, loading } = dashboardData;
  const auth = useSelector(getAuthDetails);

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });

  const pageSize = 10;

  const user = loadState() && loadState().user;

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const fetchDashboardData = (rows = 10, offset = 0) => {
    dispatch(
      getDashboardInfo({
        startDate: formatDate(dateState?.start),
        endDate: formatDate(dateState?.end),
        rows,
        offset
      })
    );
  };


  return (
    <div style={{ borderCollapse: "collapse" }}>
      <div className="dashboard--top">
        <div>{generateGreetings()} {user?.firstname}</div>
        <div className="listener-activities-date-range-picker">
          {/* <DateRangePicker
            initialSettings={{
              startDate: dateState?.start.toDate(),
              endDate: dateState?.end.toDate()
            }}
            onCallback={handleCallback}>
            <input type="text" className="form-control" />
          </DateRangePicker> */}
        </div>
      </div>
      <div className="listener-activities-date-range-picker">
      </div>
      <div className="dashboard--content">
        <div className="d-card-box no-background">
          {/* <div className="d-card-box--general-stats">
            <div className="d-card-box--title">General Statistics</div>
            <div className="d-card-box--count">
              {(podcasts && podcasts.fetchData && podcasts.fetchData.count) || 0} Podcasts
            </div>
            <img src={GeneralStats} alt="general" />
          </div> */}
          <div className="d-card-container mt-2">
            <GridItem
              title="Total Users"
              // value={fetchData?.totalCreatorUsers?.toLocaleString('en-us')}
              value={10}
              icon={Download}
              className=""
              handleClick={() => setShowDownloadsDialog(true)}
            />


            <GridItem
              title="Pending Payouts"
              // value={fetchData?.totalPodcasts?.toLocaleString('en-us')}
              value={20}
              icon={Hour}
              className=""
              handleClick={() => setShowListeningDialog(true)}
            />

            <GridItem
              title="Total Purchases"
              // value={fetchData?.totalEpisodes?.toLocaleString('en-us')}
              value={11}
              icon={Like}
              className=""
              handleClick={() => setShowLikesDialog(true)}
            />

            <GridItem
              title="Total Questions"
              // value={fetchData?.totalListenerUsers?.toLocaleString('en-us')}
              value={4}
              icon={PublishedIcon}
              className=""
              handleClick={() => null}
            />

          </div>
        </div>

        <div className="mt-4 pb-5">
          <Row style={{ gap: "1.5rem" }}>
            <Col xs={12}>
              <div className="card p-3">
                <Row>
                  <Col xs={12}>
                    <PodcastsTable
                      podcasts={fetchData?.podcasts}
                      fetchDashboardData={fetchDashboardData}
                      dashboardData={dashboardData}
                      dateState={dateState}
                    />
                  </Col>
                </Row>
              </div>
            </Col>

            {/* <Col xs={12}>
              <Row>
                <Col xs={12} lg={8}>
                  <div className="card p-3">
                    <ListenerAnalytics />
                  </div>
                </Col>
                <Col xs={12} lg={4}>
                  <div className="card p-3">
                    <CommentsWidget />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <div className="card p-3">
                <ListenerActivities />
              </div>
            </Col> */}

            {/* <Col xs={12}>
              <div className="card p-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <TotalListenMinutes />
                  </div>
                  <div className="col-12 col-lg-6">
                    <LocationsWidget />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="card p-3">
                <PerformanceAnalysis />
              </div>
            </Col> */}
          </Row>
        </div>
      </div>
      {/* <Followings
        showFollowingsDialog={showFollowingsDialog}
        setShowFollowingsDialog={setShowFollowingsDialog}
        totalFollowing={fetchData?.totalSubscribers}
      />
      <ListeningMinutes
        showListeningDialog={showListeningDialog}
        setShowListeningDialog={setShowListeningDialog}
        totalListeningMinutes={round(fetchData?.totalListeningMinutes)}
      />
      <Downloads
        showDownloadsDialog={showDownloadsDialog}
        setShowDownloadsDialog={setShowDownloadsDialog}
        totalEpisodesDownloads={fetchData?.totalEpisodesDownloads}
      />
      <Likes
        showLikesDialog={showLikesDialog}
        setShowLikesDialog={setShowLikesDialog}
        totalLikes={fetchData?.totalLikes}
      /> */}
    </div>
  );
}
