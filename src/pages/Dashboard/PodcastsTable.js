import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";
import { loadState } from "../../helpers/local_storage";
import { PageNumbers } from "../../components/PageNumbers";
import ActionIcon from "../../assets/svg/action-icon.svg";
import { round } from "../../helpers/round";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
} from "react-super-responsive-table";
import "./style.css";
import { millisToMinutesAndSeconds } from "../../helpers/millsToMinutes";

const PodcastsTable = ({ podcasts, fetchDashboardData, dashboardData, dateState }) => {
  const userId = loadState() && loadState().userId;

  const totalCounts = dashboardData?.fetchData?.totalPodcasts || 0;
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const getOffSet = () => {
    if (currentPage > 1) {
      return (currentPage - 1) * pageSize;
    } else {
      return 0;
    }
  };

  //grab the episodes when the header is loading
  useEffect(() => {
    let offset = getOffSet();
    fetchDashboardData(10, offset);
  }, [userId, currentPage, dateState]);

  const handlePageChange = (page) => {
    setCurrentPage(page?.selected + 1);
  };

  const pageCount = Math.ceil(totalCounts / pageSize);

  return (
    <div className="">
      <span className="chart-title">
        USER AUDIT LOGS
      </span>

      <div style={{ width: "100%", overflow: "scroll" }} className="mt-3">
        <Table className="dashboard-pod-table">
          <Thead>
            <Tr>
              <Th scope="col">S/N</Th>
              <Th className="text-left" scope="col">
                Audit Title
              </Th>
              <Th className="text-left" scope="col">
                Audit Message
              </Th>
              <Th className="text-left" scope="col">
                Audit Date
              </Th>
              <Th className="text-left" scope="col">
                Audit User
              </Th>
              {/* <Th className="text-left" scope="col">
                Action
              </Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {!dashboardData?.loading ? (
              <>
                {podcasts &&
                  podcasts.map((pod, index) => (
                    <Tr key={index}>
                      <Td>
                        <div className="title" style={{ width: "20px" }}>
                          {index + 1 + (currentPage - 1) * pageSize}
                        </div>
                      </Td>
                      <Td className="align-middle">
                        <div className="title">{pod.title}</div>
                      </Td>
                      <Td className="align-middle">{pod.episodes}</Td>
                      <Td className="align-middle episode-visibility">
                        <span>{millisToMinutesAndSeconds(pod.listeningMinuites, 1)}</span>
                      </Td>
                      <Td className="align-middle episode-duration">
                        {millisToMinutesAndSeconds(pod.uniquelistening)}
                      </Td>
                      {/* <Td className="align-middle episode-published">
                        <img src={ActionIcon} alt="action icn" />
                      </Td> */}
                    </Tr>
                  ))}
              </>
            ) : null}
          </Tbody>
        </Table>
      </div>
      {podcasts && podcasts.length > 0 && !dashboardData?.loading && (
        <div className="d-flex justify-content-between mt-4">
          <PageNumbers
            pageSize={pageSize}
            totalCounts={totalCounts}
            currentPage={currentPage}
          />

          <ReactPaginate
            pageCount={pageCount}
            pageRange={2}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="paginate"
            previousLabel={"<<"}
            nextLabel={">>"}
            disabledClassName={"paginate__link--disabled"}
            activeClassName={"paginate__link--active"}
            nextLinkClassName="paginate__end-link"
            previousLinkClassName="paginate__end-link"
          />
        </div>
      )}
      {dashboardData?.loading && <Skeleton count={6} />}
      {!dashboardData?.loading && podcasts && podcasts.length === 0 && (
        <div className="d-flex justify-content-center">No Record</div>
      )}
    </div>
  );
};
export default PodcastsTable;
