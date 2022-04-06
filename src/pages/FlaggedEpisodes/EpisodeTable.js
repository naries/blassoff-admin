import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../../assets/svg/delete-episode.svg";
import moment from "moment";
import { isEmpty } from "lodash";
import EditBlack from "../../assets/svg/edit-black.svg";
import Download from "../../assets/svg/download.svg";
import { getAllPods, getPodCasts } from "../../store/podcast";
import { loadState } from "../../helpers/local_storage";
import {
  deleteEpisode,
  getEpisodeByVisibility,
  getEpisodes,
  resetData,
  resetSuspend,
  suspend,
} from "../../store/episodes";
import Skeleton from "react-loading-skeleton";
import { ConfirmBox } from "../../components/ConfirmBox";
import { toast } from "react-toastify";
import { formatDate } from "../../helpers/date";
import Suspend from '../../assets/svg/suspend.svg'

export const EpisodeTable = (props) => {
  const dispatch = useDispatch();
  const userId = loadState() && loadState().userId;
  const { setEp, setUpdate, dateState } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [workItem, setWorkItem] = useState();
  const [action, setAction] = useState('suspend')
  const [confirm, setConfirm] = useState(false);

  const epData = useSelector(getEpisodes);
  const episodes = epData && epData.fetchFlaggedData ? epData.fetchFlaggedData.episodes : [];
  const totalCounts =
    epData && epData.fetchFlaggedData ? epData.fetchFlaggedData.totalCounts : 0;
  const podcasts = useSelector(getPodCasts);
  const [pageOffset, setPageOffset] = useState(0);

  const { suspendFailed, suspended } = epData


  const pageSize = 10;

  //grab the episodes when the header is loading
  useEffect(() => {
    if (userId) {
      fetchEpisodes();
      dispatch(getAllPods());
    }
  }, [userId, pageOffset, dateState]);

  const fetchEpisodes = () => {
    dispatch(
      getEpisodeByVisibility({
        // userId,
        limit: pageSize,
        offset: pageOffset * pageSize,
        startDate: formatDate(dateState?.start),
        endDate: formatDate(dateState?.end),
        visibility: 'FLAGGED'
      })
    );
  };

  useEffect(() => {
    if (epData?.deleteData === "Successful") {
      setConfirmDelete(false);
      toast.success("Episode deleted successfully", {
        autoClose: 1000,
      });
      fetchEpisodes();
      dispatch(resetData());
    }

    if (epData.deleteFailed) {
      setConfirmDelete(false);
      toast.error("Unable to delete episode", {
        // autoClose: 1000,
        position: "bottom-center",
        onClose: () => {
          dispatch(resetData());
          fetchEpisodes();
        },
      });
    }
  }, [epData]);

  const getPodTitle = (id) => {
    let value = [];
    value = podcasts?.fetchAllData?.podCast.filter(
      (data) => data.show_id === id
    );

    if (!isEmpty(value)) {
      return value[0].title;
    }
  };

  const handlePageChange = (event) => {
    setPageOffset(event.selected);
  };

  const download = (link) => {
    var element = document.createElement("a");
    element.setAttribute("href", link);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const pageCount = Math.ceil(totalCounts / pageSize);

  const handleConfirm = () => {
    //delete here
    dispatch(
      deleteEpisode({
        episodeId: itemToDelete?._id,
      })
    );
  };

  const handleConfirmBox = () => {
    dispatch(resetSuspend());
    let param2;
    if (action && action === 'suspend') {
      param2 = workItem?.visibility !== 'SUSPENDED' ? 'SUSPENDED' : 'PUBLIC'
    } else {
      param2 = workItem?.visibility !== 'FLAGGED' ? 'FLAGGED' : 'PUBLIC'
    }
    dispatch(suspend(workItem, param2))
  }

  return (
    <div style={{ width: "100%" }}>
      <table className="dashboard-pod-table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Title</th>
            <th scope="col">Podcast</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Flag Count</th>
            <th scope="col">Date Added</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {epData?.fetchingFlagged ? (
            <tr>
              <td colSpan={8}>
                <Skeleton className="p-2 m-1" count={6} />
              </td>
            </tr>
          ) : (
            <>
              {episodes?.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1 + pageOffset * pageSize}</th>
                  <td className="align-middle">
                    <div className="episode-title cut-text-2">{data.title}</div>
                  </td>
                  <td className="align-middle episode-duration">
                    {data?.podcastName}
                  </td>
                  <td className="align-middle episode-visibility">
                    <span
                      className={`badge badge-pill ${data.type === "DRAFT"
                        ? "badge-primary"
                        : "badge-success"
                        } py-1`}
                    >
                      {` ${data &&
                        data.type &&
                        data.type.charAt(0).toUpperCase() +
                        data.type.slice(1).toLowerCase()
                        }`}
                    </span>
                  </td>
                  <td className="align-middle episode-published">
                    <span className="badge badge-pill badge-light py-1">
                      {` ${data &&
                        data.visibility &&
                        data.visibility.charAt(0).toUpperCase() +
                        data.visibility.slice(1).toLowerCase()
                        }`}
                    </span>
                  </td>
                  <td className="align-middle episode-published">
                    <span className="badge badge-pill badge-light py-1">
                      {data?.flagCount}
                    </span>
                  </td>
                  <td className="align-middle episode-published">
                    {moment(data.createdAt).format("MMM, DD YYYY hh:mm")}
                  </td>
                  <td
                    className="align-middle episode-published"
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      className='mr-2'
                      style={{ backgroundColor: data.visibility === "SUSPENDED" && "blueviolet", padding: 8 }}>
                      <img
                        src={Suspend}
                        alt="suspend"
                        title={data.visibility === "SUSPENDED" ? "Unsuspend" : 'Suspend'}
                        style={{ height: 20 }}
                        onClick={(e) => {
                          setAction('suspend')
                          setConfirm(true)
                          setWorkItem(data)
                        }}
                      />
                    </span>
                    {/* <span className='mr-2' style={{ backgroundColor: data.visibility === "FLAGGED" && "blueviolet", padding: 8 }}>
                      <img
                        src={FlagBlack}
                        alt="Flag"
                        title={data.visibility === "FLAGGED" ? "Unflag" : 'Flag'}
                        onClick={(e) => {
                          setAction('flag')
                          setConfirm(true)
                          setWorkItem(data)
                        }}
                      />
                    </span> */}
                    <span className='mr-2' style={{ padding: 8 }}>
                      <img
                        src={EditBlack}
                        alt="edit"
                        onClick={(e) => {
                          e.preventDefault();
                          setEp(data);
                          setUpdate(true);
                        }}
                      />
                    </span>
                    <span className='mr-2' style={{ padding: 8 }}>
                      <img
                        src={Download}
                        alt="edit"
                        className=""
                        onClick={() => download(data.download_url)}
                      />
                    </span>
                    <span className='mr-2' style={{ padding: 8 }}>
                      <img
                        src={Delete}
                        alt="edit"
                        onClick={() => {
                          setItemToDelete(data);
                          setConfirmDelete(true);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
        {episodes?.length > 0 && !epData?.fetchingFlagged && (
          <tfoot>
            <tr>
              <td className="pt-3" colSpan="8">
                <div className="d-flex justify-content-between">
                  <div className="showing">
                    Showing {pageOffset * pageSize + 1} to &nbsp;
                    {totalCounts > (pageOffset + 1) * pageSize ? (pageOffset + 1) * pageSize : totalCounts}&nbsp; of {totalCounts}&nbsp;
                    entries.
                  </div>

                  <ReactPaginate
                    containerClassName="paginate"
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    disabledClassName={"paginate__link--disabled"}
                    activeClassName={"paginate__link--active"}
                    nextLinkClassName="paginate__end-link"
                    previousLinkClassName="paginate__end-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    forcePage={pageOffset}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      {episodes?.length === 0 && !epData?.fetchingFlagged && (
        <div className="d-flex justify-content-center">No Record</div>
      )}

      {confirmDelete && (
        <ConfirmBox
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle="Are you sure?"
          confirmMsg="You are about to delete selected episode. Please confirm or press cancel to return"
          is_request_processing={epData?.deleting}
        />
      )}

      {confirm && (
        <ConfirmBox
          showConfirm={confirm}
          onConfirm={handleConfirmBox}
          onCancel={() => {
            fetchEpisodes();
            setConfirm(false);
            dispatch(resetSuspend());
          }}
          hideConfirm
          confirmTitle={suspendFailed ? "Failed" : suspended ? "Successful" : "Loading..."}
          confirmMsg={suspendFailed ? "That action was not successful." : suspended ? "Action was successful." : "Please wait..."}
          is_request_processing={epData?.suspending}
        />
      )}
    </div>
  );
};
