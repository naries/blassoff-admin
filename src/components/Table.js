import React, { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../modules/onClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Edit from "../assets/svg/edit-white.svg";
import Share from "../assets/svg/share.svg";
import Delete from "../assets/svg/delete.svg";
import EditBlack from "../assets/svg/edit-black.svg";
import Download from "../assets/svg/download.svg";
import AudioPlayer from "./AudioPlayer";
import SelectAction from "../assets/svg/select-action.svg";
import Pagination from "./Pagination";
import paginate from "../modules/paginate";
import moment from "moment";
import "../styles/Table.css";

export const PodcastTable = (props) => {
  const { setDeleteId, setDelete, data, searchParam, setEp, setUpdate } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const episodes = data && data.podEpisode ? data.podEpisode.episode : [];

  const [selectedId, setId] = useState();
  const [epData, setEpData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (searchParam !== "") {
      let val = [];
      val = episodes.filter((value) =>
        value.title.toUpperCase().includes(searchParam.toUpperCase())
      );
      setEpData(val);
    } else {
      setEpData(episodes);
    }
  }, [episodes, searchParam]);

  const ref = useRef();
  useOnClickOutside(ref, () => setId());

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const episodesData = paginate(epData, currentPage, pageSize);


  return (
    <div style={{ width: "100%" }}>
      <table className="dashboard-pod-table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Picture</th>
            <th scope="col">Episode</th>
            <th scope="col">Duration</th>
            <th scope="col">Visibility</th>
            <th scope="col">Published</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {episodesData.length > 0 &&
            episodesData.map((data, id) => (
              <tr key={id}>
                <th scope="row">
                  <img
                    src={data.image_url}
                    alt="album"
                    width="58.78"
                    height="60px"
                  />
                </th>
                <td className="align-middle">
                  <div className="episode-title cut-text-2">{data.title}</div>
                  <div>
                    <AudioPlayer episode={data.media_url} />
                  </div>
                </td>
                <td className="align-middle episode-duration">
                  {data.duration
                    ? moment
                        .utc(
                          moment
                            .duration(Number(data.duration), "milliseconds")
                            .asMilliseconds()
                        )
                        .format("mm:ss")
                    : "00:00"}
                </td>
                <td className="align-middle episode-visibility">
                  <span className="badge badge-pill badge-light py-1">
                    {` ${
                      data &&
                      data.visibility &&
                      data.visibility.charAt(0).toUpperCase() +
                        data.visibility.slice(1).toLowerCase()
                    }`}
                  </span>
                </td>
                <td className="align-middle episode-published">
                  <td className="align-middle episode-published">
                    {moment(data.createdAt).format("MMM, DD YYYY hh:mm")}
                  </td>
                </td>
                <td className="align-middle">
                  <div className="select-action">
                    <img
                      src={SelectAction}
                      alt="action"
                      onClick={() => {
                        setId(data._id);
                      }}
                    />
                    {selectedId === data._id && (
                      <div className="item-container" ref={ref}>
                        <span
                          className="item py-1 px-2"
                          onClick={() => {
                            setEp(data);
                            setUpdate(true);
                          }}
                        >
                          <img src={Edit} alt="edit" className="mr-1" /> Edit
                          episode
                        </span>
                        <div className="item py-1 px-2">
                          <img src={Share} alt="share" className="mr-1" /> Share
                          episode
                        </div>
                        <div
                          className="item py-1 px-2"
                          onClick={() => {
                            setDeleteId(data._id);
                            setDelete(true);
                          }}
                        >
                          <img src={Delete} alt="delete" className="mr-1" />
                          Delete episode
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        {episodesData.length > 0 && (
          <tr>
            <td className="pt-3" colSpan="7">
              <div className="d-flex justify-content-between">
                <div className="showing">
                  Showing 1 to {episodesData.length} of {episodes.length}{" "}
                  entries.
                </div>
                <Pagination
                  itemsCount={epData.length}
                  pageSize={5}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </td>
          </tr>
        )}
      </table>
      {episodesData.length === 0 && (
        <div className="d-flex justify-content-center">No Record</div>
      )}
    </div>
  );
};

export const TopListeners = (props) => {
  const [searchParam, setSearch] = useState("");
  const [values, setValue] = useState();
  const { episodes, setId, setUpdate } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleValue = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const episodesData = paginate(episodes, currentPage, pageSize);

  const download = (link) => {
    var element = document.createElement("a");
    element.setAttribute("href", link);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="card-dashboard mb-3">
      <div className="mx-4 mt-5">
        <span className="chart-title">
          TOP PERFORMING EPISODES BY UNIQUE LISTENERS
        </span>
        <div className="d-flex justify-content-between my-4">
          <div className="row m-0 p-0 align-items-center">
            <span className="mr-2 option-label">Show</span>
            <select
              className="form-control mr-2"
              name="address"
              style={{ width: 55 }}
              onChange={(e) => handleValue(e)}
              value={values && values.address}
            >
              <option selected>5</option>
              {[1, 2, 3].map((data, id) => (
                <option key={id}>{data}</option>
              ))}
            </select>
            <span className="mr-1 option-label">Entries</span>
          </div>
          <div className="form-group has-search">
            <span className="form-control-feedback pr-5 mr-3">
              <FontAwesomeIcon icon={faSearch} size="sm" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Filter record"
              value={searchParam}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <table className="table table-striped table-borderless">
          <thead className="dash-table-title">
            <tr>
              <th scope="col">EPISODES</th>
              <th scope="col">SUBSCRIBERS</th>
              <th scope="col">LISTENING HOURS</th>
              <th scope="col">COMMENTS</th>
              <th scope="col">DOWNLOADS</th>
            </tr>
          </thead>
          <tbody>
            {episodesData.map((data, id) => (
              <tr key={id}>
                <th scope="row">{id + 1}</th>
                <td className="align-middle">
                  <div className="episode-title cut-text-2">{data.title}</div>
                </td>
                <td className="align-middle episode-duration">
                  {data.show_id}
                </td>
                <td className="align-middle episode-visibility">
                  <span
                    className={`badge badge-pill ${
                      data.type === "DRAFT" ? "badge-primary" : "badge-success"
                    } py-1`}
                  >
                    {` ${
                      data &&
                      data.type &&
                      data.type.charAt(0).toUpperCase() +
                        data.type.slice(1).toLowerCase()
                    }`}
                  </span>
                </td>
                <td className="align-middle episode-published">
                  <span className="badge badge-pill badge-light py-1">
                    {` ${
                      data &&
                      data.visibility &&
                      data.visibility.charAt(0).toUpperCase() +
                        data.visibility.slice(1).toLowerCase()
                    }`}
                  </span>
                </td>
                <td className="align-middle episode-published">
                  {moment(data.createdAt).format("MMM, DD YYYY hh:mm")}
                </td>
                <td
                  className="align-middle episode-published"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={EditBlack}
                    alt="edit"
                    className="mr-2"
                    onClick={() => {
                      setId(data.episode_id);
                      setUpdate(true);
                    }}
                  />
                  <img
                    src={Download}
                    alt="edit"
                    className=""
                    onClick={() => download(data.download_url)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {episodesData.length > 0 && (
            <tr>
              <td className="pt-3" colSpan="7">
                <div className="d-flex justify-content-between">
                  <div className="showing">
                    Showing 1 to {episodesData.length} of {episodes.length}{" "}
                    entries.
                  </div>
                  <Pagination
                    itemsCount={episodes.length}
                    pageSize={10}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </td>
            </tr>
          )}
        </table>
        {episodesData.length === 0 && (
          <div className="d-flex justify-content-center my-4">No Record</div>
        )}
      </div>
    </div>
  );
};
