import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import moment from "moment";
import EditBlack from "../../../assets/svg/edit-black.svg";
import { loadState } from "../../../helpers/local_storage";
import {
  deleteBanner,
  getBanners,
  resetData,
  toggleActivation,
} from "../../../store/banners";
import { ConfirmBox } from "../../../components/ConfirmBox";
import Delete from "../../../assets/svg/delete-episode.svg";
import UpdateBanner from "../Edit";
import Skeleton from "react-loading-skeleton";

const BannerTable = ({
  setConfirmDelete,
  confirmDelete,
  handlePageChange,
  loadBanners,
  currentPage,
  pageSize,
  setItemToDelete,
  itemToDelete
}) => {
  const userId = loadState() && loadState().userId;
  const dispatch = useDispatch();
  const bannerData = useSelector(getBanners);
  const [confirmActivate, showConfirmActivate] = useState(false);
  const [confirmDeactivate, showConfirmDeactivate] = useState(false);
  const { rdeleting, rdeleteData, rdeleteFailed } = bannerData;
  const [selectedBanner, setSelectedBanner] = useState();
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdatePods, setShowUpdatePods] = useState(false);
  const banners =
    bannerData && bannerData?.fetchData ? bannerData.fetchData.banners : [];
  const totalCounts =
    bannerData && bannerData.fetchData ? bannerData.fetchData.totalCounts : 0;

  const handleConfirm = () => {
    // delete here
    dispatch(
      deleteBanner({
        _id: itemToDelete?._id,
      })
    );
  };

  useEffect(() => {
    if (rdeleteData) {
      //handle success here
      setConfirmDelete(false);
      loadBanners();
    }
    if (rdeleteFailed) {
      setConfirmDelete(false);
      loadBanners();
    }
  }, [rdeleteData]);

  //grab the episodes when the header is loading
  useEffect(() => {
    if (userId) {
      loadBanners();
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

  useEffect(() => {
    loadBanners();
    dispatch(resetData())
  }, [bannerData?.deleteData])

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
              Banner Image
            </th>
            <th className="text-left" scope="col">
              position
            </th>
            <th className="text-left" scope="col">
              Show?
            </th>
            <th className="text-left" scope="col">
              Published
            </th>
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
          {bannerData?.loading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Skeleton height={25} className="m-1" count={5} />
              </td>
            </tr>
          ) : (
            <>
              {banners &&
                banners.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">
                      {index + 1 + (currentPage - 1) * pageSize}
                    </th>
                    <td className="align-middle">
                      <div className="episode-title">
                        {data?.podCast?.title}
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="episode-title">
                        <img src={data?.artwork} alt="artwork" width={100} />
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="episode-title">{data.position}</div>
                    </td>

                    <td className="align-middle">
                      <div className="episode-title" style={{ minWidth: "100px" }}>
                        <BootstrapSwitchButton
                          onstyle="warning"
                          checked={data?.show}
                          onlabel="Yes"
                          offlabel="No"
                          size="sm"
                          disabled={bannerData.deleting}
                          onChange={(val) => {
                            handleActivate(val, data?._id);
                          }}
                        />
                      </div>
                    </td>
                    <td className="align-middle episode-published">
                      {moment(data.createdAt).format("MMM, DD YYYY hh:mm")}
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
                          setSelectedBanner(data);
                        }}
                      />

                      <img
                        src={Delete}
                        alt="delete"
                        className="ml-2"
                        onClick={() => {
                          setItemToDelete(data);
                          setConfirmDelete(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
        {banners.length > 0 && (
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
      {!bannerData?.loading && banners.length === 0 && (
        <div className="d-flex justify-content-center">No Record</div>
      )}

      {confirmActivate && (
        <ConfirmBox
          showConfirm={confirmActivate}
          onConfirm={handleActivate}
          onCancel={() => {
            loadBanners();
            showConfirmActivate(false);
          }}
          confirmTitle="Activate?"
          confirmMsg="This will activate the selected banner. Please confirm"
          is_request_processing={bannerData?.updating}
        />
      )}

      {confirmDeactivate && (
        <ConfirmBox
          showConfirm={confirmDeactivate}
          onConfirm={handleActivate}
          onCancel={() => {
            loadBanners();
            showConfirmDeactivate(false);
          }}
          confirmTitle="Deactivate?"
          confirmMsg="This will de-activate the selected banner. Please confirm"
          is_request_processing={bannerData?.updating}
        />
      )}

      {showUpdate && (
        <UpdateBanner
          showEdit={showUpdate}
          setShowEdit={setShowUpdate}
          editPayload={selectedBanner}
          loadBanners={loadBanners}
        />
      )}

      {confirmDelete && (
        <ConfirmBox
          showConfirm={confirmDelete}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          confirmTitle="Are you sure?"
          confirmMsg="You are about to delete a banner. Please confirm or press cancel to return"
          is_request_processing={rdeleting}
        />
      )}
    </div>
  );
};
export default BannerTable;
