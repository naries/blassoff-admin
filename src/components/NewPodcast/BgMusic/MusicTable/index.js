import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import EditBlack from "../../../../assets/svg/edit-black.svg";
import Delete from "../../../../assets/svg/delete-episode.svg";
import { loadState } from "../../../../helpers/local_storage";
import { getBgMusic, getbgMusics, resetData } from "../../../../store/bgMusic";
import { PageNumbers } from "./PageNumbers";
import { formatTime } from "../../../../modules/getAudioDuration";

const MusicTable = () => {
  const dispatch = useDispatch();
  const userId = loadState() && loadState().userId;

  const musicData = useSelector(getbgMusics);
  const { deleteData, deleteFailed } = musicData;

  const bgMusics =
    musicData && musicData.fetchData ? musicData.fetchData.backGroundMusic : [];
  const totalCounts =
    musicData && musicData.fetchData ? musicData.fetchData.totalCounts : 0;
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const loadBgMusic = () => {
    dispatch(resetData());
    dispatch(
      getBgMusic({
        limit: pageSize,
        offset: 0,
      })
    );
  };

  //grab the episodes when the header is loading
  useEffect(() => {
    loadBgMusic();
  }, [userId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page?.selected + 1);
  };

  const pageCount = Math.ceil(totalCounts / pageSize);

  return (
    <div style={{ width: "100%" }}>
      <table className="dashboard-pod-table">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Title</th>
            <th className="text-left" scope="col">
              Preview
            </th>
            <th scope="col">Type</th>
            <th scope="col">Duration</th>
            <th scope="col">Genre</th>
            <th scope="col">Date Added</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bgMusics.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1 + (currentPage - 1) * pageSize}</th>
              <td className="align-middle">
                <div className="episode-title cut-text-2">{data.title}</div>
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
                &nbsp;
              </td>
            </tr>
          ))}
        </tbody>
        {bgMusics.length > 0 && (
          <tfoot>
            <tr>
              <td className="pt-3" colSpan="8">
                <div className="d-flex justify-content-between">
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
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      {bgMusics.length === 0 && (
        <div className="d-flex justify-content-center">No Record</div>
      )}
    </div>
  );
};
export default MusicTable;
