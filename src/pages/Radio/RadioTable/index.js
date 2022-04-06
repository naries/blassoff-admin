import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import moment from "moment";
import EditBlack from "../../../assets/svg/edit-black.svg";
import { loadState } from "../../../helpers/local_storage";
import radio, {
  getRadios,
  resetData,
  toggleActivation,
} from "../../../store/radio";
import { ConfirmBox } from "../../../components/ConfirmBox";
import Delete from "../../../assets/svg/delete-episode.svg";
import UpdateRadio from "../Edit";
import Skeleton from "react-loading-skeleton";
import { getCategory } from "../../../store/category";

const RadioTable = ({
  setConfirmDelete,
  handlePageChange,
  loadRadios,
  currentPage,
  pageSize,
  setItemToDelete,
}) => {
  const userId = loadState() && loadState().userId;
  const dispatch = useDispatch();
  const radioData = useSelector(getRadios);
  const [confirmActivate, showConfirmActivate] = useState(false);
  const [confirmDeactivate, showConfirmDeactivate] = useState(false);
  const { deleteData, deleteFailed } = radioData;
  const [selectedRadio, setSelectedRadio] = useState();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdatePods, setShowUpdatePods] = useState(false);
  const radios =
    radioData && radioData?.fetchData ? radioData.fetchData.radio : [];
  const totalCounts =
    radioData && radioData.fetchData ? radioData.fetchData.totalCounts : 0;

  useEffect(() => {
    if (deleteData) {
      //handle success here
      setConfirmDelete(false);
      loadRadios();
    }
    if (deleteFailed) {
      setConfirmDelete(false);
      loadRadios();
    }
  }, [deleteData]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  //grab the episodes when the header is loading
  useEffect(() => {
    if (userId) {
      loadRadios();
    }
  }, [userId, currentPage]);

  const handleActivate = (status, id) => {
    dispatch(
      toggleActivation({
        status,
        id,
      })
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
              Name
            </th>
            <th className="text-left" scope="col">
              Artwork
            </th>
            <th className="text-left" scope="col">
              Station
            </th>
            <th className="text-left" scope="col">
              URL
            </th>
            {/* <th className="text-left" scope="col">
              Published
            </th> */}
            <th
              className="text-center"
              colSpan={2}
              style={{ minWidth: "85px" }}
              scope="col"
            >
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {radioData?.loading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Skeleton height={25} className="m-1" count={5} />
              </td>
            </tr>
          ) : (
            <>
              {radios &&
                radios.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">
                      {index + 1 + (currentPage - 1) * pageSize}
                    </th>
                    <td className="align-middle">
                      <div className="episode-title">{data?.name}</div>
                    </td>
                    <td className="align-middle">
                      <div className="episode-title">
                        <img
                          style={{ width: "70px" }}
                          src={data?.artwork}
                          alt="artwork"
                        />
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="episode-title">{data.station}</div>
                    </td>

                    <td>{data?.mediaUrl}</td>
                    {/* <td className="align-middle episode-published">
                      {moment(data.createdAt).format("MMM, DD YYYY hh:mm")}
                    </td> */}
                    <td
                      className="episode-published text-right"
                      style={{ cursor: "pointer" }}
                    >
                      {/* <img
                        src={EditBlack}
                        alt="edit"
                        className="mr-2"
                        onClick={() => {
                          setShowUpdate(true);
                          setSelectedRadio(data);
                        }}
                      /> */}
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
        {radios.length > 0 && (
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
      {!radioData?.loading && radios.length === 0 && (
        <div className="d-flex justify-content-center">No Record</div>
      )}

      {confirmActivate && (
        <ConfirmBox
          showConfirm={confirmActivate}
          onConfirm={handleActivate}
          onCancel={() => {
            loadRadios();
            showConfirmActivate(false);
          }}
          confirmTitle="Activate?"
          confirmMsg="This will activate the selected Radio. Please confirm"
          is_request_processing={radioData?.updating}
        />
      )}

      {confirmDeactivate && (
        <ConfirmBox
          showConfirm={confirmDeactivate}
          onConfirm={handleActivate}
          onCancel={() => {
            loadRadios();
            showConfirmDeactivate(false);
          }}
          confirmTitle="Deactivate?"
          confirmMsg="This will de-activate the selected Radio. Please confirm"
          is_request_processing={radioData?.updating}
        />
      )}

      {showUpdate && (
        <UpdateRadio
          showEdit={showUpdate}
          setShowEdit={setShowUpdate}
          editPayload={selectedRadio}
          loadRadios={loadRadios}
        />
      )}
    </div>
  );
};
export default RadioTable;
