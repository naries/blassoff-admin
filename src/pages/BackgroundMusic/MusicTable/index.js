import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import EditBlack from "../../../assets/svg/edit-black.svg";
import Delete from "../../../assets/svg/delete-episode.svg";
import { loadState } from "../../../helpers/local_storage";
import { getbgMusics, getBgMusic } from "../../../store/bgMusic";
import { formatTime } from "../../../modules/getAudioDuration";

const MusicTable = ({
  setConfirmDelete,
  setShowEdit,
  setItemToDelete,
  loadBgMusic,
  setEditPayload,
}) => {
  const dispatch = useDispatch();
  const userId = loadState() && loadState().userId;

  const musicData = useSelector(getbgMusics);
  const { deleteData, deleteFailed } = musicData;

  const bgMusics =
    musicData && musicData.fetchData ? musicData.fetchData.backGroundMusic : [];
  const totalCounts =
    musicData && musicData.fetchData ? musicData.fetchData.totalCounts : 0;
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 50;

  const getOffSet = () => {
    if (currentPage > 1) {
      return (currentPage - 1) * pageSize;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (deleteData) {
      //handle success here
      setConfirmDelete(false);
      loadBgMusic();
    }
    if (deleteFailed) {
      setConfirmDelete(false);
      loadBgMusic();
    }
  }, [deleteData]);

  //grab the episodes when the header is loading
  useEffect(() => {
    if (userId) {
      dispatch(
        getBgMusic({
          limit: pageSize,
          offset: getOffSet(),
        })
      );
    }
  }, [userId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page?.selected + 1);
  };

  const pageCount = Math.ceil(totalCounts / pageSize);

  return (
    <div style={{ width: "100%" }}>
      <table className="dashboard-pod-table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S/N</th>
            <th className="text-left" scope="col">
              Title
            </th>
            <th className="text-left" scope="col">
              Preview
            </th>
            <th className="text-left" scope="col">
              Type
            </th>
            <th className="text-left" scope="col">
              Duration
            </th>
            <th className="text-left" scope="col">
              Genre
            </th>
            <th className="text-left" scope="col">
              Date Added
            </th>
            <th style={{ minWidth: "85px" }} scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {musicData?.loading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Spinner animation="border" variant="secondary" />
              </td>
            </tr>
          ) : null}
          {bgMusics.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1 + (currentPage - 1) * pageSize}</th>
              <td className="align-middle">
                <div className="episode-title">{data.title}</div>
              </td>
              <td className="align-middle">
                <audio controls className="w-100">
                  <source src={data.audio_s3} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </td>
              <td className="align-middle episode-visibility">
                <span>{data?.type}</span>
              </td>
              <td className="align-middle episode-duration">
                {formatTime(data?.duration)}
              </td>
              <td className="align-middle episode-visibility">
                <span>{data?.genre}</span>
              </td>

              <td className="align-middle episode-published">
                {moment(data.createdAt).format("MMM, DD YYYY hh:mm")}
              </td>
              <td
                className="align-middle episode-published text-center"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={EditBlack}
                  alt="edit"
                  className="mr-2"
                  onClick={() => {
                    setEditPayload(data);
                    setShowEdit(true);
                  }}
                />
                <img
                  src={Delete}
                  alt="edit"
                  className=""
                  onClick={() => {
                    setConfirmDelete(true);
                    setItemToDelete(data?._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        {bgMusics.length > 0 && (
          <tfoot>
            <tr>
              <td className="pt-3" colSpan="8">
                <div className="d-flex justify-content-between">
                  <div className="showing">
                    Showing {pageSize * (currentPage - 1) + 1} to{" "}
                    {pageSize * (currentPage - 1) +
                      (totalCounts < 10 ? totalCounts : 10)}{" "}
                    of {totalCounts}&nbsp; entries.
                  </div>

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
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      {!musicData?.loading && bgMusics.length === 0 && (
        <div className="d-flex justify-content-center">No Record</div>
      )}
    </div>
  );
};
export default MusicTable;
