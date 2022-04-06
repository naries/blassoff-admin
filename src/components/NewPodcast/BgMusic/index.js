import React from "react";
import ReactPaginate from "react-paginate";
import { BasicTable } from "../../ReactTable";
import MusicTable from "./MusicTable";

export const BgMusic = () => {
  return (
    <div className="bg-grey-100">
      <div className="bg-yellow p-1 d-flex align-items-center justify-content-center text-white">
        Browse through our collection of background music{" "}
      </div>
      <div className="bg-white-smoke new-pod-container p-4">
        <MusicTable />
      </div>
    </div>
  );
};
