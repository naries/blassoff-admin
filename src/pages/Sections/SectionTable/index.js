import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import EditBlack from "../../../assets/svg/edit-black.svg";
import Delete from "../../../assets/svg/delete-episode.svg";
import { loadState } from "../../../helpers/local_storage";
import { deleteSection, getSections, resetData, updateSection } from "../../../store/sections";
import { ConfirmBox } from "../../../components/ConfirmBox";
import UpdateSection from "../Edit";
import UpdateSectionPodcasts from "../UpdateSectionPodcasts";
import Skeleton from "react-loading-skeleton";

const SectionTable = ({
  handlePageChange,
  loadSection,
  currentPage,
  pageSize,
}) => {
  const userId = loadState() && loadState().userId;
  const dispatch = useDispatch();
  const sectionData = useSelector(getSections);
  const [confirmActivate, showConfirmActivate] = useState(false);
  const [confirmDeactivate, showConfirmDeactivate] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { deleteData, deleteFailed } = sectionData;
  const [selectedSection, setSelectedSection] = useState();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdatePods, setShowUpdatePods] = useState(false);
  const sections =
    sectionData && sectionData?.fetchData ? sectionData.fetchData.sections : [];
  const totalCounts =
    sectionData && sectionData.fetchData
      ? sectionData.fetchData.totalCounts
      : 0;

  useEffect(() => {
    if (deleteData) {
      //handle success here
      setConfirmDelete(false);
      loadSection();
    }
    if (deleteFailed) {
      setConfirmDelete(false);
      loadSection();
    }
  }, [deleteData]);

  //grab the episodes when the header is loading
  useEffect(() => {
    if (userId) {
      loadSection();
    }
  }, [userId, currentPage]);

  const handleActivate = () => {
    dispatch(resetData());

    dispatch(
      updateSection({
        data: {
          title: selectedSection?.title,
          position: selectedSection?.position,
          audAppSpecific: selectedSection?.audAppSpecific,
        },
        id: selectedSection?._id,
      })
    );
  };

  const handleConfirm = () => {
    //delete here
    dispatch(
      deleteSection(itemToDelete?._id)
    );
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
              Date Added
            </th>
            <th className="text-left" scope="col">
              Status
            </th>
            <th
              className="text-center"
              colSpan={2}
              style={{ minWidth: "85px" }}
              scope="col"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sectionData?.loading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Skeleton count={10} className="m-1 p-2" />
              </td>
            </tr>
          ) : (
            <>
              {sections?.length ? (
                <>
                  {sections.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {index + 1 + (currentPage - 1) * pageSize}
                      </th>
                      <td className="align-middle">
                        <div className="episode-title">{data.title}</div>
                      </td>

                      <td className="align-middle episode-published">
                        {moment(data.createdAt).format("MMM, DD YYYY hh:mm")}
                      </td>
                      <td className="align-middle">
                        <div className="episode-title">
                          {data?.show === true ? (
                            <span className="badge badge-pill badge-success py-1">
                              active
                            </span>
                          ) : (
                            <span className="badge badge-pill badge-light py-1">
                              inactive
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className="episode-published text-right"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={EditBlack}
                          alt="edit"
                          className="mr-2"
                          onClick={() => {
                            setShowUpdate(true);
                            setSelectedSection(data);
                          }}
                        />
                        <img
                          src={Delete}
                          alt="delete"
                          className="mr-2"
                          onClick={() => {
                            setItemToDelete(data);
                            setConfirmDelete(true);
                          }}
                        />
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => {
                            setShowUpdatePods(true);
                            setSelectedSection(data);
                          }}
                          className="btn btn-light btn-sm"
                        >
                          Manage Podcasts
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="8">
                    <Skeleton count={10} className="m-1 p-2" />
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
        {sections.length > 0 && (
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
      {!sectionData?.loading && sections.length === 0 && (
        <div className="d-flex justify-content-center">No Record</div>
      )}

      {confirmActivate && (
        <ConfirmBox
          showConfirm={confirmActivate}
          onConfirm={handleActivate}
          onCancel={() => {
            loadSection();
            showConfirmActivate(false);
          }}
          confirmTitle="Activate?"
          confirmMsg="This will activate the selected section. Please confirm"
          is_request_processing={sectionData?.updating}
        />
      )}

      {confirmDeactivate && (
        <ConfirmBox
          showConfirm={confirmDeactivate}
          onConfirm={handleActivate}
          onCancel={() => {
            loadSection();
            showConfirmDeactivate(false);
          }}
          confirmTitle="Deactivate?"
          confirmMsg="This will de-activate the selected section. Please confirm"
          is_request_processing={sectionData?.updating}
        />
      )}

      {showUpdate && (
        <UpdateSection
          showEdit={showUpdate}
          setShowEdit={setShowUpdate}
          editPayload={selectedSection}
          loadSection={loadSection}
        />
      )}

      {showUpdatePods && (
        <UpdateSectionPodcasts
          showEdit={showUpdatePods}
          setShowEdit={setShowUpdatePods}
          editPayload={selectedSection}
          loadSection={loadSection}
        />
      )}

      {confirmDelete && (
        <ConfirmBox
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle="Are you sure?"
          confirmMsg="You are about to delete selected sections. Please confirm or press cancel to return"
          is_request_processing={sectionData?.deleting}
        />
      )}
    </div>
  );
};
export default SectionTable;
