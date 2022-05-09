import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Download from "../../assets/svg/2.svg";
import Hour from "../../assets/svg/1.svg";
import Like from "../../assets/svg/3.svg";
import PublishedIcon from "../../assets/svg/4.svg";
import { getDashboardInfo, getDashboardSelector, getDashboardStats } from "../../store/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { GridItem } from "./GridItem";
import { loadState } from "../../helpers/local_storage";
import "./style.css";
import { generateGreetings } from '../../helpers/Greetings'
import moment from "moment";
import { Table } from "../../components/AdminTable";

// Props on table
const allProps = [
  {
    name: 'Title',
    type: 'text',
    prop: 'title'
  },
  {
    name: 'Email',
    type: 'text',
    prop: 'email'
  },
  {
    name: 'Message',
    type: 'text',
    prop: 'message'
  },
  // {
  //   name: 'Date',
  //   type: 'date',
  //   prop: 'dateCreated'
  // },
]

export default function Dashboard() {
  const userId = loadState() && loadState().userId;
  const dispatch = useDispatch();
  const dashboardData = useSelector(getDashboardSelector);
  const { fetchData, fetchStatsData, loadingStats, loading } = dashboardData;
  const [search, setSearch] = useState();

  const [dateState, setDateState] = useState({
    start: moment().subtract(6, 'months'),
    end: moment(),
  });

  console.log(dashboardData);

  const user = loadState() && loadState().user;

  const handleCallback = (start, end, label) => {
    setDateState({ start, end })
  }

  const load = (rows = 10, offset = 0) => {
    dispatch(
      getDashboardInfo({
        limit: rows,
        offset
      })
    );
    dispatch(
      getDashboardStats()
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
              value={fetchStatsData?.totalUsers}
              icon={Download}
              className=""
            />


            <GridItem
              title="Pending Payouts"
              // value={fetchData?.totalPodcasts?.toLocaleString('en-us')}
              value={fetchStatsData?.pendingPayouts}
              icon={Hour}
              className=""
            />

            <GridItem
              title="Total Orders"
              // value={fetchData?.totalEpisodes?.toLocaleString('en-us')}
              value={fetchStatsData?.totalOrders}
              icon={Like}
              className=""
            />

            <GridItem
              title="Live Questions"
              // value={fetchData?.totalListenerUsers?.toLocaleString('en-us')}
              value={fetchStatsData?.liveQuestions}
              icon={PublishedIcon}
              className=""
            />

            <GridItem
              title="Free Questions"
              // value={fetchData?.totalListenerUsers?.toLocaleString('en-us')}
              value={fetchStatsData?.freeQuestions}
              icon={PublishedIcon}
              className=""
            />

          </div>
        </div>

        <div className="mt-4 pb-5">
          <Row style={{ gap: "1.5rem" }}>
            <Col xs={12}>
              <div className="card">
                <Row>
                  <Col xs={12}>
                    <Table
                      noDisplay
                      noSelect
                      disableDownload
                      selector={fetchData}
                      load={load}
                      loading={loading}
                      allProps={allProps}
                      pick={fetchData?.model}
                      tableName="Audit"
                      totalCounts={fetchData?.totalCount || fetchData?.model?.length}
                      searchString={search}
                      setSearchString={setSearch}
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
